import mongoose from 'mongoose';

// Define the contact schema
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'], 
    },
    message: {
      type: String,
      required: true, 
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create the Contact model
const Contact = mongoose.model("Contact", contactSchema);

// Function to handle creating a new contact
export const createContact = async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save(); // Save the new contact to the database
    res.status(201).json({ message: 'Contact message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Error sending message.' });
  }
};

// Function to get all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    const contactsWithLocalTime = contacts.map(contact => ({
      ...contact._doc,
      createdAt: new Date(contact.createdAt).toLocaleString(), // Format createdAt timestamp
      updatedAt: new Date(contact.updatedAt).toLocaleString(), // Format updatedAt timestamp
    }));

    res.status(200).json(contactsWithLocalTime); // Return the contacts
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    res.status(500).json({ error: 'Error retrieving contacts.' });
  }
};

export default Contact; // Export the Contact model






