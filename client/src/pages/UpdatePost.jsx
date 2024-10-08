import { FileInput, Select, TextInput, Button, Alert } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';


export default function UpdatePost() {
    
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null); 
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({});   
    const [publishError, setPublishError] = useState(null);  
    const { postId } = useParams();  
    const { currentUser } = useSelector((state) => state.user);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                
                if (!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
    
                // Ensure _id is part of formData
                if (res.ok && data.posts[0]) {
                    setPublishError(null);
                    setFormData({
                        ...data.posts[0], // Assuming posts[0] contains the necessary data including _id
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchPost();
    }, [postId]);

    
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
            // Use postId from useParams if formData._id is undefined
            const postIdToUpdate = formData._id || postId;
    
            const res = await fetch(`/api/post/updatepost/${postIdToUpdate}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await res.json();
            
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
    
            if (res.ok) {
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

    return (
        <div className='bg-white dark:bg-[rgb(16,23,42)] min-h-screen px-4 md:px-10 w-full'>
            <div className="max-w-3xl py-20 mx-auto">
                <h1 className='text-center font-semibold text-3xl my-16 md:mt-20'>Update Post</h1>

                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                     
                    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                        <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) => setFormData({
                            ...formData, title: e.target.value  
                        })}
                        value={formData.title}
                        />

                        <Select onChange={(e) => setFormData({
                            ...formData, category: e.target.value 
                           })}
                            value={formData.category}
                         >
                            <option value='uncategorized'>Select a Category</option>
                            <option value='javascript'>JavaScript</option>
                            <option value='reactjs'>React.js</option>
                            <option value='nextjs'>Next.js</option>
                            <option value='typescript'>TypeScript</option>
                            <option value='vuejs'>Vue.js</option>
                            <option value='vuejs'>CSS</option>
                            <option value='vuejs'>Java</option>
                            <option value='vuejs'>MySQL</option>
                        
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
                    value={formData.content}
                    />    
                    <Button type='submit' gradientDuoTone='purpleToPink'>Update Post</Button>
                    {publishError && <Alert color='failure' className='my-2' type='danger'>{publishError}</Alert>} 
                </form>
            
            </div>
        </div>
    )
}
