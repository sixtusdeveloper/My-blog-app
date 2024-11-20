import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHeart, FaBookmark, FaShareAlt } from 'react-icons/fa';
import { Button } from 'flowbite-react';

export default function PostCard({ post, onSave, onLove, onShare }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const [loveCount, setLoveCount] = useState(post.loveCount || 0);

  const handleSave = () => {
    setIsSaved(!isSaved); // Toggle save state
    if (onSave) onSave(post, !isSaved); // Notify parent with current state
  };

  const handleLove = () => {
    const newLoveCount = isLoved ? loveCount - 1 : loveCount + 1;
    setLoveCount(newLoveCount); // Increment or decrement love count
    setIsLoved(!isLoved); // Toggle love state
    if (onLove) onLove(post, !isLoved); // Notify parent with current state
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/post/${post.slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      if (onShare) onShare(post); // Notify parent component
      alert('Post URL copied to clipboard!');
    });
  };

  return (
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
          <h3 className="text-base font-bold">
            {post.title.length > 60 ? post.title.slice(0, 40) + '...' : post.title}
          </h3>

          {/* Action Buttons: Love, Save, and Share */}
          <div className='flex items-center justify-end gap-4 mt-2'>
            <button
              onClick={handleLove}
              className={`flex items-center gap-1 ${isLoved ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
            >
              <FaHeart size={15} />
              <span className='text-xs'>{loveCount}</span>
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center gap-1 ${isSaved ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
            >
              <FaBookmark size={14} />
              <span className='text-xs'>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-gray-500 hover:text-green-500"
            >
              <FaShareAlt size={14} />
              <span className='text-xs'>Share</span>
            </button>
          </div>

          <div className='flex mt-6 gap-4 justify-between items-center'>
            <Link to={`/category/${post.category}`}>
              <span className='border text-base border-gray-400 hover:border-blue-800 dark:border-gray-700 cursor-pointer dark:hover:border-gray-600 text-blue-800 dark:text-gray-400 text-center py-2 px-4 rounded-lg'>
                {post.category}
              </span>
            </Link>

            <Link to={`/post/${post.slug}`}>
              <Button type="button" gradientDuoTone="purpleToBlue" outline>
                <span className="flex items-center">
                  Read article
                  <FaArrowRight size={12} className="ml-1" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}










// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaArrowRight } from 'react-icons/fa';
// import { Button }  from 'flowbite-react';

// export default function PostCard({ post }) {
//   return (
//     <div className='w-full mx-auto'>
//         <div className='p-4 border border-gray-300 dark:border-gray-800 rounded-lg'>
//             <Link to={`/post/${post.slug}`}>
//               <img
//               src={post.image}
//               alt='post cover'
//               className="w-full h-54 object-cover rounded-lg post-img"
//               />
//             </Link>
//             <div className='py-3'>
//                 <h3 className="text-base font-bold"> 
//                   {post.title.length > 60 ? post.title.slice(0, 40) + '...' : post.title}
//                 </h3>

//                 <div>
//                  {/* I need us to add a love and save button here, so that when the user clicks on the love icon the entire number of love clicks of that particular post is show and when they click on the save icon it should changed color indicating it has been saved after that get and display the saved and loved post in the dashboard*/}
//                 </div>
//                 <div className='flex mt-6 gap-4 justify-between items-center'>
//                   <Link to={`/category/${post.category}`}>
//                     <span className='border text-base border-gray-400 hover:border-blue-800 dark:border-gray-700 cursor-pointer dark:hover:border-gray-600 text-blue-800 dark:text-gray-400 text-center py-2 px-4 rounded-lg'>
//                       {post.category}
//                     </span>
//                   </Link>

//                   <Link
//                   to={`/post/${post.slug}`}
//                   >
//                     <Button type="button" gradientDuoTone="purpleToBlue" outline>
//                       <span className="flex items-center">
//                         Read article
//                         <FaArrowRight size={12} className="ml-1" />
//                       </span>
//                     </Button>
//                   </Link>
//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// }









