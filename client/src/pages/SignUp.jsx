import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';
import authBg from '/auth-bg.webp'; // Ensure this path is correct

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {  
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation: Check if all fields are filled
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill in all fields');
    }

    try {
      setLoading(true);
      setErrorMessage(null); // Clear any previous error messages

      // Sending POST request to the API
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      // If the API returns an error, display the message
      if (!res.ok) {
        const errorMsg = data.message || 'Something went wrong. Please try again.';
        setErrorMessage(errorMsg);
        setLoading(false);
        return;
      }

      // If signup is successful, redirect to the sign-in page
      if (res.ok) {
        navigate('/sign-in');
      }
      
      setLoading(false);
    } catch (error) {
      // Handle any network or unexpected errors
      setErrorMessage('An unexpected error occurred. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className='bg-white dark:bg-[rgb(16,23,42)] w-full'>
       <div
        className="relative flex flex-col lg:flex-row justify-between items-center pt-20 px-4 lg:px-10 min-h-[85vh]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(35, 56, 56, 0.2), rgba(35, 35, 56, 0.1)), url(${authBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
        }}
      >
        
        <div className='flex self-center py-20 px-8 lg:px-10 max-w-5xl gap-8 mx-auto flex-col md:flex-row'>
          {/* Left side content */}
          <div className='flex-1'>
            <h1 className="text-2xl font-bold text-white">
              Join DevJourney Today
            </h1>
            <p className="text-base mt-4 text-gray-200">
              DevJourney is more than just a blog—it's a community of passionate developers and creatives. 
              Whether you're looking to sharpen your skills, share your experiences, or collaborate on 
              exciting projects, you'll find everything you need here. My platform features expert 
              articles, tutorials, and real-world insights from professionals like you.
            </p>
            <p className="text-base mt-3 text-gray-200">
              By joining, you gain access to personalized content, networking opportunities, and the 
              chance to contribute your own stories and insights. Let’s grow together in the world of 
              development and make an impact. Start your journey with me today!
            </p>
          </div>

          {/* Right side content (Sign-Up form) */}
          <div className='flex-1'>
            {/* Error message display */}
            {errorMessage && (
              <Alert className='mb-4 text-base' color='failure'>
                {errorMessage}
              </Alert>
            )}

            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <OAuth /> {/* Added the OAuth component */}
              <div>
                <Label value="Your username" className='text-sm text-gray-300' />
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="username"
                  className='text-base'
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your Email" className='text-sm text-gray-300' />
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  className='text-base'
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your Password" className='text-sm text-gray-300' />
                <TextInput
                  type="password"
                  placeholder="********"
                  id="password"
                  className='text-base'
                  onChange={handleChange}
                />
              </div>

              <Button gradientDuoTone='purpleToPink' className='text-lg tracking-wide font-medium p-2' type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='ml-2'>Loading...</span>
                  </>
                ) : (
                  'Sign up' 
                )}
              </Button>
            </form>

            <p className="text-sm mt-3 text-gray-200">
              Already have an account? <Link to="/sign-in" className='text-purple-500'>Sign In here</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}






