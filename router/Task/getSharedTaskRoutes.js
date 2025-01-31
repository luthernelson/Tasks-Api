const express = require('express');
const { getSharedTasks } = require('../../controllers/Task/getShareTaskController.js');

const router = express.Router();
// Route pour obtenir les Todos d'une tâche spécifique

router.get('/getSharedTasks', getSharedTasks);

module.exports = router;