import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';  
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardPosts() {
  const { currentUser } = useSelector(state => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);  
  console.log(userPosts);
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
      } catch (error) {
        console.log(error)
      }
    } 

    if(currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userPosts.length;   
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json()
      if(res.ok) {
        setUserPosts([...userPosts, ...data.posts])
        if(data.posts.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='relative mt-4 mx-auto py-4 table-auto overflow-x-scroll 
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
                      <Link to={`/category/${post.category}`} className='text-purple-500 font-medium hover:text-purple-600'>
                        {post.category}
                      </Link>
                    </Table.Cell>

                    <Table.Cell>
                      <span className='bg-red-500 font-medium cursor-pointer text-white px-2 py-1 rounded-md hover:bg-red-600'>Delete</span>
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
                <button onClick={handleShowMore} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
                  Load More
                </button>
              </div>
            )}  
          </div>
        ) : (
          <h1 className='text-center text-2xl'>No Posts Found</h1>
        )}
    </div>
  )
}

