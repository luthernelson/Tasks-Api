const express = require('express')
const router = express.Router();
const { createUser } = require( '../../controllers/Authentification/addUserController');

router.post( '/user/adduser', createUser);

module.exports = router;