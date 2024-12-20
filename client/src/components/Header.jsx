// Working properly with notification functionality implemented in the notification controller.
// Code is functioning properly but with a proper implementation of the notification controller.
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'; 
import { FaMoon, FaSun, FaBell, FaUser, FaTimes, FaTrash, FaCheck } from 'react-icons/fa'; 
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import DashboardIcon from '/dashboard.webp';
import ProfileIcon from '/profile.webp';
import LogoutIcon from '/logout.webp';
// import moment from 'moment';

export default function Header({ post }) {
  const dispatch = useDispatch();
  const path = useLocation().pathname;  
  const { currentUser } = useSelector(state => state.user); 
  const { theme } = useSelector(state => state.theme);  
  const [searchTerm, setSearchTerm] = useState('');  
  const location = useLocation();  
  const navigate = useNavigate();  
  const defaultAvatar = '/public/user.png'; 

  // Notification state
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [clearModal, setClearModal] = useState(null); // Tracks which notification's clear modal is open


  // Sync the search term from URL when the component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Fetch notifications
  const loadNotifications = async () => {
    try {
      const response = await fetch('/api/notifications/getNotifications');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.isRead).length); // Update unread count
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };
  
  
  // Handle notification click function
  const handleNotificationClick = async (notificationId) => {
    const token = currentUser.token;
    try {
      const response = await fetch(`/api/notifications/markAsRead/${notificationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        
        setNotifications(prevNotifications =>
          prevNotifications.map(notification =>
            notification._id === notificationId
              ? { ...notification, isRead: true }
              : notification
          )
        );

        
        // Update unread count after marking as read
        setUnreadCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Handle notification clear function

  const handleClearNotification = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/deleteNotifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });

      if (response.ok) {
        setNotifications(prevNotifications =>
          prevNotifications.filter(notification => notification._id !== notificationId)
        );
      }
    } catch (error) {
      console.error('Error clearing notification:', error);
    }
  };

  useEffect(() => {
    if (isModalOpen) loadNotifications();
  }, [isModalOpen]);


  // Toggle modal function
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    if (!isModalOpen) {
      loadNotifications(); // Fetch notifications when opening the modal
      setUnreadCount(0); // Reset unread count
      setShowAllNotifications(false); // Reset showAllNotifications state
    }
  };

  
  // const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleCloseModal = (e) => {
    if (e.target.id === 'notification-modal') setIsModalOpen(false);
  };

  // Hook to disable background scrolling
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = ''; // Clean up when the component unmounts
    };
  }, [isModalOpen]);


  // Signout function  
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message); 
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {   
      console.log(error);
    }
  }
  
  useEffect(() => {
    console.log(notifications);
  }, [notifications]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);  
    const searchQuery = urlParams.toString();  
    navigate(`/search?${searchQuery}`); 
  }

  return (
    <Navbar className='border-b-2 fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-800'>
      <Link to="/" className="flex items-center self-center whitespace-nowrap text-sm md:text-base lg:text-base font-semibold dark:text-white">
        <img src="/Logo-icon.png" alt="Logo icon" width='25px' height="25px"/>
        <span className='hidden sm:block self-center mx-1 py-1 px-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-800 rounded-lg text-white'>
          DevJourney
        </span>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput 
          className="hidden md:block"
          type="text" 
          rightIcon={AiOutlineSearch} 
          placeholder='Search for a topic' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </form>

      <Button className='w-12 h-10 hidden md:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
     
      <div className='flex items-center self-center gap-4 lg:gap-8 md:order-2'>
        <Button className='w-10 h-8 items-center' color='gray' pill onClick={() => dispatch(toggleTheme())}>
          {theme === 'light' ? <FaSun /> : <FaMoon /> } 
        </Button>

        {currentUser ? (
          <>
             
            {/* Notification Icon */}
            {currentUser.isAdmin && (
              <>
                <div className="px-1 relative items-center mx-auto">
                  <button type='button' className='outline-none border border-gray-300 dark:border-gray-700 rounded-full p-2 self-center mx-auto items-center' onClick={toggleModal}>
                    <FaBell size={18} />
                  </button>
                  {unreadCount > 0 ? (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-2">
                      {unreadCount}
                    </span>
                  ) : (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-semibold rounded-full p-1">
                      <FaCheck size={10} />
                    </span>
                  )}
                </div>
                {/* Notification Modal */}
                {isModalOpen && (
                  <div
                    id="notification-modal"
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={handleCloseModal}
                  >
                    <div
                      className="relative bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg p-6 w-96 max-h-[65vh] overflow-y-auto scrollable-content"
                      // style={{ overflowY: clearModal ? 'hidden' : 'auto' }} // Conditional overflow control
                    >
                      {/* Close Icon */}
                      <FaTimes
                        className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                        size={18} // Adjust icon size if necessary
                      />

                      <h2 className="text-lg font-medium mb-4 py-1 border-b border-b-gray-300 dark:border-b-gray-700">Notifications</h2>

                      {notifications.length > 0 ? (
                        <ul>
                        {(showAllNotifications ? notifications : notifications.slice(0, 9)).map((notification) => (
                          <li
                            key={notification._id}
                            className={`py-2 text-xs leading-snug rounded border-b border-b-gray-300 dark:border-b-gray-700 ${
                              notification.isRead ? 'text-gray-400 dark:text-purple-400' : 'cursor-pointer text-xs font-semibold text-purple-600 dark:text-purple-500'
                            }`}
                            onClick={() => handleNotificationClick(notification._id)}
                          >
                          
                            <div className='flex gap-2 flex-wrap md:flex-nowrap md:justify-center'>

                              <img 
                                src={notification.creatorProfilePicture || defaultAvatar} 
                                className="h-8 w-8 object-cover rounded-full items-start" 
                                alt={notification.creatorUsername || "User Avatar"} 
                              />
                              <div>
                                
                                <p dangerouslySetInnerHTML={{ __html: notification.message }}></p>
                                
                                <p className="text-xs pt-2 text-purple-600 dark:text-purple-500">
                                  {notification.timeAgo}
                                  {/* You could as well use moment.js to format the date */}
                                  {/* {moment(notification.createdAt).fromNow()} */}
                                </p>

                                <div className='flex text-xs justify-between items-center py-2'>
                                  <button className='text-xs py-1 px-2 border border-gray-300 dark:border-gray-700 rounded-full text-purple-600 dark:text-purple-400'>
                                    {notification.isRead  ? 'Read' : 'Mark as Read'}
                                  </button>
                                
                                  <button 
                                    onClick={() => setClearModal(notification._id)}
                                    className='p-2 cursor-pointer outline-none border rounded-full border-gray-300 dark:border-gray-700'>
                                      <FaTrash
                                      className="text-gray-500 dark:text-gray-400 ml-auto cursor-pointer"
                                      
                                    />

                                  </button>
                                </div> 
                              </div>
                            </div>

                            {clearModal === notification._id && (
                              <div className="absolute right-10 left-10 top-20 bg-white border dark:bg-gray-700 border-gray-300 dark:border-gray-700 rounded-md shadow-md p-4 z-50">
                                <span className='text-center flex justify-center p-2'><FaTrash size={18} className='text-purple-600'/></span>
                                <p className="p-2 text-center text-gray-600 dark:text-gray-300 text-sm">Are you sure you want to clear this notification?</p>
                                <Button
                                  type='button'
                                    gradientDuoTone='purpleToBlue'
                                    className='w-full mt-2'
                                    onClick={() => {
                                      handleClearNotification(notification._id);
                                      // setClearModal(null); // Reset clearModal after clearing notification
                                    }}
                                  >
                                  Clear Notification
                                </Button>
                                <Button
                                  className="text-sm mt-2 w-full"
                                  color="gray"
                                  onClick={() => setClearModal(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                      ) : (
                        <p className="text-gray-500">No notifications</p>
                      )}
                      
                      <Button
                        className="mt-4 w-full"
                        gradientDuoTone='purpleToBlue'
                        onClick={() => {
                          navigate('/dashboard?tab=notifications');
                          setIsModalOpen(false); // Close the modal after navigation
                        }}
                        type="button"
                      >
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
            <Dropdown className="px-4" arrowIcon={false} inline label={
              <Avatar 
                img={currentUser.profilePicture || defaultAvatar} 
                alt='user' 
                rounded 
                className='border-4 border-blue-400 dark:border-blue-400 rounded-full' 
              />
            }>
              <Dropdown.Header>
                <span className='block text-sm font-medium tracking-wide'>@{currentUser.username}</span>
                <span className='block text-xs tracking-wide truncate'>{currentUser.email}</span>
              </Dropdown.Header>
              
              {currentUser.isAdmin && (
                <>
                  <Link to={'/dashboard?tab=dash'}>
                    <Dropdown.Item>
                      <img src={DashboardIcon} alt="Dashboard" className="w-5 h-5 mr-4" /><span>Dashboard</span>
                    </Dropdown.Item>
                  </Link>

                  <Dropdown.Divider />
                </>
              )}

              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>
                  <img src={ProfileIcon} className="w-5 h-5 mr-4" alt="Profile" /><span>Profile</span>
                </Dropdown.Item>
              </Link>
              
              <Dropdown.Divider />

              <Dropdown.Item onClick={handleSignout}>
                <img src={LogoutIcon} className="w-5 h-5 mr-4" alt="Sign Out" /><span>Sign Out</span>
              </Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline className='self-center'>
              <FaUser className='self-center' />&nbsp;
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle className='md:hidden' />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">
            Home
          </Link>
        </Navbar.Link>  

        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">
            About
          </Link>
        </Navbar.Link>  
 
        <Navbar.Link active={path === "/faq"} as={"div"}>
          <Link to="/faq">
            FAQ
          </Link>
        </Navbar.Link>  

        <Navbar.Link active={path === "/team"} as={"div"}>
          <Link to="/team">
            Team
          </Link>
        </Navbar.Link>  

        <Navbar.Link active={path === "/contact"} as={"div"}>
          <Link to="/contact">
            Contact
          </Link>
        </Navbar.Link> 
      </Navbar.Collapse>

    </Navbar>
  );

}


// // Code is functioning properly but with a proper implementation of the notification controller.
// import React, { useEffect, useState } from 'react';
// import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AiOutlineSearch } from 'react-icons/ai'; 
// import { FaMoon, FaSun, FaBell, FaUser, FaTimes } from 'react-icons/fa'; 
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleTheme } from '../redux/theme/themeSlice';
// import { signoutSuccess } from '../redux/user/userSlice';
// import DashboardIcon from '/dashboard.webp';
// import ProfileIcon from '/profile.webp';
// import LogoutIcon from '/logout.webp';
// // import moment from 'moment';

// export default function Header() {
//   const dispatch = useDispatch();
//   const path = useLocation().pathname;  
//   const { currentUser } = useSelector(state => state.user); 
//   const { theme } = useSelector(state => state.theme);  
//   const [searchTerm, setSearchTerm] = useState('');  
//   const location = useLocation();  
//   const navigate = useNavigate();  
//   const defaultAvatar = '/public/user.png'; 

//   // Notification state
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
//   const [showAllNotifications, setShowAllNotifications] = useState(false);

//   // Sync the search term from URL when the component mounts
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);

//   // Fetch notifications
//   const loadNotifications = async () => {
//     try {
//       const response = await fetch('/api/notifications/getNotifications');
//       const data = await response.json();
      
//       if (Array.isArray(data)) {
//         setNotifications(data);
//         setUnreadCount(data.filter(n => !n.isRead).length); // Update unread count
//       }
//     } catch (error) {
//       console.error("Error loading notifications:", error);
//     }
//   };

//   const handleNotificationClick = async (notificationId) => {
//     const token = currentUser.token;
//     try {
//       const response = await fetch(`/api/notifications/markAsRead/${notificationId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         setNotifications(prevNotifications =>
//           prevNotifications.map(notification =>
//             notification._id === notificationId
//               ? { ...notification, isRead: true }
//               : notification
//           )
//         );
//         // Update unread count after marking as read
//         setUnreadCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
//       } else {
//         const errorData = await response.json();
//         console.error(errorData.message);
//       }
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   useEffect(() => {
//     if (isModalOpen) loadNotifications();
//   }, [isModalOpen]);


//   // useEffect(() => {
//   //   loadNotifications();
//   // }, []);


//   // Toggle modal function
//   const toggleModal = () => {
//     setIsModalOpen((prev) => !prev);
//     if (!isModalOpen) {
//       loadNotifications(); // Fetch notifications when opening the modal
//       setUnreadCount(0); // Reset unread count
//       setShowAllNotifications(false); // Reset showAllNotifications state
//     }
//   };

  
//   // const toggleModal = () => setIsModalOpen((prev) => !prev);

//   const handleCloseModal = (e) => {
//     if (e.target.id === 'notification-modal') setIsModalOpen(false);
//   };

//   // Hook to disable background scrolling
//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }

//     return () => {
//       document.body.style.overflow = ''; // Clean up when the component unmounts
//     };
//   }, [isModalOpen]);


//   // Signout function  
//   const handleSignout = async () => {
//     try {
//       const res = await fetch('/api/user/signout', {
//         method: 'POST',
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         console.log(data.message); 
//       } else {
//         dispatch(signoutSuccess());
//       }
//     } catch (error) {   
//       console.log(error);
//     }
//   }
  
//   useEffect(() => {
//     console.log(notifications);
//   }, [notifications]);
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(location.search);
//     urlParams.set('searchTerm', searchTerm);  
//     const searchQuery = urlParams.toString();  
//     navigate(`/search?${searchQuery}`); 
//   }

//   return (
//     <Navbar className='border-b-2 fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-800'>
//       <Link to="/" className="flex items-center self-center whitespace-nowrap text-sm md:text-base lg:text-base font-semibold dark:text-white">
//         <img src="/Logo-icon.png" alt="Logo icon" width='25px' height="25px"/>
//         <span className='hidden sm:block self-center mx-1 py-1 px-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-800 rounded-lg text-white'>
//           DevJourney
//         </span>
//       </Link>
//       <form onSubmit={handleSubmit}>
//         <TextInput 
//           className="hidden md:block"
//           type="text" 
//           rightIcon={AiOutlineSearch} 
//           placeholder='Search for a topic' 
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} 
//         />
//       </form>

//       <Button className='w-12 h-10 hidden md:hidden' color='gray' pill>
//         <AiOutlineSearch />
//       </Button>
     
//       <div className='flex items-center self-center gap-4 lg:gap-8 md:order-2'>
//         <Button className='w-10 h-8 items-center' color='gray' pill onClick={() => dispatch(toggleTheme())}>
//           {theme === 'light' ? <FaSun /> : <FaMoon /> } 
//         </Button>

//         {currentUser ? (
//           <>
             
//             {/* Notification Icon */}
//             {currentUser.isAdmin && (
//               <>
//                 <div className="px-1 relative items-center mx-auto">
//                   <button type='button' className='border border-gray-300 dark:border-gray-700 rounded-full p-2 self-center mx-auto items-center' onClick={toggleModal}>
//                     <FaBell size={18} />
//                   </button>
//                   {unreadCount > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-2">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </div>
//                 {/* Notification Modal */}
//                 {isModalOpen && (
//                   <div
//                     id="notification-modal"
//                     className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//                     onClick={handleCloseModal}
//                   >
//                     <div
//                       className="relative bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg p-6 w-96 max-h-[65vh] overflow-y-auto scrollable-content"
//                     >
//                       {/* Close Icon */}
//                       <FaTimes
//                         className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 cursor-pointer"
//                         onClick={() => setIsModalOpen(false)}
//                         size={18} // Adjust icon size if necessary
//                       />

//                       <h2 className="text-lg font-medium mb-4 py-1 border-b border-b-gray-300 dark:border-b-gray-700">Notifications</h2>

//                       {notifications.length > 0 ? (
//                         <ul>
//                         {(showAllNotifications ? notifications : notifications.slice(0, 9)).map((notification) => (
//                           <li
//                             key={notification._id}
//                             className={`py-2 text-xs leading-snug rounded border-b border-b-gray-300 dark:border-b-gray-700 ${
//                               notification.isRead ? 'text-gray-400 dark:text-purple-400' : 'cursor-pointer text-xs font-semibold text-purple-600 dark:text-purple-500'
//                             }`}
//                             onClick={() => handleNotificationClick(notification._id)}
//                           >
                          
//                             <div className='flex gap-2 flex-wrap md:flex-nowrap md:justify-center'>

//                               <img 
//                                 src={notification.creatorProfilePicture || defaultAvatar} 
//                                 className="h-8 w-8 object-cover rounded-full items-start" 
//                                 alt={notification.creatorUsername || "User Avatar"} 
//                               />
//                               <div>
//                                 <p dangerouslySetInnerHTML={{ __html: notification.message }}></p>
                          
//                                 <p className="text-xs pt-2 text-purple-600 dark:text-purple-500">
//                                   {notification.timeAgo}
//                                   {/* You could as well use moment.js to format the date */}
//                                   {/* {moment(notification.createdAt).fromNow()} */}
//                                 </p>

//                                 <div className='flex text-xs justify-end items-center py-1'>
//                                   <button className='text-xs py-1 px-2 border border-gray-300 dark:border-gray-700 rounded-full text-purple-600 dark:text-purple-400'>
//                                     {notification.isRead  ? 'Read' : 'Mark as Read'}
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                       ) : (
//                         <p className="text-gray-500">No notifications</p>
//                       )}
                      
//                       <Button
//                         className="mt-4 w-full"
//                         gradientDuoTone='purpleToBlue'
//                         onClick={() => {
//                           navigate('/dashboard?tab=notifications');
//                           setIsModalOpen(false); // Close the modal after navigation
//                         }}
//                         type="button"
//                       >
//                         View All Notifications
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//             <Dropdown className="px-4" arrowIcon={false} inline label={
//               <Avatar 
//                 img={currentUser.profilePicture || defaultAvatar} 
//                 alt='user' 
//                 rounded 
//                 className='border-4 border-blue-400 dark:border-blue-400 rounded-full' 
//               />
//             }>
//               <Dropdown.Header>
//                 <span className='block text-sm font-medium tracking-wide'>@{currentUser.username}</span>
//                 <span className='block text-xs tracking-wide truncate'>{currentUser.email}</span>
//               </Dropdown.Header>
              
//               {currentUser.isAdmin && (
//                 <>
//                   <Link to={'/dashboard?tab=dash'}>
//                     <Dropdown.Item>
//                       <img src={DashboardIcon} alt="Dashboard" className="w-5 h-5 mr-4" /><span>Dashboard</span>
//                     </Dropdown.Item>
//                   </Link>

//                   <Dropdown.Divider />
//                 </>
//               )}


//               <Link to={'/dashboard?tab=profile'}>
//                 <Dropdown.Item>
//                   <img src={ProfileIcon} className="w-5 h-5 mr-4" alt="Profile" /><span>Profile</span>
//                 </Dropdown.Item>
//               </Link>
              
//               <Dropdown.Divider />

//               <Dropdown.Item onClick={handleSignout}>
//                 <img src={LogoutIcon} className="w-5 h-5 mr-4" alt="Sign Out" /><span>Sign Out</span>
//               </Dropdown.Item>
//             </Dropdown>
//           </>
//         ) : (
//           <Link to='/sign-in'>
//             <Button gradientDuoTone='purpleToBlue' outline className='self-center'>
//               <FaUser className='self-center' />&nbsp;
//               Sign In
//             </Button>
//           </Link>
//         )}

//         <Navbar.Toggle className='md:hidden' />
//       </div>

//       <Navbar.Collapse>
//         <Navbar.Link active={path === "/"} as={"div"}>
//           <Link to="/">
//             Home
//           </Link>
//         </Navbar.Link>  

//         <Navbar.Link active={path === "/about"} as={"div"}>
//           <Link to="/about">
//             About
//           </Link>
//         </Navbar.Link>  
 
//         <Navbar.Link active={path === "/faq"} as={"div"}>
//           <Link to="/faq">
//             FAQ
//           </Link>
//         </Navbar.Link>  

//         <Navbar.Link active={path === "/team"} as={"div"}>
//           <Link to="/team">
//             Team
//           </Link>
//         </Navbar.Link>  

//         <Navbar.Link active={path === "/contact"} as={"div"}>
//           <Link to="/contact">
//             Contact
//           </Link>
//         </Navbar.Link> 
//       </Navbar.Collapse>

//     </Navbar>
//   );
// }
