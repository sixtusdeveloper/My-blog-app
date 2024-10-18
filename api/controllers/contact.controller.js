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





