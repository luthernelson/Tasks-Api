const express = require('express');
const { createComment } = require( '../../controllers/Comment/addCommentController');

const router = express.Router();

// Route pour créer une nouvelle todo
router.post('/tasks/addComment', createComment); // Appliquer le middleware d'authentification

module.exports = router;