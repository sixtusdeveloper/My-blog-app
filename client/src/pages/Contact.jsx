
// ContactPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput, Textarea, Button, Label, Alert } from 'flowbite-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
  
    try {
      const response = await fetch('/api/contact/contact', { // Adjusted endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        setErrorMessage(result.error || 'Error sending message.');
      } else {
        setSuccessMessage(result.message);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred.'); // More general error message
      console.error(error); // Log the error for debugging
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    
    <section className='min-h-screen w-full bg-white dark:bg-[rgb(16,23,42)]'>

      <div
        className="relative flex items-center pt-20 px-4 lg:px-20 min-h-screen lg:min-h-[85vh] bg-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: 'url("/blog03.webp")', // Replace with your desired background image.
        }}
        >
        <div className="absolute inset-0 bg-black opacity-70"></div> {/* Dark overlay for contrast */}

        <div className="relative text-white mt-10 p-4 max-w-3xl space-y-8">
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
            Get in Touch
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-100 mb-6">
            If you're interested in becoming an admin and posting content on my blog, please reach out through the contact form below. Together, we can create and share valuable insights with our community!
          </p>

          <a href='#contact'>
            <Button 
              size="lg" 
              gradientDuoTone="purpleToBlue"
              className="hover:scale-105 transform transition-transform my-7 duration-300"
            >
              Contact Me
            </Button>
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10" id="contact">
        <div className='py-8'>
          <h1 className="text-3xl lg:text-4xl font-extrabold dark:text-gray-200 text-gray-600 mb-8">
            Contact Me
          </h1>
          
          <div className="flex flex-col items-start space-y-2 mb-8">
            <a
              href="https://wa.me/+2349022048105" // Replace with your WhatsApp phone number
              target="_blank" rel="noreferrer"
              className="text-lg text-blue-500 hover:underline transition duration-200"
            >
              <span className='flex flex-nowrap'>
                <img src="/whatsapp.webp" alt="Chat me" className='w-8 h-8' />&nbsp;<span className='text-base'>+ (234) 902-2048-105</span>
              </span>
            </a>

            <a
              href="mailto:sixtusushrey@gmail.com" // Replace with your email
              target="_blank" rel="noreferrer"
              className="text-lg text-blue-500 hover:underline transition duration-200"
            >
              <span className='flex flex-nowrap'>
                <img src="/mail.webp" alt="Send me a mail" className='w-10 h-10' />&nbsp;<span className='text-base'>sixtusushrey@gmail.com</span>
              </span>
            </a>

          </div>

          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6">
            Feel free to reach out via WhatsApp or email, and I will get back to you as soon as possible!
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:gap-8 sm:flex-row p-2 md:p-6 border border-blue-500 justify-center items-center rounded-tl-3xl rounded-br-3xl bg-gray-100 dark:bg-gray-900 shadow-lg">
          <div className="p-2 flex-1">
            <img
              src="https://cdn.sanity.io/images/tlr8oxjg/production/1ca7b34a8d5308a03ae186dfe72caabce0327fe2-1456x816.png?w=3840&q=100&fit=clip&auto=format"
              alt="DevJourney - Sixtusdev Blog"
              className="rounded-3xl"
            />
          </div>

          <div className="flex-1 md:flex-row flex-col w-full justify-center p-4">
           
            <form onSubmit={handleSubmit} className='w-full'>
              {successMessage && <Alert className='mb-4 text-base' color='success'>{successMessage}</Alert>}
              {errorMessage && <Alert className='mb-4 text-base' color='failure'>{errorMessage}</Alert>}

              <div className="mb-4">
                <Label htmlFor="name" className="block text-sm font-medium mb-1">Name</Label>
                <TextInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="email" className="block text-sm font-medium mb-1">Email</Label>
                <TextInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="message" className="block text-sm font-medium mb-1">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter your message"
                  required
                />
              </div>
              <Button
              gradientDuoTone="purpleToBlue"
              className="rounded-tl-xl rounded-bl-none w-full"
              type="submit"
              disabled={isLoading}
            >
              
              {isLoading ? 'Sending...' : 'Send Message'}
              
            </Button>
            </form>
          
          </div>
          
        </div>
      </div>
    </section>
    
  );
};

export default ContactPage;












// // ContactPage.jsx
// import React, { useState } from 'react';
// import { TextInput, Textarea, Button, Label, Alert } from 'flowbite-react';

// const ContactPage = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setSuccessMessage('');
//     setErrorMessage('');

//     // Basic validation
//     if (!formData.email.match(/.+@.+\..+/)) {
//       setErrorMessage('Please enter a valid email address.');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (!response.ok) {
      
//       } else {
//         setSuccessMessage(result.message);
//         setFormData({ name: '', email: '', message: '' }); // Clear the form
//       }
//     } catch (error) {
//       setErrorMessage(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section className='min-h-screen w-full pt-20 bg-white dark:bg-[rgb(16,23,42)]'>
//       <div className="max-w-4xl mx-auto px-4 py-10">
//         <h1 className="text-3xl lg:text-5xl font-extrabold dark:text-gray-200 text-gray-600 mb-8">Contact Me</h1>
//         <form onSubmit={handleSubmit} className="border p-8 rounded-lg shadow-md">
//           {successMessage && <Alert className='mb-4 text-base' color='success'>{successMessage}</Alert>}
//           {errorMessage && <Alert className='mb-4 text-base' color='failure'>{errorMessage}</Alert>}
//           <div className="mb-4">
//             <Label htmlFor="name" className="block text-sm font-medium mb-1">Name</Label>
//             <TextInput
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your name"

//             />
//           </div>
//           <div className="mb-4">
//             <Label htmlFor="email" className="block text-sm font-medium mb-1">Email</Label>
//             <TextInput
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-4">
//             <Label htmlFor="message" className="block text-sm font-medium mb-1">Message</Label>
//             <Textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               rows="4"
//               placeholder="Enter your message"
//             />
//           </div>
//           <Button gradientDuoTone="purpleToPink" type="submit" disabled={isLoading}>
//             {isLoading ? 'Sending...' : 'Send Message'}
//           </Button>
//         </form>

//       </div>
//     </section>
//   );
// };

// export default ContactPage;
























// // ContactPage.jsx
// import React, { useState } from 'react';
// import { TextInput, Textarea, Button, Label } from 'flowbite-react';

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setSuccessMessage('');
//     setErrorMessage('');

//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setSuccessMessage('Message sent successfully!');
//         setFormData({ name: '', email: '', message: '' });
//       } else {
//         throw new Error('Error sending message.');
//       }
//     } catch (error) {
//       setErrorMessage(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section className='min-h-screen w-full pt-20 bg-white dark:bg-[rgb(16,23,42)]'>
//       <div className="max-w-4xl mx-auto px-4 py-10">
//         <h1 className="text-3xl lg:text-5xl text-start font-extrabold leading-tight dark:text-gray-200 text-gray-600 my-8">Contact Me</h1>
//         <p className="mb-6">
//           If you have any questions, feedback, or just want to say hello, feel free to reach out!
//         </p>
//         <div className=''>
//           <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
//           <p>Email: <a href="mailto:sixtusushrey@gmail.com" className="text-blue-600">sixtusushrey@gmail.com</a></p>
//           <p>Phone: <a href="tel:+2349022048105" className="text-blue-600">+(234) 9022048105</a></p>
//         </div>
        
//         <h2 className="text-xl font-semibold mt-10 py-4">Send Me a Message</h2>
        
//         {successMessage && <p className="text-green-600">{successMessage}</p>}
//         {errorMessage && <p className="text-red-600">{errorMessage}</p>}

//         <form onSubmit={handleSubmit} className="border border-gray-300 dark:border-gray-700 p-4 md:p-10 lg:p-24 rounded-lg shadow-lg mb-8">
//           <div className="mb-4">
//             <Label htmlFor="name" className="block text-sm font-medium mb-1">Name</Label>
//             <TextInput
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               placeholder="Enter your name"
//               className="border border-gray-300 rounded-md"
//             />
//           </div>
          
//           <div className="mb-4">
//             <Label htmlFor="email" className="block text-sm font-medium mb-1">Email</Label>
//             <TextInput
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email"
//               className="border border-gray-300 rounded-md"
//             />
//           </div>
          
//           <div className="mb-4">
//             <Label htmlFor="message" className="block text-sm font-medium mb-1">Message</Label>
//             <Textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               required
//               rows="4"
//               placeholder="Enter your message"
//               className="border border-gray-300 rounded-md"
//             />
//           </div>

//           <Button gradientDuoTone='purpleToPink' className='text-lg tracking-wide font-medium p-2' type="submit" disabled={isLoading}>
//             {isLoading ? 'Sending...' : 'Send Message'}
//           </Button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ContactPage;









