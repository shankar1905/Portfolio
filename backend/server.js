const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Error:", err));

// Routes
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/visitor', require('./routes/visitor.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`🚀 Portfolio Backend Running on port ${PORT}`);
});
