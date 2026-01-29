require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS (frontend + local)
app.use(cors({
    origin: [
        "http://localhost:4201",
        "https://shankarganesh.in",
        "https://www.shankarganesh.in"
    ],
    methods: ["GET", "POST"]
}));

app.use(express.json());

// ✅ API routes
app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/visitor", require("./routes/visitor.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));

// ✅ Port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 API Server running on port ${PORT}`);
});
