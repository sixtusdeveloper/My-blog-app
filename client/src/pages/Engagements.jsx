import React from 'react'
import CallToAction from '../pages/CallToAction';  // Import the CallToAction component

export default function Engagements() {
  return (
    <div className='min-h-screen bg-white dark:bg-[rgb(16,23,42)] w-full pt-20'>
      <div className='flex flex-col items-center justify-center py-10 px-4 lg:px-10 max-w-5xl gap-8 mx-auto'>
        <h1 className='text-3xl font-bold text-center'>Engagements</h1>
        <p className='text-lg text-center text-gray-600 dark:text-gray-400'>
          I'm available for speaking engagements, workshops, and other events. If you're interested in having me speak at your event, please reach out!
        </p>
        <div className='flex flex-col items-center gap-4'>
          <a href='mailto:sixtusushrey@gmail.com' className='btn btn-primary'>Contact Me</a>  {/* Contact Me button */}
          <a href='/resume' className='btn btn-secondary'>View Resume</a>  {/* View Resume button */}
        </div>
      </div>
      <div className='max-w-5xl mx-auto w-full my-8'>

         <CallToAction />  {/* CallToAction component */}
      </div>
    </div>
  )
}
