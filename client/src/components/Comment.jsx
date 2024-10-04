import { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Comment({ comment, onLike }) {
    const [user, setUser] = useState({}); 
    const { currentUser } = useSelector((state) => state.user);

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
    }, [comment])

    return (
        <div className='flex p-4 border-b dark:border-gray-800 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img src={user.profilePicture} alt={user.username} className='w-10 h-10 rounded-full bg-gray-200' />
            </div>

            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-[13px] truncate'>{user ? `@${user.username}` : "anonymous user"}</span>
                    <span className='text-[13px] text-gray-500'>{moment(comment.createdAt).fromNow()}</span>
                </div>

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
                </div>
            </div>
            
        </div>
    )
}
