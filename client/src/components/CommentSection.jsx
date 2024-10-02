import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Textarea, Button, Alert } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Comment from './Comment';

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');  
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);   
    
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

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                if(res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchComments();    

    }, [postId])
    
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
                            rows='3'
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

                {comments.length === 0 ? (  
                    <p className='text-sm my-5'>No comments yet!</p>
                ) : (
                    <>
                        <div className='text-sm my-5 flex items-center gap-1'>
                            <p className='text-sm font-semibold'>Comments</p>
                            
                            <div className="border border-gray-400 py-1 px-2 rounded-sm">
                              <p className='text-sm font-semibold'>{comments.length}</p>
                            </div>
                        
                        </div>
                        {
                            comments.map(comment => (
                                <Comment key={comment._id} comment={comment} />
                            ))  
                        }
                    </>
                )}
            </div>
        </div>
    )
}
