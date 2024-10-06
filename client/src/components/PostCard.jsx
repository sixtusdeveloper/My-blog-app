import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    // <div className='group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
    <div className='w-full mx-auto'>
        <div className='p-4 border border-gray-300 dark:border-gray-800 rounded-lg'>
            <Link to={`/post/${post.slug}`}>
                <img
                src={post.image}
                alt='post cover'
                className="w-full h-54 object-cover rounded-lg post-img"

                />
            </Link>
            <div className='py-3'>
                {/* <p className='text-lg font-semibold line-clamp-2'>{post.title}</p> */}
                <h3 className="text-base font-bold"> {post.title.length > 70 ? post.title.slice(0, 50) + '...' : post.title}</h3>
                <div className='flex mt-6 gap-4 justify-between items-center'>
                    <span className='text-base border text-gray-400 border-gray-300 dark:border-gray-800 rounded-lg py-2 px-4'>{post.category}</span>
                    <Link
                    to={`/post/${post.slug}`}
                    className='border text-base border-gray-400 hover:border-blue-800 dark:border-gray-800 cursor-pointer dark:hover:border-gray-700 text-blue-800 dark:text-gray-400 text-center py-2 px-4 rounded-lg'
                    >
                    Read article
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}