const { Comment, User } = require('../../models');

const createComment = async (req, res) => {
    console.log('Données reçues:', req.body); // Log des données reçues

    const taskId = req.body.idTask;
    const userId = req.body.idUser;
    const commentText = req.body.comment; // Assurez-vous que le nom du champ est correct

    // Vérifiez que les champs nécessaires ne sont pas null
    if (!taskId || !userId || !commentText) {
        return res.status(400).json({ error: 'idTask, idUser, and comment cannot be null' });
    }

    try {
        // Récupérer le nom d'utilisateur en fonction de l'idUser
        const user = await User.findOne({ where: { idUser: userId } });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const newComment = await Comment.create({
            idTask: taskId,
            idUser: userId,
            comment: commentText, // Assurez-vous que le champ est correct
            timestamps: req.body.timestamps, 
            isError: false // Vérifiez l'orthographe ici
        });

        // Inclure le username dans la réponse
        res.status(201).json({
            id: newComment.id, // Assurez-vous que cela correspond à la clé primaire du commentaire
            idTask: newComment.idTask,
            idUser: newComment.idUser,
            comment: newComment.comment,
            username: user.username, // Inclure le nom d'utilisateur
            timetamps: newComment.timetamps, // Si vous souhaitez inclure la date de création
        });
    } catch (error) {
        console.error('Erreur lors de la création d\'un Comment:', error); // Pour le débogage
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createComment };