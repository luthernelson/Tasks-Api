const express = require('express');
const authenticateToken = require('../../middleware/authMiddleware'); // Importer le middleware
const { getUserTasks } = require('../../controllers/Task/listTaskController');

const router = express.Router();

// Route pour créer une nouvelle tâche
router.get('/tasks/listTasks', authenticateToken, getUserTasks); // Appliquer le middleware d'authentification

module.exports = router;