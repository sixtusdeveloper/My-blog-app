import React, { useEffect, useState } from 'react';
import javaImage from '/java.jpg'; // Ensure this path is correct
import { Button, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import CallToAction from './CallToAction';
import { FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PollSection from '../components/PollSection';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(6); // State for 'View More' button

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/post/getPosts');
        const data = await response.json();
        setPosts(data.posts);
        // Use setTimeout to simulate some delay for loading
        setTimeout(() => {
          setLoading(false);
        }, 2000); // 2 seconds
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Handler for toggling the view of posts
  const handleViewMore = () => {
    if (visiblePosts >= posts.length) {
      setVisiblePosts(6); // Reset if all posts are visible
    } else {
      setVisiblePosts((prev) => prev + 6); // Show more posts in increments of 6
    }
  };

  return (
    <section className="w-full bg-white dark:bg-[rgb(16,23,42)]">
      {/* Hero Section */}
      <div
        className="relative flex flex-col lg:flex-row justify-between items-center pt-20 px-4 lg:px-10 min-h-[85vh]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(35, 56, 56, 180), rgba(35, 55, 156, 0.4)), url(${javaImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
        }}
      >
        <div className="lg:w-3/5 w-full bg-blue-900 bg-opacity-20 rounded-md shadow-sm flex flex-col items-start justify-center p-4 md:p-8">
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
            Welcome to My Blog!
          </h1>
          <p className="text-lg lg:text-xl text-gray-100 mb-6">
            Hi, I'm Sixtus Aondoakaa, a software engineer passionate about technology and coding.
            Here, I share insights, tutorials, and experiences on software development, best practices, and more!
          </p>

          <Link to="/search">
            <Button type="button" gradientDuoTone="purpleToPink" className="text-xl font-medium p-2">
              Explore Posts
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Post */}
      <div className="featured-post py-8 md:px-1 px-4 md:py-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center md:text-start my-8 md:my-10">Featured Post</h2>
          <div className="p-4 border border-gray-300 dark:border-gray-800 rounded-lg flex md:flex-row flex-col items-center gap-8">
            <img
              src="/transition.avif"
              alt="Featured Post"
              className="md:w-1/3 max-w-full object-cover rounded-lg"
            />
            <div className="py-4">
              <h3 className="text-xl font-bold">
                How I Transitioned Into Tech: From Beginner to Full-Stack Engineer
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Read about my journey from a beginner to a Full-Stack Software Engineer...
              </p>
              <p className="flex items-center text-lg mt-4">
                <Link to="/post/how-i-transitioned-into-tech-from-beginner-to-full-stack-engineer" className="text-green-500 hover:text-green-600 mt-4 items-center inline-block">
                  <span className="flex items-center">
                    Read post <FaArrowRight size={18} className="ml-1" />
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Posts Section */}
      <div className="popular-posts px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Trending Posts</h2>
          <ul className="space-y-4">
            {posts.slice(0, visiblePosts).map((post) => (
              <li key={post._id} className="border-b border-b-gray-300 dark:border-b-gray-700 pb-4">
                <h3 className="text-lg font-bold">
                  <Link to={`/post/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
              </li>
            ))}
          </ul>

          {/* View More / View Less Button */}
          {posts.length > 6 && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={handleViewMore}
                gradientDuoTone="purpleToBlue"
                outline
                className="flex items-center"
              >
                {visiblePosts >= posts.length ? 'View Less' : 'View More'}
                {visiblePosts >= posts.length ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Blog Posts Section */}
      <section className="py-8 px-4 lg:px-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col justify-center items-center mb-5">
          <h2 className="py-4 text-2xl text-center font-bold dark:text-gray-300 text-gray-800 mb-4">
            Recent Posts
          </h2>

          {loading ? (
            <Spinner size="xl" className="my-4" />
          ) : (
            <div className="grid gap-4 lg:gap-6 justify-center items-center md:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {!loading && (
            <Link to="/search">
              <Button gradientDuoTone="purpleToBlue" outline className="self-center my-4">
                View all posts
              </Button>
            </Link>
          )}
        </div>

        <div className="py-8">
          <CallToAction />
        </div>

        <div className="max-w-3xl mx-auto w-full">
          <PollSection />
        </div>
      </section>
    </section>
  );
}














// import React, { useEffect, useState } from 'react';
// import javaImage from '/java.jpg'; // Ensure this path is correct
// import { Button, Spinner } from 'flowbite-react'
// import { Link } from 'react-router-dom';
// import PostCard from '../components/PostCard';
// import CallToAction from './CallToAction';
// import { FaArrowRight } from 'react-icons/fa';
// import PollSection from '../components/PollSection';

// export default function Home() {
//   const [posts, setPosts] = useState([]); 
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('/api/post/getPosts');
//         const data = await response.json();
//         setPosts(data.posts);
        // // Use setTimeout to simulate some delay for loading
        // setTimeout(() => {
        //   setLoading(false);
        // }, 2000); // 3 seconds
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);


//   return (
//     <section className="w-full bg-white dark:bg-[rgb(16,23,42)]">
//       {/* Hero Section */}
//       <div 
//         className="relative flex flex-col lg:flex-row justify-between items-center pt-20 px-4 lg:px-20 min-h-[80vh]" 
//         style={{
//           backgroundImage: `linear-gradient(to right, rgba(35, 56, 56, 180), rgba(35, 55, 156, 0.4)), url(${javaImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'right center',
//         }}
//       >
//         {/* Left Side: Welcome Message */}
//         <div className="lg:w-3/5 w-full bg-blue-900 bg-opacity-20 rounded-md shadow-sm flex flex-col items-start justify-center p-4 md:p-8">
//           <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
//             Welcome to My Blog!
//           </h1>
//           <p className="text-lg lg:text-xl text-gray-100 mb-6">
//             Hi, I'm Sixtus Aondoakaa, a software engineer passionate about technology and coding. Here, I share insights, tutorials, and experiences on software development, best practices, and more!
//           </p>
          
//           <Link to='/search'>
//             <Button type='button' gradientDuoTone='purpleToPink' className='text-xl font-medium p-2'>Explore Posts</Button>
//           </Link>
//         </div>
//       </div>
     
//      {/* Featured Post */}
//       <div className="featured-post py-8 md:px-1 px-4 md:py-10">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-2xl font-bold text-center md:text-start my-8 md:my-10">Featured Post</h2>
//           <div className="p-4 border border-gray-300 dark:border-gray-800 rounded-lg flex md:flex-row flex-col items-center gap-8">
            
//             <img src="/transition.avif" alt="Featured Post" 
//               // className="md:w-1/3 p-4 max-w-full border border-gray-300 dark:border-gray-800 rounded-lg"
//                className="md:w-1/3 max-w-full object-cover rounded-lg"
//             />
           
//             <div className='py-4'>
//               <h3 className="text-xl font-bold">How I Transitioned Into Tech: From Beginner to Full-Stack Engineer</h3>
//               <p className="text-gray-600 dark:text-gray-300 mt-2">Read about my journey from a beginner to a Full-Stack Software Engineer...</p>
//               <p className="flex items-center text-lg mt-4">
//                 <a href="/post/how-i-transitioned-into-tech-from-beginner-to-full-stack-engineer" className="text-green-500 hover:text-green-600 mt-4 items-center inline-block">
//                   <span className='flex items-center'>
//                     Read post
//                     <FaArrowRight size={18} className="ml-1" />
//                   </span>
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="popular-posts px-6 py-8">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-2xl font-bold mb-6">Trending Posts</h2>
//           <ul className="space-y-4">
//             <li className="border-b border-b-gray-300 dark:border-b-gray-700 pb-4">
//               <h3 className="text-lg font-bold"><a href="/post/how-to-ace-your-tech-interviews-" className="hover:underline">How to Ace Your Tech Interviews 🔥</a></h3>
//               <p className="text-gray-600 dark:text-gray-300">A guide to mastering technical interviews and landing your dream job.</p>
//             </li>

//             <li className="border-b border-b-gray-300 dark:border-b-gray-700 pb-4">
//               <h3 className="text-lg font-bold"><a href="/post/top-10-frontend-tools-in-2024-" className="hover:underline">Top 10 Frontend Tools in 2024 🚀</a></h3>
//               <p className="text-gray-600 dark:text-gray-300">Explore the must-have tools for frontend developers this year.</p>
//             </li>

//             <li className="border-b border-b-gray-300 dark:border-b-gray-700 pb-4">
//               <h3 className="text-lg font-bold"><a href="/post/top-10-frontend-tools-in-2024-" className="hover:underline">Backend Development: An Essential Guide to Building Scalable Applications 🛠️✨</a></h3>
//               <p className="text-gray-600 dark:text-gray-300">Powering the Future, One Backend at a Time.</p>
//             </li>
//           </ul>
//            {/* Add a "View all" button here  */}

//         </div>
//       </div>

//       {/* Blog Posts Section */}
//       <section className='py-8 px-4 lg:px-10 w-full max-w-6xl mx-auto'>
//         <div className='flex flex-col justify-center items-center mb-5'>
//           <h2 className='py-4 text-2xl text-center font-bold dark:text-gray-300 text-gray-800 mb-4'>Recent Posts</h2>

//           {/* Display Spinner if loading is true */}
//           {loading ? (
//             <Spinner size="xl" className="my-4" />
//           ) : (
//             <div className='grid gap-4 lg:gap-6 justify-center items-center md:grid-cols-3'>
//               {posts.map((post) => (
//                 <PostCard key={post._id} post={post} />
//               ))}
//             </div>
//           )}

//           {!loading && (
//             <Link to={'/search'}>
//               <Button gradientDuoTone='purpleToBlue' outline className='self-center my-4'>
//                 View all posts
//               </Button>
//             </Link>
//           )}
//         </div>

//         {/* Call to action */}
//         <div className='py-8'>
//           <CallToAction />
//         </div>

//         <div className='max-w-3xl mx-auto w-full'>
//           <PollSection /> 
//         </div>
       
//       </section>

//     </section>
//   );
// }






