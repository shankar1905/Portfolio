const express = require("express");
const router = express.Router();
const Contact = require("../models/contact.model");
const { sendContactEmail, sendAutoReplyEmail } = require("../services/email.service");

router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const contact = new Contact({ name, email, message });
        await contact.save();

        await sendContactEmail(name, email, message);
        await sendAutoReplyEmail(name, email); // even if fails, admin mail works

        res.json({ message: "Message sent successfully ✅" });
    } catch (err) {
        console.error("❌ Contact Error:", err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
