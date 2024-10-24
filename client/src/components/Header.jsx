
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'; 
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import DashboardIcon from '/dashboard.webp';
import ProfileIcon from '/profile.webp';
import LogoutIcon from '/logout.webp';

export default function Header () {
  const dispatch = useDispatch();
  const path = useLocation().pathname;  // get the current path
  const { currentUser } = useSelector(state => state.user); 
  const { theme } = useSelector(state => state.theme);  // get the current theme
  const [searchTerm, setSearchTerm] = useState('');  // Search term state 
  const location = useLocation();  // Get the current location
  const navigate = useNavigate();  // Get the navigate function
  // Define a fallback avatar image
  const defaultAvatar = '/public/user.png'; // You can use an appropriate path to a default avatar image


  useEffect(() => {
    // Get the search query from the URL
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');  // Get the search term from the URL
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);  // Set the search term state
    } 
  }, [location.search]);

   // Signed Out function
  const handleSignout = async () => {   

    try {
        const res = await fetch('/api/user/signout', {
            method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
            console.log(data.message); 
        }
        else {
            dispatch(signoutSuccess());
        }
    } catch (error) {   
        console.log(error);
    }
  }


  // Handle the search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);  // Set the search term in the URL
    const searchQuery = urlParams.toString();  // Convert the URLSearchParams object to a string
    // Redirect to the search page with the search term
    navigate(`/search?${searchQuery}`); 
  }


  return (
    <Navbar className='border-b-2 lg:px-4 fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-800'>
      <Link to="/" className="flex items-center self-center whitespace-nowrap text-sm md:text-base lg:text-lg font-semibold dark:text-white">
        <img src="/Logo-icon.png" alt="Logo icon" width='30px' height="30px"/>
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
     
      <div className='flex gap-4 lg:gap-8 md:order-2'>
        <Button className='w-12 h-10' color='gray' pill 
        onClick={() => dispatch(
          toggleTheme()
        )}>
          {theme === 'light' ? <FaSun /> : <FaMoon /> } 
        </Button>

        {currentUser ? (
          <Dropdown className="px-4" arrowIcon={false} inline label={
            <Avatar 
              img={currentUser.profilePicture || defaultAvatar}  // Use defaultAvatar if profilePicture is undefined
              alt='user' 
              rounded 
              className='border-4 border-blue-400 dark:border-blue-400 rounded-full' 
            />
          }>
            <Dropdown.Header>
              <span className='block text-sm font-medium tracking-wide'>@{currentUser.username}</span>
              <span className='block text-xs tracking-wide truncate'>{currentUser.email}</span>
            </Dropdown.Header>

            <Link to={'/dashboard?tab=dash'}>
              <Dropdown.Item>
              <img src={DashboardIcon} alt="Dashboard" className="w-5 h-5 mr-4" /><span>Dashboard</span>
              </Dropdown.Item>
            </Link>

            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>
              <img src={ProfileIcon} className="w-5 h-5 mr-4" alt="signout" /><span>Profile</span>
              </Dropdown.Item>
            </Link>
            
            <Dropdown.Divider />

            <Dropdown.Item onClick={handleSignout}>
              <img src={LogoutIcon} className="w-5 h-5 mr-4" alt="signout" /><span>Sign Out</span>
            </Dropdown.Item>
            
          </Dropdown>
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


