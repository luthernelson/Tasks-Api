const express = require('express');
const { createTodo } = require( '../../controllers/Todo/addTodoController');

const router = express.Router();

// Route pour créer une nouvelle todo
router.post('/tasks/addTodo', createTodo); // Appliquer le middleware d'authentification

module.exports = router;