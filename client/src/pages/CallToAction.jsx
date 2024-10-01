import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-2 md:p-6 border border-blue-500 justify-center items-center rounded-tl-3xl rounded-br-3xl bg-gray-100 dark:bg-gray-900 shadow-lg">
      <div className="flex-1 flex flex-col justify-center p-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3">
          Ready to Elevate Your Coding Skills?
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mb-5">
          Join me on my journey at <strong>DevJourney</strong>, where I share insights, tutorials, and projects from my experience as a software engineer. Let's grow together!
        </p>
        <Button
          gradientDuoTone="purpleToBlue"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a href="/blog" className="text-white" target="_self">
            Explore My Blog
          </a>
        </Button>
      </div>
      <div className="p-4 flex-1">
        <img
          src="https://cdn.sanity.io/images/tlr8oxjg/production/1ca7b34a8d5308a03ae186dfe72caabce0327fe2-1456x816.png?w=3840&q=100&fit=clip&auto=format"
          alt="DevJourney - Sixtusdev Blog"
          className="rounded-3xl"
        />
      </div>
    </div>
  );
}







// import React from 'react';
// import { Button } from 'flowbite-react';
// import { Link } from 'react-router-dom';

// export default function CallToAction() {
//   return (
//     <div className='max-w-screen w-full'>
//         <div
//         className="relative flex items-center justify-center min-h-screen lg:min-h-[85vh] bg-center bg-cover bg-no-repeat"
//         style={{
//             backgroundImage: 'url("/bg.png")', // Replace with your desired background image.
//         }}
//         >
//         <div className="absolute inset-0 bg-black opacity-60"></div> {/* Dark overlay for contrast */}

//         <div className="relative text-white p-4 max-w-5xl space-y-8">
//             <h1 className="text-3xl md:text-6xl font-extrabold leading-tight">
//             Welcome to DevJourney
//             </h1>

//             <p className="text-lg md:text-2xl font-light leading-relaxed">
//             Hi, I'm <strong>Sixtus Aondoakaa</strong>, also known as <strong>Sixtusdev</strong>. Join me on my journey through the tech industry as I share my experiences, insights, and knowledge to help you grow as a developer. Let's learn, build, and innovate together.
//             </p>
//             <Link to='/blog'>
//                 <Button 
//                 size="lg" 
//                 gradientDuoTone="purpleToBlue"
//                 className="hover:scale-105 transform transition-transform my-7 duration-300"
//                 >
//                 Explore My Blog
//                 </Button>
//             </Link>
//         </div>
//         </div>
//     </div>
//   );
// }
