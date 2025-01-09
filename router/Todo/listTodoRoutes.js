
const express = require('express');
const { getTodosByTaskId } = require('../../controllers/Todo/listTodoController');

const router = express.Router();
// Route pour obtenir les Todos d'une tâche spécifique

router.get('/tasks/:id/todos', getTodosByTaskId);

module.exports = router;