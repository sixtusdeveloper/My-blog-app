// contact.controller.js
import Contact from '../models/contact.model.js'; // Ensure the correct import for your Contact model

// Define the createContact function
export const createContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending message.' });
  }
};

// Define the getContacts function
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    const contactsWithLocalTime = contacts.map(contact => ({
      ...contact._doc,
      createdAt: new Date(contact.createdAt).toLocaleString(),
      updatedAt: new Date(contact.updatedAt).toLocaleString(),
    }));

    res.status(200).json(contactsWithLocalTime);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving contacts.' });
  }
};










// import nodemailer from 'nodemailer';
// import Contact from '../models/contact.model.js'; // Import the Contact model

// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Use Gmail service
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.APP_PASSWORD,
//     },
//     tls: {
//         rejectUnauthorized: false, // This can help if you're facing certificate issues
//     },
// });
  
// // Verify transporter configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error with email transporter:', error);
//   } else {
//     console.log('Server is ready to send messages:', success);
//   }
// });

// // Controller for handling contact form submissions
// export const sendContactForm = async (req, res, next) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ error: 'All fields are required.' });
//   }

//   try {
//     const newContact = new Contact({ name, email, message });
//     await newContact.save();

//     await transporter.sendMail({
//       from: `"${name}" <${process.env.EMAIL}>`,  // Use sender's name
//       to: process.env.EMAIL,                     // Send to your email
//       subject: `New message from ${name}`,
//       text: `Email: ${email}\n\nMessage: ${message}`,
//     });

//     res.status(200).json({ message: 'Message sent successfully!' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     next(error); // Pass the error to error-handling middleware
//   }
// };

// // Controller for retrieving all contacts
// export const getContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find({});
//     const contactsWithLocalTime = contacts.map(contact => ({
//       ...contact._doc,
//       createdAt: new Date(contact.createdAt).toLocaleString(),
//       updatedAt: new Date(contact.updatedAt).toLocaleString(),
//     }));

//     res.status(200).json(contactsWithLocalTime);
//   } catch (error) {
//     res.status(500).json({ error: 'Error retrieving contacts.' });
//   }
// };








// import nodemailer from 'nodemailer';
// import Contact from '../models/contact.model.js'; // Import the Contact model

// // Create a Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.APP_PASSWORD,
//   },
// });

// // Verify transporter configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error with email transporter:', error);
//   } else {
//     console.log('Server is ready to send messages:', success);
//   }
// });

// // Controller for handling contact form submissions
// export const sendContactForm = async (req, res, next) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ error: 'All fields are required.' });
//   }

//   try {
//     const newContact = new Contact({ name, email, message });
//     await newContact.save();

//     await transporter.sendMail({
//       from: process.env.EMAIL,
//       to: process.env.EMAIL,
//       subject: `New message from ${name}`,
//       text: `Email: ${email}\n\nMessage: ${message}`,
//     });

//     res.status(200).json({ message: 'Message sent successfully!' });
//   } catch (error) {
//     next(error);
//   }
// };

// // Controller for retrieving all contacts
// export const getContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find({});
//     const contactsWithLocalTime = contacts.map(contact => ({
//       ...contact._doc,
//       createdAt: new Date(contact.createdAt).toLocaleString(),
//       updatedAt: new Date(contact.updatedAt).toLocaleString(),
//     }));

//     res.status(200).json(contactsWithLocalTime);
//   } catch (error) {
//     res.status(500).json({ error: 'Error retrieving contacts.' });
//   }
// };
