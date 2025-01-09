
const express = require('express');
const { getTaskByTaskId } = require('../../controllers/Task/getTaskController.js');

const router = express.Router();
// Route pour obtenir les Todos d'une tâche spécifique


router.get('/tasks/:id', getTaskByTaskId);

module.exports = router;