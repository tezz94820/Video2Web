const express = require('express');
const { videoUploader } = require('../controllers/VideoController');
const router = express.Router();
const upload = require('../utils/multer')


router.post('/upload',upload.single('video') , videoUploader);
module.exports = router;