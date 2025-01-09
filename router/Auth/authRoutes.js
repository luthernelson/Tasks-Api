const express = require('express')
const router = express.Router();
const { loginUser } = require( '../../controllers/Authentification/authController');

router.post( '/user/login', loginUser);

module.exports = router;