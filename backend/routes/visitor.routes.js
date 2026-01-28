const express = require('express');
const router = express.Router();
const Visitor = require('../models/visitor.model');

router.post('/', async (req, res) => {
    const visitor = new Visitor({
        ip: req.ip,
        browser: req.headers['user-agent']
    });

    await visitor.save();
    res.json({ message: "Visitor logged 👀" });
});

module.exports = router;
