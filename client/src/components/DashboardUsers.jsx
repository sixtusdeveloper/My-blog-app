import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';  
import { Table, Modal, Button, Spinner, TextInput, Alert } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashboardUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [loading, setLoading] = useState(false);
  const [authorizationKey, setAuthorizationKey] = useState('');
  const [authError, setAuthError] = useState('');

  const AUTH_KEY = import.meta.env.VITE_AUTHORIZATION_KEY?.trim(); // ✅
  ; // Access the key from .env

  // Fetch users from the server
  const fetchUsers = async (startIndex = 0) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        setShowMore(data.users.length >= 9);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) fetchUsers();
  }, [currentUser.isAdmin]);

  const handleShowMore = () => fetchUsers(users.length);
 
  // Authorization Key logic
  const handleAuthSubmit = () => {
    if (authorizationKey.trim() === AUTH_KEY) {
      setShowAuthModal(false);
      setShowDeleteModal(true);
    } else {
      setAuthError('Invalid Authorization Key. Please try again.');
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowDeleteModal(false);
      } else {
        console.error('Error deleting user:', data.message);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen py-20">
        <Spinner size="xl" />
      </div>
    );
  }

  // Inline CSS for background image
  const backgroundStyle = {
    backgroundImage: 'url("/auth-bg.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    overflowY: 'scroll',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE and Edge
  };

  return (
    <section style={backgroundStyle} className='min-h-[100vh] w-full overflow-auto'>
      <div className="relative mt-2 mx-auto py-4 overflow-x-scroll border dark:border-gray-800 border-gray-300
        scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
        dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin && users.length > 0 ? (
          <div>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date created</Table.HeadCell>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(user.createdAt).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell className="text-gray-600 dark:text-gray-200">
                      {user.username}
                    </Table.Cell>
                    <Table.Cell className="text-gray-500 dark:text-gray-400">
                      {user.email}
                    </Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowAuthModal(true);
                          setUserIdToDelete(user._id);
                        }}
                        className="bg-purple-800 font-medium text-xs cursor-pointer text-white px-2 py-1 rounded-md hover:bg-purple-600"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {showMore && (
              <div className="flex justify-center mt-4">
                <Button onClick={handleShowMore} gradientDuoTone="purpleToBlue" className="flex items-center my-4">
                  Load More
                </Button>
              </div>
            )}
          </div>
        ) : (
          <h1 className="text-center text-2xl">No Users Found</h1>
        )}

        {/* Authorization Modal */}
        <Modal show={showAuthModal} onClose={() => setShowAuthModal(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center p-4">
              <h3 className="text-lg mb-4 text-gray-500 dark:text-gray-400">
                🔐Enter Authorization Key
              </h3>
              {authError &&  
                <Alert className='mb-4 text-base' color='failure'>
                  {authError}
                </Alert>
              }
              <TextInput
                type="password"
                placeholder="🔑 Enter Key"
                value={authorizationKey}
                onChange={(e) => setAuthorizationKey(e.target.value)}
                className="mb-4"
              />
              
              <Button gradientDuoTone='purpleToBlue' onClick={handleAuthSubmit} className="w-full">
                Okay
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center p-4">
              <HiOutlineExclamationCircle className="h-14 w-14 mx-auto mb-4 text-red-800" />
              <h3 className="text-lg mb-4 text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-center gap-4">
                <Button gradientDuoTone='purpleToBlue' onClick={handleDeleteUser} className="text-base font-semibold">
                  Yes, Delete
                </Button>
                <Button color="gray" onClick={() => setShowDeleteModal(false)} className="text-base font-semibold">
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
}













// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';  
// import { Table, Modal, Button, Spinner } from 'flowbite-react';
// import { HiOutlineExclamationCircle } from 'react-icons/hi';
// import { FaCheck, FaTimes } from 'react-icons/fa';

// export default function DashboardUsers() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [users, setUsers] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [userIdToDelete, setUserIdToDelete] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch users from the server
//   const fetchUsers = async (startIndex = 0) => {
//     setLoading(true); // Start spinner
//     try {
//       const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
//       const data = await res.json();
//       if (res.ok) {
//         setUsers((prev) => [...prev, ...data.users]);
//         // Stop loading more if fewer than 9 users are returned
//         setShowMore(data.users.length >= 9);
//       }
//     } catch (error) {
//       console.error('Failed to fetch users:', error);
//     } finally {
//       setLoading(false); // Stop spinner
//     }
//   };

//   // Initial fetch on component mount if user is admin
//   useEffect(() => {
//     if (currentUser.isAdmin) {
//       fetchUsers(); // Fetch without delay
//     }
//   }, [currentUser.isAdmin]);

//   const handleShowMore = () => {
//     fetchUsers(users.length); // Load more users starting from the current length
//   };

//   const handleDeleteUser = async () => {
//     try {
//       const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
//         setShowModal(false); // Close modal after deletion
//       } else {
//         console.error('Error deleting user:', data.message);
//       }
//     } catch (error) {
//       console.error('Failed to delete user:', error);
//     }
//   };

//   // Show spinner while loading
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen py-20">
//         <Spinner size="xl" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative mt-4 mx-auto py-4 overflow-x-scroll 
//       scrollbar-track-slate-100 scrollbar-thumb-slate-300 
//       dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
//       {currentUser.isAdmin && users.length > 0 ? (
//         <div>
//           <Table hoverable className="shadow-md">
//             <Table.Head>
//               <Table.HeadCell>Date created</Table.HeadCell>
//               <Table.HeadCell>User image</Table.HeadCell>
//               <Table.HeadCell>Username</Table.HeadCell>
//               <Table.HeadCell>Email</Table.HeadCell>
//               <Table.HeadCell>Admin</Table.HeadCell>
//               <Table.HeadCell>Delete</Table.HeadCell>
//             </Table.Head>
//             {users.map((user) => (
//               <Table.Body key={user._id} className="divide-y">
//                 <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                   <Table.Cell className="text-gray-500 dark:text-gray-400 text-xs">
//                     {new Date(user.createdAt).toLocaleString()}
//                   </Table.Cell>
//                   <Table.Cell>
//                     <img
//                       src={user.profilePicture}
//                       alt={user.username}
//                       className="w-10 h-10 object-cover bg-gray-500 rounded-full"
//                     />
//                   </Table.Cell>
//                   <Table.Cell className="text-gray-600 dark:text-gray-200">
//                     {user.username}
//                   </Table.Cell>
//                   <Table.Cell className="text-gray-500 dark:text-gray-400">
//                     {user.email}
//                   </Table.Cell>
//                   <Table.Cell>
//                     {user.isAdmin ? (
//                       <FaCheck className="text-green-500" />
//                     ) : (
//                       <FaTimes className="text-red-500" />
//                     )}
//                   </Table.Cell>
//                   <Table.Cell>
//                     <span
//                       onClick={() => {
//                         setShowModal(true);
//                         setUserIdToDelete(user._id);
//                       }}
//                       className="bg-red-500 font-medium  text-xs cursor-pointer text-white px-2 py-1 rounded-md hover:bg-red-600"
//                     >
//                       Delete
//                     </span>
//                   </Table.Cell>
//                 </Table.Row>
//               </Table.Body>
//             ))}
//           </Table>
//           {showMore && (
//             <div className="flex justify-center mt-4">
//               <Button
//                 onClick={handleShowMore}
//                 gradientDuoTone="purpleToBlue"
//                 className="flex items-center my-4"
//               >
//                 Load More
//               </Button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <h1 className="text-center text-2xl">No Users Found</h1>
//       )}

//       <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
//         <Modal.Header />
//         <Modal.Body>
//           <div className="text-center p-4">
//             <HiOutlineExclamationCircle className="h-14 w-14 mx-auto mb-4 text-red-800" />
//             <h3 className="text-lg mb-4 text-gray-500 dark:text-gray-400">
//               Are you sure you want to delete this user?
//             </h3>
//             <div className="flex justify-center gap-4">
//               <Button
//                 color="failure"
//                 onClick={handleDeleteUser}
//                 className="text-base font-semibold"
//               >
//                 Yes, Delete
//               </Button>
//               <Button
//                 color="gray"
//                 onClick={() => setShowModal(false)}
//                 className="text-base font-semibold"
//               >
//                 No, Cancel
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }








