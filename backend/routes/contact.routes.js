const express = require("express");
const router = express.Router();
const Contact = require("../models/contact.model");
const { sendContactEmail, sendAutoReplyEmail } = require("../services/email.service");
const rateLimit = require("express-rate-limit");

// ✅ Rate Limit (Anti-Spam)
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3,
    message: "Too many requests. Try again later.",
});

// ✅ Disposable Email Blocker
const blockedDomains = [
    "tempmail.com",
    "mailinator.com",
    "10minutemail.com",
    "guerrillamail.com",
    "yopmail.com"
];

router.post("/", contactLimiter, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // ✅ Validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (name.length < 2) {
            return res.status(400).json({ error: "Name too short" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }

        // ✅ Block fake emails
        const domain = email.split("@")[1];
        if (blockedDomains.includes(domain)) {
            return res.status(400).json({ error: "Temporary email not allowed" });
        }

        if (message.length > 500) {
            return res.status(400).json({ error: "Message too long (max 500 chars)" });
        }

        // ✅ Save to DB (always)
        await Contact.create({ name, email, message });

        // ✅ Send emails WITHOUT breaking API
        sendContactEmail(name, email, message).catch(err =>
            console.error("❌ Admin email failed:", err.message)
        );

        sendAutoReplyEmail(name, email).catch(err =>
            console.error("❌ Auto reply failed:", err.message)
        );

        // ✅ Respond instantly (don’t wait for email)
        res.json({ message: "Message sent successfully ✅" });

    } catch (err) {
        console.error("❌ Contact Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
