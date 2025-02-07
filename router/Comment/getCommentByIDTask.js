const express = require('express');
const {getCommentTaskId } = require( '../../controllers/Comment/getCommentByIdTask');

const router = express.Router();

// Route pour créer une nouvelle todo
router.get('/tasks/getComment/:id', getCommentTaskId ); // Appliquer le middleware d'authentification

module.exports = router;