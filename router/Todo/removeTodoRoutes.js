const express = require('express');
const { deleteTodo } = require('../../controllers/Todo/removeTodoController');

const router = express.Router();
// Route pour obtenir les Todos d'une tâche spécifique

router.delete('/tasks/:taskId/todos/:todoId', deleteTodo);

module.exports = router;