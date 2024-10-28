import React, { useState } from 'react';


const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Devjourney?",
      answer: "DevJourney is a platform dedicated to Engineers and developers, where you can document and share your coding experiences, projects, and insights. It aims to foster a community of learning and collaboration among engineers and developers at all stages of their journey."

    },
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Signup' button on the homepage and following the registration process."
    },
    {
      question: "Can I edit my posts after publishing?",
      answer: "Yes, you can edit your posts anytime after they are published."
    },
    {
      question: "What are the community guidelines?",
      answer: "My community guidelines promote respect, inclusivity, and constructive discussions. Please refer to my Terms of Service for detailed information."
    },
    {
      question: "How do I report a problem?",
      answer: "You can report any issues through the Contact page or by reaching out to me directly either via email or social media."
    },
    {
      question: "How do I create a post?",
      answer: "You can create a post by clicking the 'Share your experience' button on the homepage and following the post creation process." 
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Inline CSS for background image
  const backgroundStyle = {
    backgroundImage: 'url("/auth-bg.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    overflowY: 'scroll',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE and Edge
  };
  

  return (
    <section style={backgroundStyle} className='min-h-screen w-full pt-20'>
        <div className="px-4 md:px-10 max-w-4xl mx-auto py-10">
            <h1 className='text-3xl lg:text-5xl font-extrabold leading-tight text-gray-100 my-8'>Frequently Asked Questions (FAQ)</h1>
            <p className='text-lg lg:text-xl text-gray-300 mb-8 sm:text-start'>Welcome to my FAQ page! Here you can find answers to the most common questions about my platform.</p>
            <div className="border border-gray-800 rounded-md py-10">
                {faqs.map((faq, index) => (
                <div key={index} className="border-b border-b-gray-800">
                  <div
                    className="flex space-between items-center p-4 cursor-pointer bg-[rgb(16,23,42)]"
                    onClick={() => toggleAccordion(index)}
                    >
                    <h2 className='text-gray-100'>{faq.question}</h2>
                    <span className="text-3xl p-3 text-blue-500">
                        {activeIndex === index ? '-' : '+'}
                    </span>
                  </div>
                  {activeIndex === index && (
                  <div className="p-4">
                      <p className='text-gray-300'>{faq.answer}</p>
                  </div>
                  )}
                </div>
                ))}
            </div>

            <div className='py-4 text-center'>
                <p className='text-gray-300'>Could not find what you're looking for? <a href="/contact" className='text-green-500 hover:underline ml-2'>Message me then..</a> </p>
            </div>
        </div>
    </section>
  );
};

export default FAQPage;
