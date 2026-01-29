const express = require("express");
const router = express.Router();
const Contact = require("../models/contact.model");
const { sendContactEmail, sendAutoReplyEmail } = require("../services/email.service");

router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // ✅ Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Trim spaces (important)
        const cleanName = name.trim();
        const cleanEmail = email.trim();
        const cleanMessage = message.trim();

        // ✅ Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({ error: "Invalid email address" });
        }

        // ✅ Name length validation
        if (cleanName.length < 2 || cleanName.length > 50) {
            return res.status(400).json({ error: "Invalid name length" });
        }

        // ✅ Message length limit (anti-spam)
        if (cleanMessage.length < 5 || cleanMessage.length > 500) {
            return res.status(400).json({ error: "Message must be between 5 and 500 characters" });
        }

        // ✅ Save to MongoDB
        const contact = new Contact({
            name: cleanName,
            email: cleanEmail,
            message: cleanMessage,
        });

        await contact.save();

        // ✅ Send emails (don’t block API if email fails)
        sendContactEmail(cleanName, cleanEmail, cleanMessage);
        sendAutoReplyEmail(cleanName, cleanEmail);

        return res.json({ message: "Message sent successfully ✅" });

    } catch (err) {
        console.error("❌ Contact Error:", err);
        return res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
