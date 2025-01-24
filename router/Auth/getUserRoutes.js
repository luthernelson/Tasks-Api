
const express = require('express');
const { getUser } = require('../../controllers/Authentification/getUserController.js');

const router = express.Router();
// Route pour obtenir les Todos d'une tâche spécifique


router.get('/getTasks/', getUser);

module.exports = router;