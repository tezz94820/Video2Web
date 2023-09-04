const express = require('express');
const router = express.Router();
const videoRoute = require('./videoRoutes.js');
const userRoute = require('./userRoutes.js');


router.use('/api/v1/video',videoRoute);
router.use('/api/v1/user',userRoute);

module.exports = router;