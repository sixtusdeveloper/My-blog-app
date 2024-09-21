
import { Alert, Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';  
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashboardProfile() {
    const {currentUser} = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);   
    const [imageFileUrl, setImageFileUrl] = useState(null);  
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);  
    const filePickerRef = useRef();  

    // Handle image selection and validate the file size
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        // Check if file exists and if its size is less than 2MB
        if (file) {
            if (file.size > 2 * 1024 * 1024) {  // 2MB = 2 * 1024 * 1024 bytes
                setImageFileUploadError('File size should not exceed 2MB');
                setImageFile(null);  // Reset the file
            } else {
                setImageFile(file);
                setImageFileUrl(URL.createObjectURL(file));
                setImageFileUploadError(null);  // Clear any previous errors
            }
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImageToServer();   
        }   
    }, [imageFile])

    const uploadImageToServer = async () => {
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);   

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
            setImageFileUploadError('Could not upload image (file must be less than 2MB)');
            setImageFileUploadProgress(null);
            setImageFile(null);  // Reset the file
            setImageFileUrl(null);  // Reset the image URL
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageFileUrl(downloadURL);

                // Set a timeout to remove the progress bar after 2 seconds
                setTimeout(() => {
                    setImageFileUploadProgress(null);  // Hide the progress bar
                }, 3000);
            });
        });
    };

    return (
        <div className='mt-20 w-full p-4'>
            <h1 className='font-semibold text-2xl md:text-3xl text-center p-8'>Profile</h1>

            <form className='flex flex-col gap-6'>
                <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className='relative self-center shadow-md overflow-hidden rounded-full w-32 h-32 cursor-pointer' onClick={() => filePickerRef.current.click()}>
                    {imageFileUploadProgress && (
                       <CircularProgressbar 
                            value={imageFileUploadProgress || 0} 
                            text={`${imageFileUploadProgress}%`} 
                            strokeWidth={5}
                            styles={{
                                root: {
                                    height: '100%',
                                    width: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`, 
                                },
                            }}
                        />
                    )}
                    <img 
                        src={imageFileUrl || currentUser.profilePicture || '/user.png'} 
                        alt={currentUser.username} 
                        className={`rounded-full w-full h-full object-cover border-4 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} 
                    />
                </div>
                
                {imageFileUploadError && 
                    <Alert type='error' color='failure'>{imageFileUploadError}</Alert>
                }
                
                <TextInput label='Username' type="text" id="username" placeholder="Username" defaultValue={currentUser?.username}/>
                <TextInput label='Email' type="email" id="email" placeholder="Email" defaultValue={currentUser?.email}/>
                <TextInput type="password" id="password" placeholder="Password"/>

                <Button type="submit" gradientDuoTone='purpleToBlue' outline className='mt-4 text-base font-semibold'>UPDATE</Button>
            </form>

            <div className='flex justify-between py-8'>
                <span className='text-purple-600 hover:text-purple-800 cursor-pointer'>Delete Account</span>
                <span className='text-purple-600 hover:text-purple-800 cursor-pointer'>Sign Out</span>
            </div>
        </div>
    );
}






//=============== Working perfectly just not implemented a logic for removing or disabling the progressbar


// import { Alert, Button, TextInput } from 'flowbite-react';
// import { useSelector } from 'react-redux';
// import { useState, useRef, useEffect } from 'react';
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';  
// import { app } from '../firebase';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';


// export default function DashboardProfile() {
//     const {currentUser} = useSelector(state => state.user)
//     const [imageFile, setImageFile] = useState(null)   
//     const [imageFileUrl, setImageFileUrl] = useState(null)  
//     const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
//     const [imageFileUploadError, setImageFileUploadError] = useState(null)  
//     const filePickerRef = useRef()  

//     // Handle image selection and validate the file size
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
        
//         // Check if file exists and if its size is less than 2MB
//         if (file) {
//             if (file.size > 2 * 1024 * 1024) {  // 2MB = 2 * 1024 * 1024 bytes
//                 setImageFileUploadError('File size should not exceed 2MB');
//                 setImageFile(null);  // Reset the file
//             } else {
//                 setImageFile(file);
//                 setImageFileUrl(URL.createObjectURL(file));
//                 setImageFileUploadError(null);  // Clear any previous errors
//             }
//         }
//     };

//     useEffect(() => {
//         if (imageFile) {
//             uploadImageToServer();   
//         }   
//     }, [imageFile])

//     const uploadImageToServer = async () => {
//         setImageFileUploadError(null);
//         const storage = getStorage(app);
//         const fileName = new Date().getTime() + '-' + imageFile.name;
//         const storageRef = ref(storage, fileName);
//         const uploadTask = uploadBytesResumable(storageRef, imageFile);   

//         uploadTask.on('state_changed', (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             setImageFileUploadProgress(progress.toFixed(0));
//         },
//         (error) => {
//             setImageFileUploadError('Could not upload image (file must be less than 2MB)');
//             setImageFileUploadProgress(null);
//             setImageFile(null);  // Reset the file
//             setImageFileUrl(null);  // Reset the image URL
//         }, () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 setImageFileUrl(downloadURL);
//             });
//         });
//     };

//     return (
//         <div className='mt-20 w-full p-4'>
//             <h1 className='font-semibold text-2xl md:text-3xl text-center p-8'>Profile</h1>

//             <form className='flex flex-col gap-6'>
//                 <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
//                 <div className='relative self-center shadow-md overflow-hidden rounded-full w-32 h-32 cursor-pointer' onClick={() => filePickerRef.current.click()}>
//                     {imageFileUploadProgress && (
//                        <CircularProgressbar 
//                             value={imageFileUploadProgress || 0} 
//                             text={`${imageFileUploadProgress}%`} 
//                             strokeWidth={5}
//                             styles={{
//                                 root: {
//                                     height: '100%',
//                                     width: '100%',
//                                     position: 'absolute',
//                                     top: 0,
//                                     left: 0,
//                                 },
//                                 path: {
//                                     stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`, 
//                                 },
//                             }}
//                         />
//                     )}
//                     <img 
//                         src={imageFileUrl || currentUser.profilePicture || '/user.png'} 
//                         alt={currentUser.username} 
//                         className={`rounded-full w-full h-full object-cover border-4 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} 
//                     />
//                 </div>
                
//                 {imageFileUploadError && 
//                     <Alert type='error' color='failure'>{imageFileUploadError}</Alert>
//                 }
                
//                 <TextInput label='Username' type="text" id="username" placeholder="Username" defaultValue={currentUser?.username}/>
//                 <TextInput label='Email' type="email" id="email" placeholder="Email" defaultValue={currentUser?.email}/>
//                 <TextInput type="password" id="password" placeholder="Password"/>

//                 <Button type="submit" gradientDuoTone='purpleToBlue' outline className='mt-4'>UPDATE</Button>
//             </form>

//             <div className='flex justify-between py-8'>
//                 <span className='text-purple-600 hover:text-purple-800 cursor-pointer'>Delete Account</span>
//                 <span className='text-purple-600 hover:text-purple-800 cursor-pointer'>Sign Out</span>
//             </div>
//         </div>
//     )
// }








//================= Working perfectly just not implemented a logic for removing or disabling the previous profile image when a new image is uploaded    

// import { Alert, Button, TextInput } from 'flowbite-react';
// import { useSelector } from 'react-redux';
// import { useState, useRef, useEffect } from 'react';
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';  
// import { app } from '../firebase';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { set } from 'mongoose';


// export default function DashboardProfile() {
//     const {currentUser} = useSelector(state => state.user)
//     const [imageFile, setImageFile] = useState(null)   
//     const [imageFileUrl, setImageFileUrl] = useState(null)  
//     const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
//     const [imageFileUploadError, setImageFileUploadError] = useState(null)  
//     console.log(imageFileUploadProgress, imageFileUploadError)
//     const filePickerRef = useRef()  
//     const handleImageChange = (e) => {
//         const file = e.target.files[0]
//         if (file) {
//             setImageFile(file)
//             setImageFileUrl(URL.createObjectURL(file))
//         }
       
//     };
//     useEffect(() => {

//         if (imageFile) {
//            uploadImageToServer()   
//         }   
//     } , [imageFile])

    
//     const uploadImageToServer = async () => {
//         setImageFileUploadError(null)
//         const storage = getStorage(app)
//         const fileName = new Date().getTime() + '-' + imageFile.name
//         const storageRef = ref(storage, fileName)
//         const uploadTask = uploadBytesResumable(storageRef, imageFile)   

//         uploadTask.on('state_changed', (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//             setImageFileUploadProgress(progress.toFixed(0));

//         },
//         (error) => {
//             setImageFileUploadError('Could not upload image (file must be less than 2MB)');
//             setImageFileUploadProgress(null);
//         }, () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 setImageFileUrl(downloadURL)
//             });
            
//         });
//     }   

//     return (
//         <div className='mt-20 w-full p-4'>
        
//             <h1 className='font-semibold text-2xl md:text-3xl text-center p-8'>Profile</h1>

//             <form className='flex flex-col gap-6'>
//                 <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
//                 <div className='relative self-center shadow-md overflow-hidden rounded-full w-32 h-32 cursor-pointer' onClick={() =>
//                     filePickerRef.current.click()
//                 }>
//                     {imageFileUploadProgress && (
//                        <CircularProgressbar 
//                             value={imageFileUploadProgress || 0} 
//                             text={`${imageFileUploadProgress}%`} 
//                             strokeWidth={5}
//                         styles={{
//                             root: {
//                                 height: '100%',
//                                 width: '100%',
//                                 position: 'absolute',
//                                 top: 0,
//                                 left: 0,
//                             },
//                             path: {
//                                 stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`, 
//                             },

//                         }}
//                      />
//                     )}
//                    <img src={imageFileUrl || currentUser.profilePicture || '/user.png'} alt={currentUser.username} 
//                      className={`rounded-full w-full h-full object-cover border-4 border-[lightgray]
//                         ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`
//                     }
//                    />
//                 </div>
//                 {imageFileUploadError && 
//                     <Alert type='error' color='failure'>{imageFileUploadError}</Alert>
//                 }
                
//                 <TextInput label='Username' type="text" id="username" placeholder="Username" defaultValue={currentUser?.username}/>
//                 <TextInput label='Email' type="email" id="email" placeholder="Email" defaultValue={currentUser?.email}/>
//                 <TextInput type="password" id="password" placeholder="Password"/>

//                 <Button type="submit" gradientDuoTone='purpleToBlue' outline className='mt-4'>Update</Button>
    
//             </form>

//             <div className='flex justify-between py-8'>
//                 <span className='text-red-600 hover:text-red-800 cursor-pointer'>Delete Account</span>
//                 <span className='text-red-600 hover:text-red-800 cursor-pointer'>Sign Out</span>
//             </div>
            
//         </div>
//     )
// }

