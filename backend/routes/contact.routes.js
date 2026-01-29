const express = require("express");
const router = express.Router();
const Contact = require("../models/contact.model");
const { sendContactEmail, sendAutoReplyEmail } = require("../services/email.service");

router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // ✅ Validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }

        if (message.length > 500) {
            return res.status(400).json({ error: "Message too long" });
        }

        // ✅ Save to DB
        const contact = new Contact({ name, email, message });
        await contact.save();

        // ✅ Send Emails
        await sendContactEmail(name, email, message);
        await sendAutoReplyEmail(name, email);

        res.json({ message: "Message sent successfully ✅" });
    } catch (err) {
        console.error("❌ Contact Error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
