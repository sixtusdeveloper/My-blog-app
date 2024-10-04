import { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Textarea, Button } from 'flowbite-react';

export default function Comment({ comment, onLike, onEdit }) {
    const [user, setUser] = useState({}); 
    const { currentUser } = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);    
    const [isSaving, setIsSaving] = useState(false);  // New state for saving

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser();
    }, [comment]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    }

    const handleSave = async () => {
        setIsSaving(true);  // Set saving state to true
        setTimeout(async () => {  // Simulate 2 seconds of delay
            try {
                const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: editedContent
                    })
                });

                if (res.ok) {
                    setIsEditing(false);
                    onEdit(comment, editedContent);
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setIsSaving(false);  // Reset saving state
            }
        }, 2000);  // 2 second delay before the save logic
    }

    return (
        <div className='flex py-4 border-b dark:border-gray-800 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img src={user.profilePicture} alt={user.username} className='w-10 h-10 rounded-full bg-gray-200' />
            </div>

            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-[13px] truncate'>{user ? `@${user.username}` : "anonymous user"}</span>
                    <span className='text-[13px] text-gray-500'>{moment(comment.createdAt).fromNow()}</span>
                </div>

                {isEditing ? (
                    <>
                        <Textarea className='mb-2' 
                        value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />

                        <div className='flex justify-end gap-2 text-xs'>
                            <Button type='button' onClick={() => setIsEditing(false)} size='sm' gradientDuoTone='purpleToBlue'>
                                Cancel
                            </Button>
                            <Button type='button' onClick={handleSave} size='sm' gradientDuoTone='purpleToBlue' outline>
                                {isSaving ? 'Saving...' : 'Save'} {/* Button text changes based on isSaving */}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                       <p className='mb-2 text-gray-500 dark:text-gray-400'>{comment.content}</p>

                        <div className='flex gap-2 items-center pt-2 border-t dark:border-gray-700 max-w-fit'>
                            <button type='button' onClick={() => onLike(comment._id)} 
                            className={`text-gray-400 hover:text-blue-600 dark:text-blue-500
                            ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-600 dark:!text-blue-500'}`}>
                                <FaThumbsUp className='mr-1 text-sm' />
                            </button>
                            <span className='text-gray-400 text-[13px]'>
                                {comment.numberOfLikes > 0 && comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? 'likes' : 'like')} 
                            </span>

                            {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                <button type='button' onClick={handleEdit} className='text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-600'>
                                    Edit
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}










// import { useEffect, useState } from 'react';
// import moment from 'moment';
// import { FaThumbsUp } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { Textarea, Button } from 'flowbite-react';

// export default function Comment({ comment, onLike, onEdit }) {
//     const [user, setUser] = useState({}); 
//     const { currentUser } = useSelector((state) => state.user);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedContent, setEditedContent] = useState(comment.content);    

//     useEffect(() => {
//         const getUser = async () => {
//             try {
//                 const res = await fetch(`/api/user/${comment.userId}`);
//                 const data = await res.json();
//                 if (res.ok) {
//                     setUser(data);
//                 }
//             } catch (error) {
//                 console.log(error.message);
//             }
//         }
//         getUser();
//     }, [comment]);

//     const handleEdit = () => {
//         setIsEditing(true);
//         setEditedContent(comment.content);
//     }

//     const handleSave = async () => {
//         try {
//             const res = await fetch(`/api/comment/editComment/${comment._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     content: editedContent
//                 })
//             });

//             if (res.ok) {
//                 setIsEditing(false);
//                 onEdit(comment, editedContent);
//             }
//         } catch (error) {
//             console.log(error.message);
//         }
//     }

//     return (
//         <div className='flex py-4 border-b dark:border-gray-800 text-sm'>
//             <div className='flex-shrink-0 mr-3'>
//                 <img src={user.profilePicture} alt={user.username} className='w-10 h-10 rounded-full bg-gray-200' />
//             </div>

//             <div className='flex-1'>
//                 <div className='flex items-center mb-1'>
//                     <span className='font-bold mr-1 text-[13px] truncate'>{user ? `@${user.username}` : "anonymous user"}</span>
//                     <span className='text-[13px] text-gray-500'>{moment(comment.createdAt).fromNow()}</span>
//                 </div>

//                 {isEditing ? (
//                     <>
//                         <Textarea className='mb-2' 
//                         value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />

//                         <div className='flex justify-end gap-2 text-xs'>
//                             <Button type='button' onClick={() => setIsEditing(false)} size='sm' gradientDuoTone='purpleToBlue'>
//                                 Cancel
//                             </Button>
//                             <Button type='button' onClick={handleSave} size='sm' gradientDuoTone='purpleToBlue' outline>
//                                 Save
//                             </Button>
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                        <p className='mb-2 text-gray-500 dark:text-gray-400'>{comment.content}</p>

//                         <div className='flex gap-2 items-center pt-2 border-t dark:border-gray-700 max-w-fit'>
//                             <button type='button' onClick={() => onLike(comment._id)} 
//                             className={`text-gray-400 hover:text-blue-600 dark:text-blue-500
//                             ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-600 dark:!text-blue-500'}`}>
//                                 <FaThumbsUp className='mr-1 text-sm' />
//                             </button>
//                             <span className='text-gray-400 text-[13px]'>
//                                 {comment.numberOfLikes > 0 && comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? 'likes' : 'like')} 
//                             </span>

//                             {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
//                                 <button type='button' onClick={handleEdit} className='text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-600'>
//                                     Edit
//                                 </button>
//                             )}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     )
// }
