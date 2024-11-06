
// Code is functioning properly but with a proper implementation of the notification controller.
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'; 
import { FaMoon, FaSun, FaBell, FaUser, FaTimes } from 'react-icons/fa'; 
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import DashboardIcon from '/dashboard.webp';
import ProfileIcon from '/profile.webp';
import LogoutIcon from '/logout.webp';
import moment from 'moment';



export default function Header() {
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

  // Sync the search term from URL when the component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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

  useEffect(() => {
    loadNotifications();
  }, []);


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
        <span className='self-center mx-1 py-1 px-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-800 rounded-lg text-white'>
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
                  <button type='button' className='border border-gray-300 dark:border-gray-700 rounded-full p-2 self-center mx-auto items-center' onClick={toggleModal}>
                    <FaBell size={18} />
                  </button>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-2">
                      {unreadCount}
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
                              notification.isRead ? 'text-gray-400 dark:text-purple-400' : 'cursor-pointer text-xs font-medium text-purple-600 dark:text-purple-500'
                            }`}
                            onClick={() => handleNotificationClick(notification._id)}
                          >
                          
                            <div className='flex gap-2 flex-wrap md:flex-nowrap md:justify-center'>

                              <img src={notification.creatorProfilePicture || defaultAvatar} className="h-8 w-8 objet-cover items-start" alt="User Avatar" />
                              <div>
                                <p dangerouslySetInnerHTML={{ __html: notification.message }}></p>
                          
                                <p className="text-xs py-1 text-purple-400 dark:text-purple-400">
                                  {moment(notification.createdAt).fromNow()}
                                </p>

                                <div className='flex text-xs justify-between items-center py-1'>
                                  <span className='text-xs py-1 px-2 border border-gray-300 dark:border-gray-700 rounded-full text-purple-600 dark:text-purple-400'>
                                    {notification.isRead  ? 'Read' : 'Mark as Read'}
                                  </span>

                                  <button className='text-xs py-1 px-2 border border-gray-300 dark:border-gray-700 rounded-full text-gray-600 dark:text-gray-400' type='button'>delete</button>
                                </div>
                              </div>
                            </div>
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
//   const [isModalOpen, setIsModalOpen] = useState(false); 
//   const [showAllNotifications, setShowAllNotifications] = useState(false);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);

//   const loadNotifications = async () => {
//     try {
//       const response = await fetch('/api/notifications/getNotifications');
//       const data = await response.json();
      
//       if (Array.isArray(data)) {
//         setNotifications(data);
//         setUnreadCount(data.filter(n => !n.isRead).length);
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
//     loadNotifications();
//   }, []);

//   const toggleModal = () => {
//     setIsModalOpen(prev => !prev);
//     if (!isModalOpen) {
//       loadNotifications();
//       setUnreadCount(0);
//       setShowAllNotifications(false);
//     }
//   };

//   const handleCloseModal = (e) => {
//     if (e.target.id === 'notification-modal') setIsModalOpen(false);
//   };

//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }

//     return () => {
//       document.body.style.overflow = ''; 
//     };
//   }, [isModalOpen]);

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
//         <span className='self-center mx-1 py-1 px-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-800 rounded-lg text-white'>
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
//             <div className="px-1 relative items-center mx-auto">
//               <button type='button' className='border border-gray-300 dark:border-gray-700 rounded-full p-2 self-center mx-auto items-center' onClick={toggleModal}>
//                 <FaBell size={18} />
//               </button>
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-2">
//                   {unreadCount}
//                 </span>
//               )}
//             </div>

//             {isModalOpen && (
//               <div
//                 id="notification-modal"
//                 className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//                 onClick={handleCloseModal}
//               >
//                 <div
//                   className="relative bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg p-6 w-96 max-h-[65vh] overflow-y-auto"
//                 >
//                   <FaTimes
//                     className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 cursor-pointer"
//                     onClick={() => setIsModalOpen(false)}
//                     size={18}
//                   />

//                   <h2 className="text-lg font-medium mb-4 py-1 border-b border-b-gray-300 dark:border-b-gray-700">Notifications</h2>

//                   {notifications.length > 0 ? (
//                     <ul>
//                       {(showAllNotifications ? notifications : notifications.slice(0, 3)).map((notification) => (
//                         <li
//                           key={notification._id}
//                           className={`py-2 text-xs leading-snug rounded border-b border-b-gray-300 dark:border-b-gray-700 ${
//                             notification.isRead ? 'text-gray-400 dark:text-purple-300' : 'cursor-pointer font-medium text-purple-600 dark:text-purple-500'
//                           }`}
//                           onClick={() => handleNotificationClick(notification._id)}
//                         >
//                           <div dangerouslySetInnerHTML={{ __html: notification.message }} />
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-gray-500">No notifications</p>
//                   )}
                  
//                   <Button
//                     className="mt-4 w-full"
//                     gradientDuoTone='purpleToBlue'
//                     onClick={() => setShowAllNotifications(true)}
//                     type="button"
//                   >
//                     View All Notifications
//                   </Button>
//                 </div>
//               </div>
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
//                   <Link to={'/dashboard?tab=profile'}>
//                     <Dropdown.Item>
//                       <img src={ProfileIcon} alt="Dashboard" className="w-5 h-5 mr-4" /><span>Profile</span>
//                     </Dropdown.Item>
//                   </Link>
//                 </>
//               )}

//               <Dropdown.Divider />

//               <Dropdown.Item onClick={handleSignout}>
//                 <img src={LogoutIcon} alt="Dashboard" className="w-5 h-5 mr-4" /><span>Sign out</span>
//               </Dropdown.Item>
//             </Dropdown>
//           </>
//         ) : (
//           <Link to={'/signin'}>
//             <Button className='py-2 px-3 font-semibold' gradientDuoTone='purpleToBlue'>
//               Signin
//             </Button>
//           </Link>
//         )}
//       </div>
//     </Navbar>
//   );
// }











// import React, { useEffect, useState } from 'react';
// import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AiOutlineSearch } from 'react-icons/ai'; 
// import { FaMoon, FaSun } from 'react-icons/fa';
// import { FaUser } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleTheme } from '../redux/theme/themeSlice';
// import { signoutSuccess } from '../redux/user/userSlice';
// import DashboardIcon from '/dashboard.webp';
// import ProfileIcon from '/profile.webp';
// import LogoutIcon from '/logout.webp';

// export default function Header () {
//   const dispatch = useDispatch();
//   const path = useLocation().pathname;  // get the current path
//   const { currentUser } = useSelector(state => state.user); 
//   const { theme } = useSelector(state => state.theme);  // get the current theme
//   const [searchTerm, setSearchTerm] = useState('');  // Search term state 
//   const location = useLocation();  // Get the current location
//   const navigate = useNavigate();  // Get the navigate function
//   // Define a fallback avatar image
  // const defaultAvatar = '/public/user.png'; // You can use an appropriate path to a default avatar image


  // useEffect(() => {
  //   // Get the search query from the URL
  //   const urlParams = new URLSearchParams(location.search);
  //   const searchTermFromUrl = urlParams.get('searchTerm');  // Get the search term from the URL
  //   if (searchTermFromUrl) {
  //     setSearchTerm(searchTermFromUrl);  // Set the search term state
  //   } 
  // }, [location.search]);

//    // Signed Out function
//   const handleSignout = async () => {   

//     try {
//         const res = await fetch('/api/user/signout', {
//             method: 'POST',
//         });
//         const data = await res.json();
//         if (!res.ok) {
//             console.log(data.message); 
//         }
//         else {
//             dispatch(signoutSuccess());
//         }
//     } catch (error) {   
//         console.log(error);
//     }
//   }


//   // Handle the search form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(location.search);
//     urlParams.set('searchTerm', searchTerm);  // Set the search term in the URL
//     const searchQuery = urlParams.toString();  // Convert the URLSearchParams object to a string
//     // Redirect to the search page with the search term
//     navigate(`/search?${searchQuery}`); 
//   }


//   return (
//     <Navbar className='border-b-2 fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-800'>
//       <Link to="/" className="flex items-center self-center whitespace-nowrap text-sm md:text-base lg:text-base font-semibold dark:text-white">
//         <img src="/Logo-icon.png" alt="Logo icon" width='25px' height="25px"/>
//         <span className='self-center mx-1 py-1 px-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-800 rounded-lg text-white'>
//         DevJourney
//         </span>
//       </Link>
//       <form onSubmit={handleSubmit}>
//         <TextInput 
//         className="hidden md:block"
//         type="text" 
//         rightIcon={AiOutlineSearch} 
//         placeholder='Search for a topic' 
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)} 
//         />
//       </form>

//       <Button className='w-12 h-10 hidden md:hidden' color='gray' pill>
//         <AiOutlineSearch />
//       </Button>
     
//       <div className='flex items-center self-center gap-4 lg:gap-8 md:order-2'>
//         <Button className='w-10 h-8 items-center self-center' color='gray' pill 
//         onClick={() => dispatch(
//           toggleTheme()
//         )}>
//           {theme === 'light' ? <FaSun /> : <FaMoon /> } 
//         </Button>

//         {currentUser ? (
//           <Dropdown className="px-4" arrowIcon={false} inline label={
//             <Avatar 
//               img={currentUser.profilePicture || defaultAvatar}  // Use defaultAvatar if profilePicture is undefined
//               alt='user' 
//               rounded 
//               className='border-4 border-blue-400 dark:border-blue-400 rounded-full' 
//             />
//           }>
//             <Dropdown.Header>
//               <span className='block text-sm font-medium tracking-wide'>@{currentUser.username}</span>
//               <span className='block text-xs tracking-wide truncate'>{currentUser.email}</span>
//             </Dropdown.Header>

//             <Link to={'/dashboard?tab=dash'}>
//               <Dropdown.Item>
//               <img src={DashboardIcon} alt="Dashboard" className="w-5 h-5 mr-4" /><span>Dashboard</span>
//               </Dropdown.Item>
//             </Link>

//             <Link to={'/dashboard?tab=profile'}>
//               <Dropdown.Item>
//               <img src={ProfileIcon} className="w-5 h-5 mr-4" alt="signout" /><span>Profile</span>
//               </Dropdown.Item>
//             </Link>
            
//             <Dropdown.Divider />

//             <Dropdown.Item onClick={handleSignout}>
//               <img src={LogoutIcon} className="w-5 h-5 mr-4" alt="signout" /><span>Sign Out</span>
//             </Dropdown.Item>
            
//           </Dropdown>
//         ) : (

//         <Link to='/sign-in'>
//           <Button gradientDuoTone='purpleToBlue' outline className='self-center'>
//             <FaUser className='self-center' />&nbsp;
//             Sign In
//           </Button>
//         </Link>
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


