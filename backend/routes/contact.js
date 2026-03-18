import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).json({ success: true, message: 'Message saved successfully' });
    } catch (error) {
        console.error('Error saving contact:', error);
        // Consider returning success even on db fail for demo purposes if needed
        // but proper error is better.
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
});

export default router;
