// ContactPage.jsx
import React, { useState } from 'react';
import { TextInput, Textarea, Button, Label } from 'flowbite-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Error sending message.');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='min-h-screen w-full pt-20 bg-white dark:bg-[rgb(16,23,42)]'>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl lg:text-5xl text-start font-extrabold leading-tight dark:text-gray-200 text-gray-600 my-8">Contact Me</h1>
        <p className="mb-6">
          If you have any questions, feedback, or just want to say hello, feel free to reach out!
        </p>
        <div className=''>
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p>Email: <a href="mailto:sixtusushrey@gmail.com" className="text-blue-600">sixtusushrey@gmail.com</a></p>
          <p>Phone: <a href="tel:+2349022048105" className="text-blue-600">+(234) 9022048105</a></p>
        </div>
        
        <h2 className="text-xl font-semibold mt-10 py-4">Send Me a Message</h2>
        
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="border border-gray-300 dark:border-gray-700 p-4 md:p-10 lg:p-24 rounded-lg shadow-lg mb-8">
          <div className="mb-4">
            <Label htmlFor="name" className="block text-sm font-medium mb-1">Name</Label>
            <TextInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="border border-gray-300 rounded-md"
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
              required
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="message" className="block text-sm font-medium mb-1">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter your message"
              className="border border-gray-300 rounded-md"
            />
          </div>

          <Button gradientDuoTone='purpleToPink' className='text-lg tracking-wide font-medium p-2' type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;










// // ContactPage.jsx
// import React, { useState } from 'react';
// import { TextInput, Textarea, Button, Label } from 'flowbite-react';

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <section className='min-h-screen w-full pt-20 bg-white dark:bg-[rgb(16,23,42)]'>
//       <div className="max-w-4xl mx-auto px-8 py-10">
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

//           <Button gradientDuoTone='purpleToPink' className='text-lg tracking-wide font-medium p-2' type="submit" >
//             Send Message
//           </Button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ContactPage;
