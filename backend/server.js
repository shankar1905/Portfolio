const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const rateLimit = require("express-rate-limit");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("🚀 Shankar Portfolio Backend is Running Successfully!");
});

// ✅ Rate Limiter (MUST be before routes)
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // max 5 requests per IP
    message: { error: "Too many requests, please try later" },
});

// ✅ Apply limiter only to contact API
app.use("/api/contact", contactLimiter);

// ✅ Routes
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/visitor', require('./routes/visitor.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));

// ✅ Render Port Fix
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Portfolio Backend Running on port ${PORT}`);
});
