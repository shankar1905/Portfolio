const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model');
const Visitor = require('../models/visitor.model');

// Get all messages
router.get('/messages', async (req, res) => {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
});

// Get all visitors
router.get('/visitors', async (req, res) => {
    const visitors = await Visitor.find().sort({ visitedAt: -1 });
    res.json(visitors);
});

// Get notification count
router.get('/stats', async (req, res) => {
    const messagesCount = await Contact.countDocuments();
    const visitorsCount = await Visitor.countDocuments();

    res.json({
        messages: messagesCount,
        visitors: visitorsCount
    });
});

module.exports = router;
