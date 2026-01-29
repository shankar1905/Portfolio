require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ FIX

const app = express();

// ✅ CORS (local + live domain)
app.use(cors({
    origin: [
        "http://localhost:4201",
        "https://shankarganesh.in",
        "https://www.shankarganesh.in"
    ],
    methods: ["GET", "POST"],
}));

app.use(express.json());

// ✅ API Routes
app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/visitor", require("./routes/visitor.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

// ✅ Angular Frontend (Render Hosting)
const frontendPath = path.join(__dirname, "../frontend/dist/frontend");
app.use(express.static(frontendPath));

// ✅ Angular SPA fallback
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));

// ✅ Render Port
const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
