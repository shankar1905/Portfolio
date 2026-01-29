const express = require("express");
const router = express.Router();
const Contact = require("../models/contact.model");
const { sendContactEmail, sendAutoReplyEmail } = require("../services/email.service");

// ✅ Rate Limit (Anti-Spam)
const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: "Too many requests. Try again later.",
});

router.post("/", contactLimiter, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // ✅ Validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email" });
        }

        if (message.length > 500) {
            return res.status(400).json({ error: "Message too long" });
        }

        // ✅ Save to DB
        await Contact.create({ name, email, message });

        // ✅ Send Emails
        await sendContactEmail(name, email, message);
        await sendAutoReplyEmail(name, email);

        res.json({ message: "Message sent successfully ✅" });
    } catch (err) {
        console.error("❌ Contact Error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
