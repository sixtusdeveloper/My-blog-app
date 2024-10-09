import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import React, { useState } from 'react';
import { Button, Modal, TextInput, Alert } from 'flowbite-react';


export default function About() {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(null);
  const [subscribeError, setSubscribeError] = useState(null);

  const handleChange = (e) => {  
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        setSubscribeError("A valid email is required");
        return;
    }

    try {
        const res = await fetch(`/api/newsletter/postnewsletter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Subscription failed');
        }

        setSubscribeSuccess('You have successfully subscribed!');
        setSubscribeError(null);
        setEmail('');
    } catch (error) {
        setSubscribeError(error.message);
        setSubscribeSuccess(null);
    }
};


  return (
    <section className='max-w-screen w-full bg-white dark:bg-[rgb(16,23,42)]'>
        <div
          className="relative flex items-center py-20 px-4 lg:px-20 min-h-screen lg:min-h-[85vh] bg-center bg-cover bg-no-repeat"
          style={{
              backgroundImage: 'url("/bg.png")', // Replace with your desired background image.
          }}
          >
          <div className="absolute inset-0 bg-black opacity-60"></div> {/* Dark overlay for contrast */}

          <div className="relative text-white p-4 max-w-3xl space-y-8">
            <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
            About My DevJourney
            </h1>

            <p className="text-lg lg:text-xl text-gray-100 mb-6">
            Hi, I'm <strong>Sixtus Aondoakaa</strong>, also known as <strong>Sixtusdev</strong>. Join me on my journey through the tech industry as I share my experiences, insights, and knowledge to help you grow as a developer. Let's learn, build, and innovate together.
            </p>
            <Link to='/blog'>
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
         {/* My Journey */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">My Journey</h2>
            <ul className="space-y-6">
              <li className="border-l-4 border-indigo-600 pl-4">
                <h3 className="text-xl font-bold">Started at XYZ Company (2018)</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Learned to build scalable web applications and began my journey as a full-stack developer.
                </p>
              </li>
              <li className="border-l-4 border-indigo-600 pl-4">
                <h3 className="text-xl font-bold">Started at XYZ Company (2018)</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Learned to build scalable web applications and began my journey as a full-stack developer.
                </p>
              </li>
              <li className="border-l-4 border-indigo-600 pl-4">
                <h3 className="text-xl font-bold">Started at XYZ Company (2018)</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Learned to build scalable web applications and began my journey as a full-stack developer.
                </p>
              </li>
              {/* Add more timeline entries */}
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

        <section className="py-16 px-4 border-t border-t-gray-800 dark:border-t-gray-800 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="md:text-3xl text-2xl text-center py-4 font-bold mb-8">Technologies I Work With</h2>
            <div className="grid md:grid-col-2 grid-col-1 lg:grid-cols-3 gap-6">
              <div className="text-center border p-4 border-gray-400 rounded-lg bg-gray-200 shadow-md transition-transform hover:scale-105">
                <img src="/mean-stack.jpg" alt="mean-stack" className="mx-auto rounded-md relative overflow-hidden tech-stack-img" />
                <p className="text-lg mt-4 text-gray-600">MEAN Stack</p>
              </div>
              <div className="text-center border p-4 border-gray-400 rounded-lg bg-gray-200 shadow-md transition-transform hover:scale-105">
                <img src="/mern-stack.jpg" alt="mern-stack" className="mx-auto rounded-md relative overflow-hidden tech-stack-img" />
                <p className="text-lg mt-4 text-gray-600">MERN Stack</p>
              </div>
              <div className="text-center border p-4 border-gray-400 rounded-lg bg-gray-200 shadow-md transition-transform hover:scale-105">
                <img src="/lamp-stack.png" alt="lamp-stack" className="rounded-md mx-auto relative overflow-hidden tech-stack-img" />
                <p className="text-lg mt-4 text-gray-600">LAMP Stack</p>
              </div>
              {/* Add more technology cards */}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 border-b border-b-gray-200 dark:border-b-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-text-2xl md:text-3xl font-bold mb-12">What Others Are Saying</h2>
            <div className="testimonial-carousel overflow-hidden relative">
              <div className="flex space-x-6 animate-scroll">
                {/* Original Testimonials */}
                <div className="p-10 rounded-md border border-gray-300 dark:border-gray-700 shadow-md bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
                  <p className="text-lg italic">"This blog has transformed the way I approach coding!"</p>
                  <p className="mt-4 font-semibold">- John Doe, Software Engineer</p>
                </div>
                <div className="p-10 rounded-md border border-gray-300 dark:border-gray-700 shadow-md bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
                  <p className="text-lg italic">"Insightful, inspiring, and educational!"</p>
                  <p className="mt-4 font-semibold">- Jane Smith, Developer</p>
                </div>
                <div className="p-10 rounded-md border border-gray-300 dark:border-gray-700 shadow-md bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
                  <p className="text-lg italic">"I learn something new every time I visit."</p>
                  <p className="mt-4 font-semibold">- Chris Lee, Frontend Developer</p>
                </div>

                {/* Duplicate Testimonials for seamless scroll */}
                <div className="p-10 rounded-md border border-gray-300 dark:border-gray-700 shadow-md bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
                  <p className="text-lg italic">"This blog has transformed the way I approach coding!"</p>
                  <p className="mt-4 font-semibold">- John Doe, Software Engineer</p>
                </div>
                <div className="p-10 rounded-md border border-gray-300 dark:border-gray-700 shadow-md bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
                  <p className="text-lg italic">"Insightful, inspiring, and educational!"</p>
                  <p className="mt-4 font-semibold">- Jane Smith, Developer</p>
                </div>
                <div className="p-10 rounded-md border border-gray-300 dark:border-gray-700 shadow-md bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
                  <p className="text-lg italic">"I learn something new every time I visit."</p>
                  <p className="mt-4 font-semibold">- Chris Lee, Frontend Developer</p>
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
            <div className="flex flex-col p-4 md:p-8">
              {subscribeError && (
                <Alert type='error' color='failure'>{subscribeError}</Alert>
              )}

                {subscribeSuccess && (
                  <Alert type='success' color='success'>{subscribeSuccess}</Alert>
                )}
              <form onSubmit={handleSubscribe} className='my-4'>
                <TextInput 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  id="email"
                  onChange={(e) => setEmail(e.target.value)} 
                  className="mb-4"
                />
                <Button gradientDuoTone='purpleToPink' className='text-lg tracking-wide w-full font-medium p-2' type="submit">
                  Subscribe
                </Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      
      </section>

  );
}
