import React, { useEffect, useState } from 'react';
import PostCategory from '../components/PostCategory';
import { Spinner, Button } from "flowbite-react";
import { useParams, Link } from "react-router-dom";

export default function Category() {
    const { category } = useParams();  // Fetch the category from URL parameters
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0);  // Store total number of posts with the category

    useEffect(() => {
        const fetchPostCategory = async () => {
            try {
                const res = await fetch(`/api/post/getposts?category=${category}`);
                const data = await res.json();

                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                // Make sure the API response contains both `posts` and `total`
                console.log("Fetched data:", data);  // Log to debug the response

                if (res.ok) {
                    setPosts(data.posts); // Assuming API response includes posts as data.posts
                    setTotalPosts(data.total || data.posts.length); // Fallback if total is missing

                    // Optional: Simulate loading effect
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                }
            } catch (error) {
                console.log("Error fetching posts:", error);
                setError(true);
                setLoading(false);
            }
        };

        fetchPostCategory();
    }, [category]);

    // Handle loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen py-20">
                <Spinner size="xl" />
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen py-20">
                <p>Failed to load posts. Please try again.</p>
            </div>
        );
    }

    return (
        <div className='dark:bg-[rgb(16,23,42)] overflow-x-hidden min-h-screen w-full py-20'>
            <div className="flex flex-col max-w-6xl mx-auto px-4 md:px-8 lg:px-8">
                <h1 className="text-3xl lg:text-5xl py-8 mt-10 font-serif">
                    Posts in "{category}" Category
                </h1>

                {/* Display the total number of posts */}
                <p className="my-4 text-gray-500">
                    Total posts: {totalPosts} {/* Ensure this displays the total */}
                </p>

                <div className='flex flex-col justify-center items-center mb-5'>
                    {/* Display posts */}
                    <div className="grid gap-4 lg:gap-6 justify-center items-center md:grid-cols-3">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <PostCategory key={post._id} post={post} />
                            ))
                        ) : (
                            <p>No posts available for this category.</p>
                        )}
                    </div>

                    {/* Conditionally render the "View all posts" button if there are more than 9 posts */}
                    {totalPosts > 9 && (
                        <Link to={'/search'}>
                            <Button gradientDuoTone='purpleToBlue' outline className='self-center my-4'>
                                View all posts
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}






// import React, { useEffect, useState } from 'react';
// import PostCategory from '../components/PostCategory';
// import { Spinner, Button } from "flowbite-react";
// import { useParams, Link } from "react-router-dom";

// export default function Category() {
//     const { category } = useParams();  // Fetch the category from URL parameters
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);
//     const [posts, setPosts] = useState([]);
//     const [totalPosts, setTotalPosts] = useState(0);  // Store total number of posts with the category
//     const [recentPosts, setRecentPosts] = useState(null);
   
//     useEffect(() => {
//         const fetchPostCategory = async () => {
//             try {
//                 const res = await fetch(`/api/post/getposts?category=${category}`);
//                 const data = await res.json();
        
//                 if (!res.ok) {
//                     setError(true);
//                     setLoading(false);
//                     return;
//                 }
        
//                 if (res.ok) {
//                     setPosts(data.posts); // Assuming API response includes posts as data.posts
//                     setTotalPosts(data.total); // Assuming the total number of posts comes from data.total
        
//                     // Optional: Simulate loading effect
//                     setTimeout(() => {
//                         setLoading(false);
//                     }, 2000);
//                 }
//             } catch (error) {
//                 setError(true);
//                 setLoading(false);
//             }
//         };
      
//         fetchPostCategory();
//     }, [category]);

//     useEffect(() => {
//         console.log("Category:", category);
//         console.log("Fetched posts:", posts);
//     }, [category, posts]);
    
//     // Fetch recent posts for display if needed (optional)
//     useEffect(() => {
//         try {
//             const fetchRecentPosts = async () => {
//                 const res = await fetch(`/api/post/getposts?limit=9`);
//                 const data = await res.json();
//                 if (res.ok) {
//                     setRecentPosts(data.posts);
//                 }
//             }
//             fetchRecentPosts();
//         } catch (error) {
//             console.log(error.message);
//         }
//     }, []);

//     // Handle loading state
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen py-20">
//                 <Spinner size="xl" />
//             </div>
//         );
//     }

//     // Handle error state
//     if (error) {
//         return (
//             <div className="flex justify-center items-center min-h-screen py-20">
//                 <p>Failed to load posts. Please try again.</p>
//             </div>
//         );
//     }

//     return (
//         <div className='dark:bg-[rgb(16,23,42)] overflow-x-hidden min-h-screen w-full py-20'>
//             <div className="flex flex-col max-w-6xl mx-auto px-4 md:px-8 lg:px-8">
//                 <h1 className="text-3xl lg:text-5xl py-8 mt-10 font-serif">
//                     Posts in "{category}" Category
//                 </h1>
//                 <p className="my-4 text-gray-500">
//                     Total posts: {totalPosts}
//                 </p>

//                 <div className='flex flex-col justify-center items-center mb-5'>
//                     {/* Display posts */}
//                     <div className="grid gap-4 lg:gap-6 justify-center items-center md:grid-cols-3">
//                         {posts.length > 0 ? (
//                             posts.map((post) => (
//                                 <PostCategory key={post._id} post={post} />
//                             ))
//                         ) : (
//                             <p>No posts available for this category.</p>
//                         )}
//                     </div>

//                     {/* Conditionally render the "View all posts" button if there are more than 9 posts */}
//                     {totalPosts > 9 && (
//                         <Link to={'/search'}>
//                             <Button gradientDuoTone='purpleToBlue' outline className='self-center my-4'>
//                                 View all posts
//                             </Button>
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }













// import React, { useEffect, useState } from 'react';
// import PostCategory from '../components/PostCategory';
// import { Spinner, Button } from "flowbite-react";
// import { useParams, Link } from "react-router-dom";


// export default function Category() {
//     const { category } = useParams();  // Fetch the category from URL parameters
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);
//     const [posts, setPosts] = useState([]);
//     const [totalPosts, setTotalPosts] = useState(0);  // Store total number of posts with the category
//     const [recentPosts, setRecentPosts] = useState(null);
   
//     useEffect(() => {
//         const fetchPostCategory = async () => {
//           try {
//             const res = await fetch(`/api/post/getposts?category=${category}`); // Fetch based on the category
//             const data = await res.json();
      
//             if (!res.ok) {
//               setError(true);
//               setLoading(false);
//               return;
//             }
      
//             if (res.ok) {
//               setPosts(data.posts); // Assuming API response includes posts as data.posts
//               setTotalPosts(data.total); // Assuming the total number of posts comes from data.total
      
//               // Optional: Simulate loading effect
//               setTimeout(() => {
//                 setLoading(false);
//               }, 2000);
//             }
//           } catch (error) {
//             setError(true);
//             setLoading(false);
//           }
//         };
      
//         fetchPostCategory();
//       }, [category]); // Dependency is category to trigger the fetch when category changes

      
    
//     // Fetch recent posts for display if needed (optional)
//     useEffect(() => {
//         try {
//             const fetchRecentPosts = async () => {
//                 const res = await fetch(`/api/post/getposts?limit=9`);
//                 const data = await res.json();
//                 if (res.ok) {
//                     setRecentPosts(data.posts);
//                 }
//             }
//             fetchRecentPosts();
//         } catch (error) {
//             console.log(error.message);
//         }
//     }, []);

//     // Handle loading state
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen py-20">
//                 <Spinner size="xl" />
//             </div>
//         );
//     }

//     // Handle error state
//     if (error) {
//         return (
//             <div className="flex justify-center items-center min-h-screen py-20">
//                 <p>Failed to load posts. Please try again.</p>
//             </div>
//         );
//     }

//     return (
//         <div className='dark:bg-[rgb(16,23,42)] overflow-x-hidden min-h-screen w-full py-20'>
//             <div className="flex flex-col max-w-6xl mx-auto px-4 md:px-8 lg:px-8">
//                 <h1 className="text-3xl lg:text-5xl py-8 mt-10 font-serif">
//                     Posts in "{category}" Category
//                 </h1>
//                 <p className="my-4 text-gray-500">Total posts: {totalPosts}</p>

//                 <div className='flex flex-col justify-center items-center mb-5'>
//                     {/* Display posts */}
//                     <div className="grid gap-4 lg:gap-6 justify-center items-center md:grid-cols-3">
//                         {posts.length > 0 ? (
//                             posts.map((post) => (
//                                 <PostCategory key={post._id} post={post} />
//                             ))
//                         ) : (
//                             <p>No posts available for this category.</p>
//                         )}
//                     </div>

//                     <Link to={'/search'}>
//                         <Button gradientDuoTone='purpleToBlue' outline className='self-center my-4'>
//                             View all posts
//                         </Button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }














// import React from 'react'
// import PostCategory from '../components/PostCategory'
// import { Spinner, Button } from "flowbite-react";
// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import CallToAction from "../pages/CallToAction";

   

// export default function Category() {
//     const { postCategory } = useParams();
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);
//     const [post, setPost] = useState({});
//     const [recentPosts, setRecentPosts] = useState(null);
   
//     useEffect(() => {
//         const fetchPostCategory = async () => {
//             try {
//                 const res = await fetch(`/api/post/getposts?category=${postCategory}`);
//                 const data = await res.json();
//                 if (!res.ok) {
//                     setError(true);
//                     setLoading(false);
//                     return;
//                 }

//                 if (res.ok) {
//                     setPost(data.posts[0]);
//                     setError(false);

//                     // Use setTimeout to ensure the spinner stays for at least 3 seconds
//                     setTimeout(() => {
//                         setLoading(false);
//                     }, 2000); // 3 seconds
//                 }
//             } catch (error) {
//                 setError(true);
//                 setLoading(false);
//             }
//         };

//         fetchPostCategory();
//     }, [PostCategory]);


//     useEffect(() => {
        
//             try {
//                 const fetchRecentPosts = async () => {
//                     const res = await fetch(`/api/post/getposts?limit=9`);  
//                     const data = await res.json();
//                     if (!res.ok) {
//                         return;
//                     }

//                     if (res.ok) {
//                         setRecentPosts(data.posts);
//                     }
//                 }
//                 fetchRecentPosts();

//             } catch (error) {
//                 console.log(error.message);
//             }
           
//     }, []);
        

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen py-20">
//                 <Spinner size="xl" />
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center min-h-screen py-20">
//                 <p>Failed to load post. Please try again.</p>
//             </div>
//         );
//     }

//     return (
//         <div className='dark:bg-[rgb(16,23,42)] overflow-x-hidden min-h-screen w-full py-20'>
//             <div className="flex flex-col max-w-5xl mx-auto px-4 md:px-8 lg:px-10">
//                 <h1 className="text-3xl lg:text-4xl pt-6 mt-10 font-serif">Post Category</h1>

//             <div className='flex flex-col justify-center items-center mb-5'>
                
//                     <div className="grid gap-4 lg:gap-6 justify-center items-center md:grid-cols-3">
//                         {recentPosts &&
//                         recentPosts.map((post) => <PostCategory key={post._id} post={post} />)}
//                     </div>

//                     <Link to={'/search'}>
//                         <Button gradientDuoTone='purpleToBlue' outline className='self-center my-4'>
//                         View all posts
//                         </Button>
//                     </Link>

//                 </div>

//             </div>
            
//         </div>
//     )
// }
