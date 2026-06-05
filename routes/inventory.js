const express = require('express');
const router = express.Router();

// Mock auth middleware
function authCheck(req, res, next) {
    const token = req.headers['authorization'];
    if (!token || token !== 'Bearer local-secure-token-123') {
        return res.status(401).json({ error: 'Unauthorized local API access' });
    }
    next();
}

router.get('/', (req, res) => {
    res.json({ message: "Inventory list endpoint" });
});

module.exports = { router, authCheck };