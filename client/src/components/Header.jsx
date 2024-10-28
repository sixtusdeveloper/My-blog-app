import React, { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'; 
import { FaMoon, FaSun, FaBell, FaUser } from 'react-icons/fa'; 
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import DashboardIcon from '/dashboard.webp';
import ProfileIcon from '/profile.webp';
import LogoutIcon from '/logout.webp';

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

  useEffect(() => {
    // Get the search query from the URL
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');  // Get the search term from the URL
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);  // Set the search term state
    } 
  }, [location.search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        navigate(`/search?${urlParams.toString()}`);
      }
    }, 300); // Adjust the delay as necessary

    return () => {
      clearTimeout(handler); // Cleanup
    };
  }, [searchTerm, location.search, navigate]);


  const loadNotifications = async () => {
    try {
      const response = await fetch('/api/notifications/getnotifications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const { notifications, totalCount } = await response.json();
      setNotifications(notifications);
      setUnreadCount(totalCount); // Set the total count
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  // Call loadNotifications when the component mounts
  useEffect(() => {
    loadNotifications();
  }, []); // Empty dependency array to run only once

   
  // Toggle modal function
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    if (!isModalOpen) {
      loadNotifications(); // Fetch notifications when opening the modal
      setUnreadCount(0); // Reset unread count
    }
  };

  
  // const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleCloseModal = (e) => {
    if (e.target.id === 'notification-modal') setIsModalOpen(false);
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      await fetch(`/api/notifications/markAsRead/${notificationId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      loadNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };


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
            <div className="px-1 relative items-center mx-auto">
              <button type='button' className='border border-gray-300 dark:border-gray-700 rounded-full p-2 self-center mx-auto items-center' onClick={toggleModal}>
                <FaBell size={18} />
              </button>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-2">
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
                <div className="bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg p-6 w-96">
                <h2 className="text-lg font-medium mb-4 py-1 border-b border-b-gray-300 dark:border-b-gray-700">Notifications</h2>

                {notifications?.length > 0 ? (
                  <ul>
                    {notifications.map((notification) => (
                      <li
                        key={notification._id}
                        className={`py-2 rounded border-b border-b-gray-300 dark:border-b-gray-700 ${
                          notification.isRead
                            ? 'text-gray-600 dark:text-gray-300'
                            : 'font-medium text-gray-600 dark:text-gray-300'
                        }`}
                        onClick={() => handleNotificationClick(notification._id)}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: notification.message }}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No notifications</p>
                )}

                <Button
                  className="mt-4 w-full"
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                >
                  Close
                </Button>
              </div>


              </div>
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


