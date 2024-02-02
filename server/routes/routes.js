const express = require('express');
const router = express.Router();

// Test route
router.get('/', (req, res) => {

    res.json({ message: "Sucessfully works" });

})

module.exports = router;