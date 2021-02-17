const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth.js'));
router.use('/tasks', require('./task.js'));
router.use('/api', require('./api'));

module.exports = router;