const express = require('express');
const { deleteTask } = require('../../controllers/Task/removeTaskController.js');

const router = express.Router();
// Route pour obtenir les Todos d'une tâche spécifique

router.delete('/tasks/:id', deleteTask);

module.exports = router;