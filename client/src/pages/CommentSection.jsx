import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Textarea, Button, Alert } from 'flowbite-react';
import { useState } from 'react';

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState([]);  
    const [commentError, setCommentError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(comment.length > 250) {
            return;
        }
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   content: comment,
                    postId,
                    userId: currentUser._id
                })
            });
            const data = await res.json(); 

            if(res.ok) {
                setComment('');
                setCommentError(null);
            } 
        } catch (error) {
            setCommentError(error.message);
        }
       
    }   
    
    return (
        <div className='w-full'>
            <div className='max-w-2xl py-6 px-2'>
                {currentUser ? (
                    <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                        <p>Signed in as:</p>&nbsp;
                        <img className="h-5 w-5 object-cover rounded-full" src={currentUser.profilePicture} alt="" />
                        <Link to={'/dashboard?tab=profile'} className='text-sm cursor-pointer text-cyan-600 hover:underline'>@{currentUser.username}</Link>
                    </div>
                ) : (
                    <div className='flex gap-1 text-sm text-teal-500 my-5'>
                        <p>You must Sign in to comment.</p>&nbsp;
                        <Link to={'/sign-in'} className='text-blue-500 hover:underline'>Sign in</Link>
                    </div>  
                )}

                {currentUser && (
            
                    <form onSubmit={handleSubmit} className='border border-blue-500 rounded-md p-3'>
                       {commentError && (
                        <Alert type='error' color='failure' className='mb-2'>{commentError}</Alert>
                       )}

                        <Textarea
                            placeholder='Write a comment...'   
                            rows='4'
                            maxLength='250' 
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                        <div className='flex justify-between items-center mt-6'>
                            <p className='text-gray-500 text-xs'>{250 - comment.length} characters remaining</p>
                            <Button outline gradientDuoTone='purpleToBlue' type='submit'>Submit</Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
