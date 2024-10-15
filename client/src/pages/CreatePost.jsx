import { FileInput, Select, TextInput, Button, Alert } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function CreatePost() {
    
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null); 
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({});   
    const [publishError, setPublishError] = useState(null);    
    const hangleUploadImage = async () => {

        try {
            if(!file){
                return setImageUploadError('Please select an image to upload');
            }   
            setImageUploadError(null);

            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;    
            const storageRef = ref(storage, fileName);  
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUploadProgress(progress.toFixed(0));
              
            }, (error) => {
                setImageUploadError('Image upload failed. Please try again');
                imageUploadProgress(null);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUploadProgress(null);
                    setImageUploadError(null);
                    setFormData({...formData, image: downloadURL});
            });

        });
        }
        catch (error) {
            setImageUploadError('Image upload failed. Please try again');
            setImageUploadProgress(null);   
            console.log(error);
        }  
        
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(!res.ok){    
               setPublishError(data.message);
               return;
            }

            if(res.ok){
                setPublishError(null);   
                navigate(`/post/${data.slug}`);  
            }
        }
        catch (error) {
            setPublishError('Post creation failed. Please try again');
        }
    }

    return (
        <section className='bg-white dark:bg-[rgb(16,23,42)] min-h-screen w-full'>
            <div
                className="relative flex items-center pt-20 px-4 lg:px-20 min-h-screen lg:min-h-[85vh] bg-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage: 'url("/post-bg.avif")', // Replace with your desired background image.
                }}
                >
                <div className="absolute inset-0 bg-black opacity-70"></div> {/* Dark overlay for contrast */}

                <div className="relative text-white mt-10 p-4 max-w-3xl space-y-8">
                <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
                    Join Me Let's Create Something Amazing!
                </h1>
                
                <p className="text-lg lg:text-xl text-gray-100 mb-6">
                    Share your knowledge, insights, and experiences with the world. Write a post on DevJourney and inspire others to learn and grow. Let's create something amazing together!
                </p>

                <a href='#create'>
                    <Button 
                    size="lg" 
                    gradientDuoTone="purpleToBlue"
                    className="hover:scale-105 transform transition-transform my-7 duration-300"
                    >
                    Get Started
                    </Button>
                </a>
                </div>
            </div>
            
            <div className="max-w-3xl pb-10 mx-auto px-4 md:px-10" id='create'>
                <h1 className='text-2xl font-bold text-center md:text-start my-8 md:my-10'>Create Your Post</h1>

                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                     
                    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                        <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) => setFormData({
                            ...formData, title: e.target.value  
                        })}/>

                        <Select onChange={(e) => setFormData({
                            ...formData, category: e.target.value 
                           })}
                         >
                            <option value='uncategorized'>Select a Category</option>
                            <option value='javascript'>JavaScript</option>
                            <option value='mysql'>MySQL</option>
                            <option value='reactjs'>React.js</option>
                            <option value='nextjs'>Next.js</option>
                            <option value='typescript'>TypeScript</option>
                            <option value='vuejs'>Vue.js</option>
                            <option value='css'>CSS</option>
                            <option value='java'>Java</option>
                            <option value='php'>PHP</option>
                            <option value='shell'>Shell</option>
                            <option value='python'>Python</option>
                            <option value='tailwindcss'>Tailwindcss</option>
                            <option value='career'>Career</option>
                            <option value='frontend'>Frontend</option>
                            <option value='backend'>Backend</option>
                            <option value='devops'>DevOps</option>
                        
                        </Select>
                    </div>

                    <div className='flex gap-4 items-center justify-between border-4 border-teal-600 border-dotted p-4'>
                        <FileInput type='file' accept='image/*' 
                           onChange={(e) => setFile(e.target.files[0])} 
                        /> 
                        <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline 
                            onClick={hangleUploadImage} disabled={imageUploadProgress}>
                            {
                                imageUploadProgress ? (
                                    <div className='w-16 h-16'>
                                        <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                                    </div>
                                ) : (
                                    'Upload Image'
                                )
                            }
                        </Button>
                    </div>

                    {imageUploadError && <Alert color='failure' type='danger'>{imageUploadError}</Alert>}  
                    {formData.image && (
                        <img src={formData.image} alt='Upload' className='w-full h-96 object-cover rounded-lg' />
                    )}  
                    
                    {/* The Editor */}
                    <ReactQuill theme='snow' placeholder='Write something amazing...' 
                    className='h-72 mb-12' 
                    required 
                    onChange={(value) => setFormData({
                        ...formData, content: value
                    })} 
                    />    
                    <Button type='submit' gradientDuoTone='purpleToPink'>Publish post</Button>
                    {publishError && <Alert color='failure' className='my-2' type='danger'>{publishError}</Alert>} 
                </form>
            
            </div>
        </section>
    )
}
