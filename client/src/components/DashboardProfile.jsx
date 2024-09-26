
import { Alert, Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';  
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashboardProfile() {
    const {currentUser} = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);   
    const [imageFileUrl, setImageFileUrl] = useState(null);  
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);  
    const [imageFileUploading, setImageFileUploading] = useState(false); 
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const filePickerRef = useRef();  
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

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
        setImageFileUploading(true);
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
            setImageFileUploading(false);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageFileUrl(downloadURL);
                setFormData({
                    ...formData, profilePicture: downloadURL
                });
                setImageFileUploading(false);
                // Set a timeout to remove the progress bar after 2 seconds
                setTimeout(() => {
                    setImageFileUploadProgress(null);  // Hide the progress bar
                }, 3000);
            });
        });
    };

    const handleChange = (e) => {
       setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        setUpdateUserError(null);
        setUpdateUserSuccess(null);

        if(Object.keys(formData).length === 0){
            setUpdateUserError('No changes detected');  
            return;
        }

        if(imageFileUploading) {
            setUpdateUserError('Please wait, image still uploading...');
            return;
        }
        
        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {  
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            } else {
                dispatch(updateSuccess(data));  
                setUpdateUserSuccess("Profile updated successfully");
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
        }

    }

    return (
        <div className='mt-20 w-full p-4'>
            <h1 className='font-semibold text-2xl md:text-3xl text-center p-8'>Profile</h1>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
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
                        src={imageFileUrl || currentUser?.profilePicture || '/user.png'} 
                        alt={currentUser.username} 
                        className={`rounded-full w-full h-full object-cover border-4 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} 
                    />
                </div>

                {updateUserError && (
                    <Alert type='error' color='failure'>{updateUserError}</Alert>
                )}

                {updateUserSuccess && (
                   <Alert type='success' color='success'>{updateUserSuccess}</Alert>
                )}
                
                {imageFileUploadError && 
                    <Alert type='error' color='failure'>{imageFileUploadError}</Alert>
                }
                
                <TextInput label='Username' type="text" id="username" placeholder="Username" defaultValue={currentUser?.username} onChange={handleChange} />
                <TextInput label='Email' type="email" id="email" placeholder="Email" defaultValue={currentUser?.email} onChange={handleChange} />
                <TextInput type="password" id="password" placeholder="Password" onChange={handleChange} />

                <Button type="submit" gradientDuoTone='purpleToBlue' outline className='mt-4 text-base font-semibold'>UPDATE</Button>
            </form>

            <div className='flex justify-between py-8'>
                <span className='text-purple-600 hover:text-purple-800 cursor-pointer'>Delete Account</span>
                <span className='text-purple-600 hover:text-purple-800 cursor-pointer'>Sign Out</span>
            </div>
        </div>
    );
}


