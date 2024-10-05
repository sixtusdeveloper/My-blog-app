import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Textarea, Button, Alert , Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function CommentSection({postId}) {
    const {currentUser} = useSelector(state => state.user);
    const [comment, setComment] = useState('');  
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]); 
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();  
    
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
                setComments([data, ...comments]);

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

    }, [postId]);

   
    // Comment Like Funtionality
    const handleLike = async (commentId) => {
        setShowModal(false);
        try {
            if(!currentUser) {
                navigate('/sign-in');
                return;
            }       
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
               
            });
            if(res.ok) {
                const data = await res.json();
                setComments(comments.map((comment) => comment._id === commentId ? {
                    ...comment, 
                    likes: data.likes,
                    numberOfLikes: data.likes.length,
                } : comment 
                ));
            }
        } catch (error) {
            console.log(error.message);
        }
    }
   
    // Comment Edit functionality
    const handleEdit = async (comment, editedContent) => {
        setComments(
          comments.map((c) =>
            c._id === comment._id ? { ...c, content: editedContent } : c
          )
        );
    };


    // Comment Delete functionality
    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
          if (!currentUser) {
            navigate('/sign-in');
            return;
          }
          const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            const data = await res.json();
            setComments(comments.filter((comment) => comment._id !== commentId));
          }
        } catch (error) {
          console.log(error.message);
        }
    };
    
    return (
        <div className='w-full'>
            <div className='max-w-2xl py-6 px-2'>
                {currentUser ? (
                    <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                        <p>Signed in as:</p>&nbsp;
                        <img className="h-5 w-5 object-cover rounded-full" src={currentUser.profilePicture} alt="" />
                        <Link to={'/dashboard?tab=profile'} className='text-sm cursor-pointer text-blue-500 hover:text-blue-600 hover:underline'>@{currentUser.username}</Link>
                    </div>
                ) : (
                    <div className='flex gap-1 text-sm text-teal-500 my-5'>
                        <p>You must be Signed in to comment.</p>&nbsp;
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

                {comments.length === 0 ? (  
                    <p className='text-sm my-5'>No comments yet!</p>
                ) : (
                    <>
                        <div className='text-sm my-5 flex items-center gap-2'>
                            <p className='text-sm font-semibold'>Comments</p>
                            
                            <div className="border border-gray-400 dark:border-gray-700 py-1 px-4 rounded-sm">
                              <p className='text-sm font-semibold'>{comments.length}</p>
                            </div>
                        
                        </div>
                        {
                            comments.map(comment => (
                                <Comment key={comment._id} comment={comment} 
                                onLike={handleLike} 
                                onEdit={handleEdit} 
                                onDelete={(commentId) => 
                                    {setShowModal(true);
                                    setCommentToDelete(commentId);
                                    }}
                                />
                            ))  
                        }
                    </>
                )}

                <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                    <Modal.Header />

                    <Modal.Body>
                        <div className="text-center p-4"> 
                        <HiOutlineExclamationCircle className='h-14 w-14 mx-auto mb-4 text-red-800' />

                        <h3 className='text-center text-lg mb-4 text-gray-500 dark:text-gray-400'>Are you sure you want to delete this comment?</h3>

                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={() => handleDelete(commentToDelete)} className='text-base font-semibold'>Yes, Delete</Button>
                            <Button color='gray' onClick={() => setShowModal(false)} className='text-base font-semibold'>No, Cancel</Button>
                        </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
