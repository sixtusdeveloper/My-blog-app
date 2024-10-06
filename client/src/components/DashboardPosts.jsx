import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';  
import { Table, Modal, Button, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashboardPosts() {
  const { currentUser } = useSelector(state => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true); 
  const [showModal, setShowModal] = useState(false);  
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => { 
    const fetchPosts = async () => {  
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        if(res.ok) {
          setUserPosts(data.posts)
          if(data.posts.length < 9) {
            setShowMore(false)
          }
        } 
        setLoading(false); // Stop spinner after loading data
      } catch (error) {
        console.log(error)
        setLoading(false); // Stop spinner even if there's an error
      }
    } 

    if(currentUser.isAdmin) {
      fetchPosts();
      setLoading(true); // Start spinner when fetching begins
      setTimeout(fetchPosts, 2000); // Fetch after a 2-second delay
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userPosts.length;   
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json()
      if(res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts])
        if(data.posts.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeletePost = async () => { 
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE'
      })
      const data = await res.json() 
      if(!res.ok) {
        console.log(data.message)
      }else{
        setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete ))

      }
    } catch (error) {
      console.log(error)
    }
  }


  // Spinner logic
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen py-20">
        <Spinner size="xl" />
      </div>
    );
  }



  return (
    <div className='relative mt-6 mx-auto py-4 table-auto lg:overflow-hidden overflow-x-scroll 
    scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && userPosts.length > 0 ? (
          <div>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Post image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {userPosts.map((post) => (  
                <Table.Body key={post._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleString()}
                    </Table.Cell>

                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.image} alt={post.title} className='w-20 h-12 rounded-md object-cover dark:bg-gray-500' />
                      </Link>
                    </Table.Cell>

                    <Table.Cell>
                      <Link to={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                        {post.title}
                      </Link>
                    </Table.Cell>

                    <Table.Cell>
                      <Link to={`/category/${post.category}`} className='text-purple-500 cursor-pointer font-medium hover:text-purple-600'>
                        {post.category}
                      </Link>
                    </Table.Cell>

                    <Table.Cell>
                      <span onClick={() => {
                        setShowModal(true)
                        setPostIdToDelete(post._id) 
                      }} className='bg-red-500 font-medium cursor-pointer text-white px-2 py-1 rounded-md hover:bg-red-600'>Delete</span>
                    </Table.Cell>

                    <Table.Cell>
                      <Link to={`/update-post/${post._id}`} className='bg-blue-500 font-medium cursor-pointer text-white px-2 py-1 rounded-md hover:bg-blue-600'>
                        <span>Edit</span>
                      </Link>
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
          <h1 className='text-center text-2xl'>No Posts Found</h1>
        )}

        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
          <Modal.Header />

          <Modal.Body>
            <div className="text-center p-4"> 
              <HiOutlineExclamationCircle className='h-14 w-14 mx-auto mb-4 text-red-800' />

              <h3 className='text-center text-lg mb-4 text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post?</h3>

              <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={handleDeletePost} className='text-base font-semibold'>Yes, Delete</Button>
                  <Button color='gray' onClick={() => setShowModal(false)} className='text-base font-semibold'>No, Cancel</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}

