const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const cors = require("cors");

app.use(cors({
    origin: [
        "https://shankarganesh.in",
        "http://localhost:4201"
    ]
}));
app.use(express.json());

// ✅ Routes
app.use("/api/contact", require("./routes/contact.routes"));
app.use('/api/visitor', require('./routes/visitor.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
// ✅ Test route
app.get("/", (req, res) => {
    res.send("🚀 Portfolio Backend Running!");
});

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));

// ✅ Render Port
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});


