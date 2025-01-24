
const express = require('express');
const { shareTask } = require('../../controllers/Task/shareTaskController.js');

const router = express.Router();
// Route pour obtenir les Todos d'une tâche spécifique


router.post('/tasks/shareTasks', shareTask);

module.exports = router;