const{ Comment, User }= require('../../models');

const getCommentTaskId = async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    console.log('TEST', Comment);

    if (isNaN(taskId)) {
        return res.status(400).json({
            message: 'ID de tâche invalide.',
            code: "INID-01",
            isError: true
        });
    }

    try {
        const comments = await Comment.findAll({
            where: { idTask: taskId },
            include: [
                {
                    model: User,
                    as: 'user', // Utilisez l'alias défini dans la relation
                    attributes: ['username'] // Incluez uniquement le champ username
                }
            ]
        });

        if (comments.length === 0) {
            return res.status(404).json({
                message: 'Aucun commentaire n\'a été trouvé',
                code: "TASK-03",
                isError: true
            });
        }

        // Formater la réponse pour inclure le username
        const formattedComments = comments.map(comment => ({
            id: comment.id,
            idTask: comment.idTask,
            idUser: comment.idUser,
            comment: comment.comment,
            username: comment.user ? comment.user.username : 'Utilisateur inconnu', // Gestion du cas undefined
            Timetamps: comment.Timetamps, // Date de création
        }));

        res.status(200).json({ comments: formattedComments, isError: false });
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

module.exports = { getCommentTaskId };