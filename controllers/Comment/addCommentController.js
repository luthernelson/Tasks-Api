const Comment = require('../../models/Comment');

const createComment= async (req, res) => {
    try {

        // Créer un nouvel utilisateur sans spécifier idUser
        const newComment = await Comment.create({
            idTask: req.body.idTask,
            Comment: req.body.title,
            Timetamps: req.body.Timetamps,
        });

        res.status(201).json({ newComment, isError: false });
    } catch (error) {
        console.error('Erreur lors de la création d\'un Comment:', error); // Pour le débogage
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createComment};