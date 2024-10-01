import { Spinner, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CallToAction from "../pages/CallToAction";
import CommentSection from "../pages/CommentSection";


export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                if (res.ok) {
                    setPost(data.posts[0]);
                    setError(false);

                    // Use setTimeout to ensure the spinner stays for at least 3 seconds
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000); // 3 seconds
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchPost();
    }, [postSlug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen py-20">
                <Spinner size="xl" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen py-20">
                <p>Failed to load post. Please try again.</p>
            </div>
        );
    }

    return (
        <main className="dark:bg-[rgb(16,23,42)] overflow-x-hidden min-h-screen w-full py-20">
            <div className="flex flex-col max-w-5xl mx-auto px-4 md:px-8 lg:px-10 ">
                <h1 className="text-3xl lg:text-4xl pt-6 mt-10 font-serif">{post && post.title}</h1>
                <div className="flex justify-between gap-8 items-center my-2">
                    <div className="flex justify-between items-center gap-4">
                        <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">{post && new Date(post.createdAt).toLocaleString()}</p>

                        <span className='italic text-xs md:text-sm'>
                          {post && (post.content.length / 1000).toFixed(0)} mins read
                        </span>
                    </div>
                    
                    <Link to={`/search?category=${post && post.category}`} className="px-4">
                        <Button color='gray' pill size='sm' className="px-4 tracking-wide">
                            {post && post.category}
                        </Button>
                    </Link>
                </div>
                <img src={post && post.image} alt={post && post.title} className="mt-8 w-full h-96 object-cover rounded-lg" />
                <div dangerouslySetInnerHTML={{ __html: post && post.content }} className="post-content mt-8 font-serif leading-relaxed text-gray-700 dark:text-gray-300">
                </div>

                <div className="w-full py-4">
                 <CallToAction />
                </div>

                <CommentSection postId={post._id} />
            </div>

                
        
            
            
        </main>
    );
}














// import { Spinner } from "flowbite-react";
// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"

// export default function PostPage() {
//     const { postSlug } = useParams();    
//     const [loading, setLoading] = useState(true);    
//     const [error, setError] = useState(false);
//     const [post, setPost] = useState({}); 

//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 setLoading(true);
//                 const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
//                 const data = await res.json()
//                 if(!res.ok) {
//                     setError(true)
//                     setLoading(false)
//                     return

//                 }  

//                 if(res.ok) {
//                     setPost(data.posts[0]);
//                     setError(false);
//                     setLoading(false);
//                 }

              
//             } catch (error) {
//                 setError(true);
//                 setLoading(false);
//             }
//         }

//         fetchPost()
//     }, [postSlug]);

//     if(loading) {
//         return(
//             <div className='flex justify-center items-center min-h-screen py-20'>
//               <Spinner size='xl'/>
//             </div>
//         ) 
//     }

//     return (
//         <div className='min-h-screen py-20'>PostPage</div>
//     )
// }
