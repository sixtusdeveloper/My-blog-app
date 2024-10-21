import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import React, { useState } from 'react';
import { Button, Modal, TextInput, Alert, Label, Spinner } from 'flowbite-react';


export default function About() {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false); // For success modal
  const navigate = useNavigate(); 
  const [subscribeError, setSubscribeError] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        setSubscribeError("A valid email is required");
        return;
    }

    try {
        setLoading(true);
        setSubscribeError(null); // Clear any previous error messages

        const res = await fetch('/api/newsletter/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        console.log('Response:', data); // Log the response for debugging

        if (!res.ok) {
            const errorMsg = data.message || 'Something went wrong. Please try again.';
            setSubscribeError(errorMsg);
            return;
        }

        // If Subscription is successful, show success modal
        setSuccessModalOpen(true);  // Open the success modal
        setModalOpen(false);  // Close the subscribe modal
        setEmail(''); // Clear email input

    } catch (error) {
        console.error('Error during subscription:', error); // Log any caught error
        setSubscribeError('An unexpected error occurred. Please try again later.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <section className='max-w-screen w-full bg-white dark:bg-[rgb(16,23,42)]'>
      <div
        className="relative flex items-center py-8 md:py-16 md:px-4 lg:px-10 min-h-screen lg:min-h-[85vh] bg-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: 'url("/bg.png")', // Replace with your desired background image.
        }}
        >
        <div className="absolute inset-0 bg-black opacity-70"></div> {/* Dark overlay for contrast */}

        <div className="relative text-white mt-10 p-4 max-w-3xl space-y-8">
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
          About My DevJourney
          </h1>

          <p className="text-lg lg:text-xl text-gray-100 mb-6">
          Hi, I'm <strong>Sixtus Aondoakaa</strong>, also known as <strong>Sixtusdev</strong>. Join me on my journey through the tech industry as I share my experiences, insights, and knowledge to help you grow as a developer. Let's learn, build, and innovate together.
          </p>
          <Link to={'/search'}>
              <Button 
              size="lg" 
              gradientDuoTone="purpleToBlue"
              className="hover:scale-105 transform transition-transform my-7 duration-300"
              >
              Explore My Blog
              </Button>
          </Link>
        </div>
      </div>

      <div className="author-section md:px-4 py-8">
        <div className="max-w-5xl mx-auto flex md:flex-row flex-col gap-4 items-center">
          <img src="/profile-img.png" alt="Author" className="profile-pic rounded-lg mr-6" />
          <div className='px-4'>
            <h2 className="text-2xl py-4 font-bold">Meet the Author</h2>
            <p className="text-gray-600 dark:text-gray-300">Hi, I’m Sixtus, a Software Engineer passionate about creating innovative solutions in the tech space. 
            Through my blog, I share tips, tutorials, and insights to help you on your tech journey.</p>
          </div>
        </div>
      </div>
       
      {/* My Journey */}
        <section className="py-16 px-4 md:px-6">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">My Journey</h2>
            <ul className="space-y-6">
              <li className="border-l-4 border-indigo-600 pl-4">
                <h3 className="text-xl font-bold">My First Steps into Tech (2018)</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  My journey began with curiosity and a passion for problem-solving. I started teaching myself programming languages 
                  like HTML, CSS, and JavaScript, spending countless hours learning the basics of web development. My hunger to build 
                  led me to explore more.
                </p>
              </li>

              <li className="border-l-4 border-indigo-600 pl-4">
                <h3 className="text-xl font-bold">Diving into Software Development (2019 - 2021)</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Over time, I honed my skills and became proficient in both frontend and backend technologies. Working on projects for 
                  clients as a freelance Software Developer, I gained hands-on experience building dynamic, scalable applications while 
                  navigating the fast-paced world of technology.
                </p>
              </li>

              <li className="border-l-4 border-indigo-600 pl-4">
                <h3 className="text-xl font-bold">Joining a Collaborative Tech Team (2023 - Present)</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  My role as a Software Engineer at SkilledUp.life Company marked a turning point. Collaborating with skilled developers, 
                  learning advanced frameworks like React and building user-centered applications became my daily routine. This role 
                  expanded my perspective on teamwork and product development.
                </p>
              </li>

              <li className="border-l-4 border-indigo-600 pl-4">
                <h3 className="text-xl font-bold">Building for the Future (Present)</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Today, I continue to push boundaries, exploring new technologies and staying committed to lifelong learning. My 
                  journey is a testament to the power of dedication, curiosity, and persistence in the tech world.
                </p>
              </li>
            </ul>

            <p className="flex items-center text-lg mt-8">
              <a href="https://www.sixtusdev.net/pages/portfolio/#experiences" 
                target="_blank" rel="noopener noreferrer" 
                className="text-green-500 hover:text-green-600">
                <span className='flex items-center'>
                  Learn more about my journey
                  <FaArrowRight className="ml-2" />
                </span>
              </a>
            </p>
          </div>
        </section>
        
        {/* My stack */}
        <section className="py-16 px-4 border-t border-t-gray-800 dark:border-t-gray-800 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="md:text-3xl text-2xl text-center py-4 font-bold mb-8">Technologies I Work With</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="text-center border p-4 border-gray-300 rounded-lg shadow-md transition-transform hover:scale-105">
                <img src="/mean-stack.jpg" alt="mean-stack" className="mx-auto rounded-md tech-stack-img" />
                <p className="text-lg mt-4 text-gray-200">MEAN Stack</p>
              </div>
              <div className="text-center border p-4 border-gray-300 rounded-lg shadow-md transition-transform hover:scale-105">
                <img src="/mern-stack.jpg" alt="mern-stack" className="mx-auto rounded-md tech-stack-img" />
                <p className="text-lg mt-4 text-gray-200">MERN Stack</p>
              </div>
              <div className="text-center border p-4 border-gray-300 rounded-lg shadow-md transition-transform hover:scale-105">
                <img src="/lamp-stack.png" alt="lamp-stack" className="rounded-md mx-auto tech-stack-img" />
                <p className="text-lg mt-4 text-gray-200">LAMP Stack</p>
              </div>
              {/* Add more technology cards */}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 px-4 border-b border-b-gray-200 dark:border-b-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-text-2xl md:text-3xl font-bold mb-12">What Others Are Saying About My Posts</h2>
            <div className="testimonial-carousel overflow-hidden relative">
              <div className="flex space-x-6 animate-scroll">
                {/* Original Testimonials */}
                <div className="p-10 rounded-md border border-gray-300 dark:border-gray-700 shadow-md bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
                  <p className="text-lg italic">"This blog has transformed the way I approach coding!"</p>
                  <p className="mt-4 font-semibold">- Stephen Anada, Software Engineer</p>
                </div>
                <div className="p-10 rounded-md border border-gray-300 dark:border-gray-700 shadow-md bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
                  <p className="text-lg italic">"Insightful, inspiring, and educational!"</p>
                  <p className="mt-4 font-semibold">- Frank Danjima, Software Engineer</p>
                </div>
                <div className="p-10 rounded-md border border-gray-300 dark:border-gray-700 shadow-md bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
                  <p className="text-lg italic">"I learn something new every time I visit."</p>
                  <p className="mt-4 font-semibold">- Chris Benjamin, Frontend Engineer</p>
                </div>

                {/* Duplicate Testimonials for seamless scroll */}
                <div className="p-10 rounded-md border border-gray-300 dark:border-gray-700 shadow-md bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
                  <p className="text-lg italic">"This blog has transformed the way I approach coding!"</p>
                  <p className="mt-4 font-semibold">- Stephen Anada, Software Engineer</p>
                </div>
                <div className="p-10 rounded-md border border-gray-300 dark:border-gray-700 shadow-md bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
                  <p className="text-lg italic">"Insightful, inspiring, and educational!"</p>
                  <p className="mt-4 font-semibold">- Frank Danjima, Software Engineer</p>
                </div>
                <div className="p-10 rounded-md border border-gray-300 dark:border-gray-700 shadow-md bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
                  <p className="text-lg italic">"I learn something new every time I visit."</p>
                  <p className="mt-4 font-semibold">- Chris Benjamin, Frontend Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stay Connected */}

        {/* Stay Connected */}
        <section className="py-16 px-4 w-full">
          <div className="max-w-5xl mx-auto w-full text-center">
            <h2 className="md:text-3xl text-2xl font-bold mb-8">Stay Connected</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Subscribe to my newsletter for updates on my latest posts and projects.
            </p>
            <Button 
              size="lg" 
              gradientDuoTone="purpleToBlue" 
              className='text-center mx-auto mb-4 md:mb-8' 
              onClick={() => setModalOpen(true)}
            >
              Join My Newsletter
            </Button>
          </div>
        </section>

        {/* Modal for Subscription */}
        <Modal
          show={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <Modal.Header>
            Newsletter
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col p-0 md:p-8">
              {subscribeError && (
                <Alert type='error' color='failure'>{subscribeError}</Alert>
              )}

              <form onSubmit={handleSubscribe} className='my-4'>
                <div>
                  <Label value="Your Email" className='text-base mb-1' />
                  <TextInput 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    id="email"
                    onChange={(e) => setEmail(e.target.value)} 
                    className="mb-4"
                  />
                </div>
                <Button gradientDuoTone='purpleToPink' className='text-lg tracking-wide w-full font-medium p-2' type="submit" disabled={loading}>
                {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='ml-2'>Loading...</span>
                </>
                ) : (
                  'Subscribe'
                )}
                </Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>

         {/* Success Modal */}
         <Modal
          show={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
        >
          <Modal.Header>
            <div className='flex flex-1 items-center gap-2'>
              <img src="/success-icon.webp" alt="success icon" className='h-12 w-12' />&nbsp;Subscription Successful!
            </div>
          </Modal.Header>
          <Modal.Body>
            <p className="text-lg">
              Thank you for subscribing to my newsletter! You will receive updates on my latest posts and projects.
            </p>
            <Button 
              gradientDuoTone='purpleToBlue' 
              className='mt-4' 
              onClick={() => setSuccessModalOpen(false)}
            >
              Close
            </Button>
          </Modal.Body>
        </Modal>
      
      </section>

  );
}
