const express = require('express');
const { updateTodo } = require('../../controllers/Todo/updateTodoController');

const router = express.Router();
// Route pour obtenir les Todos d'une tâche spécifique

router.put('/tasks/:taskId/todos/:todoId', updateTodo);

module.exports = router;