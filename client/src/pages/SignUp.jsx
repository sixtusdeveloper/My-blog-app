import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-4xl gap-8 mx-auto flex-col md:flex-row'>
        {/* left side contents */}
        <div className='flex-1'>
          <Link to="/" className="flex items-center self-center text-sm md:text-base lg:text-lg font-semibold dark:text-white">
            <img src="/Logo-icon.png" alt="Logo icon" width='30px' height="30px"/>
            <span className='self-center mx-1 py-1 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            DevJourney
            </span>
          </Link>
          <p className='text-sm mt-5'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi magni repellat nesciunt fuga vel rerum maiores, quas facere corrupti, porro eum a, ullam quo praesentium velit eligendi minus impedit explicabo!
          </p>
        </div>

        <div className='flex-1'>
          {/* right side contents */}
          <form className='flex flex-col gap-4'>
            <div>
              <Label value="Your username" />
              <TextInput 
               type="text"
               placeholder="Username"
               id="username"
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput 
               type="email"
               placeholder="name@company.com"
               id="email"
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput 
               type="password"
               placeholder="Password"
               id="password"
              />
            </div>

            <Button gradientDuoTone='purpleToPink' type="submit">
              Sign Up
            </Button>
          </form>
          <div className='flex mt-5'>
            <p className='text-sm'>
              Already have an account? <Link to="/sign-in" className='text-purple-500'>Sign In</Link>
            </p>  
          </div>
        </div>
      </div>

     
    </div>
  )
}

export default SignUp
