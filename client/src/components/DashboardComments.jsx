import { Modal, Table, Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
        setLoading(false); // Stop spinner after loading data
      } catch (error) {
        setLoading(false); // Stop spinner even if there's an error
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      setLoading(true); // Start spinner when fetching begins
      setTimeout(fetchComments, 2000); // Fetch after a 2-second delay
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  // Spinner logic
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen py-20">
        <Spinner size="xl" />
      </div>
    );
  }


  return (
    <div className='relative mx-auto py-2 table-auto lg:overflow-hidden overflow-x-scroll 
    scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && comments.length > 0 ? (
          <div>
            <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date updated</Table.HeadCell>
                    <Table.HeadCell>Comment content</Table.HeadCell>
                    <Table.HeadCell>Number of likes</Table.HeadCell>
                    <Table.HeadCell>PostId</Table.HeadCell>
                    <Table.HeadCell>UserId</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>

              {comments.map((comment) => (  
                <Table.Body key={comment._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(comment.updatedAt).toLocaleString()}
                    </Table.Cell>

                    <Table.Cell className='text-gray-500 dark:text-gray-400'>
                      {comment.content}
                    </Table.Cell>

                    <Table.Cell className='text-gray-800 dark:text-gray-300'>{comment.numberOfLikes}</Table.Cell>
                    
                    <Table.Cell className='text-gray-500 dark:text-gray-300'>{comment.postId}</Table.Cell>
                    <Table.Cell className='text-gray-500 dark:text-gray-300'>{comment.userId}</Table.Cell>
                    <Table.Cell>
                      <span onClick={() => {
                        setShowModal(true)
                        setCommentIdToDelete(comment._id) 
                      }} className='bg-red-500 font-medium cursor-pointer text-white px-2 py-1 rounded-md hover:bg-red-600'>Delete</span>
                    </Table.Cell>
                      
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {showMore && (
              <div className='flex justify-center mt-4'>
                <button onClick={handleShowMore} className='text-purple-500 px-4 py-2 hover:text-purple-600'>
                  Load More
                </button>
              </div>
            )}  
          </div>
        ) : (
          <h1 className='text-center text-2xl'>No Comments Found</h1>
        )}

        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
          <Modal.Header />

          <Modal.Body>
            <div className="text-center p-4"> 
              <HiOutlineExclamationCircle className='h-14 w-14 mx-auto mb-4 text-red-800' />

              <h3 className='text-center text-lg mb-4 text-gray-500 dark:text-gray-400'>Are you sure you want to delete this comment?</h3>

              <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={handleDeleteComment} className='text-base font-semibold'>Yes, Delete</Button>
                  <Button color='gray' onClick={() => setShowModal(false)} className='text-base font-semibold'>No, Cancel</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}



















