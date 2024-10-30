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
                <h1 className="text-3xl lg:text-5xl py-8 mt-10 font-bold">
                    Posts in "{category}" Category
                </h1>

                {/* Display the total number of posts */}
                <p className="my-4 text-gray-500 dark:text-gray-200">
                    Total posts: <span className='text-blue-500 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1'>{totalPosts}</span> {/* Ensure this displays the total */}
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


