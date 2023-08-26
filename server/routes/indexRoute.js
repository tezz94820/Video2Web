const express = require('express');
const router = express.Router();
const videoRoute = require('./videoRoutes.js');

router.use('/api/v1/video',videoRoute);

module.exports = router;