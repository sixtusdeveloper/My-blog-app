import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from 'flowbite-react';

export default function PostCategory({ post }) {
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
                {post.title.length > 70 ? post.title.slice(0, 50) + '...' : post.title}
              </h3>
              <div className='flex mt-6 gap-4 justify-between items-center'>
                  <Link to={`/category/${post.category}`}>
                    <span className='border text-base border-gray-400 hover:border-blue-500 dark:border-gray-700 cursor-pointer dark:hover:border-gray-600 text-blue-800 dark:text-gray-400 text-center py-2 px-4 rounded-lg'>
                      {post.category}
                    </span>
                  </Link>

                  <Link
                  to={`/post/${post.slug}`}
                  // className='border text-base border-gray-400 hover:border-blue-800 dark:border-gray-800 cursor-pointer dark:hover:border-gray-700 text-blue-800 dark:text-gray-400 text-center py-2 px-4 rounded-lg'
                  >
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
    
  )
}
 