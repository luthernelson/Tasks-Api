const express = require('express');
const { createTask } = require( '../../controllers/Task/addTaskController');
const authenticateToken = require('../../middleware/authMiddleware'); // Importer le middleware

const router = express.Router();

// Route pour créer une nouvelle tâche
router.post('/tasks/addTasks', authenticateToken, createTask); // Appliquer le middleware d'authentification

module.exports = router;