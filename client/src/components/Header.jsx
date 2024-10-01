
import React from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'; 
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header () {
  const dispatch = useDispatch();
  const path = useLocation().pathname;  // get the current path
  const { currentUser } = useSelector(state => state.user); 
  const { theme } = useSelector(state => state.theme);  // get the current theme
  // Define a fallback avatar image
  const defaultAvatar = '/public/user.png'; // You can use an appropriate path to a default avatar image

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


  return (
    <Navbar className='border-b-2 lg:px-8 fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-800'>
      <Link to="/" className="flex items-center self-center whitespace-nowrap text-sm md:text-base lg:text-lg font-semibold dark:text-white">
          <img src="/Logo-icon.png" alt="Logo icon" width='30px' height="30px"/>
          <span className='self-center mx-1 py-1 px-4 bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-800 rounded-lg text-white'>
          DevJourney
          </span>
      </Link>
      <form>
        <TextInput 
        className="hidden md:block"
        type="text" 
        rightIcon={AiOutlineSearch} 
        placeholder='Search for a topic' 
        />
      </form>

      <Button className='w-12 h-10 md:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
     
      <div className='flex gap-4 lg:gap-8 md:order-2'>
        <Button className='w-12 h-10 hidden md:block' color='gray' pill 
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
            />
          }>
            <Dropdown.Header>
              <span className='block text-[14px] tracking-wide'>@{currentUser.username}</span>
              <span className='block text-[13px] font-medium tracking-wide truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>
                Profile
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>
              Sign Out  
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
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">
            Projects
          </Link>
        </Navbar.Link>  
      </Navbar.Collapse>

    </Navbar>
  );
}


