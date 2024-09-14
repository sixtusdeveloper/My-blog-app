import React from 'react'
import { Navbar, TextInput, Button } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'; 
import { FaMoon } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';



export default function Header () {

  const path = useLocation().pathname;  // get the current path
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className="flex items-center self-center whitespace-nowrap text-sm md:text-base lg:text-lg font-semibold dark:text-white">
          <img src="/Logo-icon.png" alt="Logo icon" width='30px' height="30px"/>
          <span className='self-center mx-1 py-1 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
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
     
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden md:block' color='gray' pill>
          <FaMoon />
        </Button>

        <Link to='/sign-in'>
          <Button gradientDuoTone='purpleToBlue' outline className='self-center'>
            <FaUser className='self-center' />&nbsp;
            Sign In
          </Button>
        </Link>

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
  )
}

