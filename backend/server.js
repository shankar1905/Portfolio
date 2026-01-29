require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ CORS
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

// ✅ Angular Build Path
const frontendPath = path.join(__dirname, "../frontend/dist/frontend");
app.use(express.static(frontendPath));

// ✅ SPA Fallback (FIXED ✅)
app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));

// ✅ Render Port
const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
