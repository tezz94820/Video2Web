const express = require('express');
const { createUsername, checkUsername, getAllLinks} = require('../controllers/UserController.js');
const router = express.Router();


router.get('/createUsername', createUsername);
router.get('/checkUsername' , checkUsername);
router.get('/allLinks' , getAllLinks);

module.exports = router;