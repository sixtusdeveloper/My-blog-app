import React, { useEffect, useState } from 'react';
import javaImage from '/java.jpg'; // Ensure this path is correct
import { Button, Spinner } from 'flowbite-react'
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import CallToAction from './CallToAction';

export default function Home() {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/post/getPosts');
        const data = await response.json();
        setPosts(data.posts);
        // Use setTimeout to simulate some delay for loading
        setTimeout(() => {
          setLoading(false);
        }, 2000); // 3 seconds
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);


  return (
    <div className="w-full pt-10 bg-white dark:bg-[rgb(16,23,42)]">
      {/* Hero Section */}
      <section 
        className="relative flex flex-col lg:flex-row justify-between items-center py-20 px-4 lg:px-20 min-h-[80vh]" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(35, 56, 56, 180), rgba(35, 55, 156, 0.4)), url(${javaImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
        }}
      >
        {/* Left Side: Welcome Message */}
        <div className="lg:w-3/5 w-full bg-blue-900 bg-opacity-20 rounded-md shadow-sm flex flex-col items-start justify-center p-4 md:p-8">
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
            Welcome to My Blog!
          </h1>
          <p className="text-lg lg:text-xl text-gray-100 mb-6">
            Hi, I'm Sixtus Aondoakaa, a software engineer passionate about technology and coding. Here, I share insights, tutorials, and experiences on software development, best practices, and more!
          </p>
          
          <Link to='/search'>
            <Button type='button' gradientDuoTone='purpleToPink' className='text-xl font-medium p-2'>Explore Posts</Button>
          </Link>
        </div>
      </section>

      {/* Blog Posts Section */}
      <div className='py-8 px-4 lg:px-4 w-full max-w-6xl mx-auto'>
        <div className='flex flex-col justify-center items-center mb-5'>
          <h2 className='py-4 text-2xl text-center font-bold dark:text-gray-300 text-gray-800 mb-4'>Recent Posts</h2>

          {/* Display Spinner if loading is true */}
          {loading ? (
            <Spinner size="xl" className="my-4" />
          ) : (
            <div className='grid gap-4 lg:gap-6 justify-center items-center md:grid-cols-3'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {!loading && (
            <Link to={'/search'}>
              <Button gradientDuoTone='purpleToBlue' outline className='self-center my-4'>
                View all posts
              </Button>
            </Link>
          )}
        </div>
        <div className='py-8'>

          <CallToAction />
        </div>
      </div>

    </div>
  );
}






