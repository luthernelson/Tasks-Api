const express = require('express');
const { updateTask } = require('../../controllers/Task/updateTaskController.js');

const router = express.Router();
// Route pour obtenir les Todos d'une tâche spécifique

router.put('/tasks/:id', updateTask);

module.exports = router;