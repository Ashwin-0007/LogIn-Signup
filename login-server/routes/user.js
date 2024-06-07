const express = require('express');

const { handleUserSignup, handleUserLogin, handleUserUpdate } = require('../controllers/user.js');

const router = express.Router();
router.post('/signup', handleUserSignup);
router.post('/login', handleUserLogin); 
router.post('/update', handleUserUpdate);

module.exports = router;
