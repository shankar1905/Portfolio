const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root Route (to test backend)
app.get("/", (req, res) => {
    res.send("🚀 Shankar Portfolio Backend is Running Successfully!");
});

// ✅ Routes
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/visitor', require('./routes/visitor.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));

// ✅ IMPORTANT FOR RENDER
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Portfolio Backend Running on port ${PORT}`);
});
