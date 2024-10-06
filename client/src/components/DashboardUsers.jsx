
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';  
import { Table, Modal, Button, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';  

export default function DashboardUsers() {
  const { currentUser } = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true); 
  const [showModal, setShowModal] = useState(false);  
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => { 
    const fetchUsers = async () => {  
      try {
        const res = await fetch(`/api/user/getusers`)
        const data = await res.json()
        if(res.ok) {
          setUsers(data.users)
          if(data.users.length < 9) {
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
      setLoading(true); // Start spinner when fetching begins
      setTimeout(fetchUsers, 2000); // Fetch after a 2-second delay
      fetchUsers();
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = users.length;   
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json()
      if(res.ok) {
        setUsers((prev) => [...prev, ...data.users])
        if(data.users.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteUser = async () => { 
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE'
      })
      const data = await res.json() 
      if(!res.ok) {
        console.log(data.message)
      }else{
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);

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
    <div className='relative mt-4 mx-auto py-4 table-auto lg:overflow-hidden overflow-x-scroll 
    scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && users.length > 0 ? (
          <div>
            <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date created</Table.HeadCell>
                    <Table.HeadCell>User image</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Admin</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>

              {users.map((user) => (  
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleString()}
                    </Table.Cell>

                    <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </Table.Cell>

                    <Table.Cell>
                      <span onClick={() => {
                        setShowModal(true)
                        setUserIdToDelete(user._id) 
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
          <h1 className='text-center text-2xl'>No Users Found</h1>
        )}

        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
          <Modal.Header />

          <Modal.Body>
            <div className="text-center p-4"> 
              <HiOutlineExclamationCircle className='h-14 w-14 mx-auto mb-4 text-red-800' />

              <h3 className='text-center text-lg mb-4 text-gray-500 dark:text-gray-400'>Are you sure you want to delete this user?</h3>

              <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={handleDeleteUser} className='text-base font-semibold'>Yes, Delete</Button>
                  <Button color='gray' onClick={() => setShowModal(false)} className='text-base font-semibold'>No, Cancel</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}



















