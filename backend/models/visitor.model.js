const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    ip: String,
    browser: String,
    visitedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visitor', visitorSchema);
