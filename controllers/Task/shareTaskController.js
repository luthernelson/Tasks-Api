const Task = require('../../models/Task'); // Assure-toi de charger le modèle de tâche

const shareTask = async (req, res) => {
    const { idTask, idUser } = req.body; // On suppose que taskId et userIds sont envoyés dans le corps de la requête

    try {
        // Vérifier que taskId et userIds sont fournis
        if (!idTask|| !idUser || !Array.isArray(idUser)) {
            return res.status(400).json({
                message: 'taskId et userIds (un tableau) sont requis',
                code: "TASK-06",
                isError: true
            });
        }

        // Trouver la tâche par son ID
        const task = await Task.findByPk(idTask);

        if (!task) {
            return res.status(404).json({
                message: 'Tâche non trouvée',
                code: "TASK-04",
                isError: true
            });
        }

        // Initialiser sharedWith si nécessaire
        if (!task.sharedWith) {
            task.sharedWith = [];
        }

        // Filtrer les userIds pour éviter les doublons
        const newUsers = idUser.filter(iduser => !task.sharedWith.includes(iduser));

        if (newUsers.length === 0) {
            return res.status(400).json({
                message: 'Aucune nouvelle utilisateur à partager',
                code: "TASK-07",
                isError: true
            });
        }

        // Ajouter les nouveaux utilisateurs à la liste des utilisateurs avec qui la tâche est partagée
        task.sharedWith.push(...newUsers);
        task.sharedWith = JSON.stringify(task.sharedWith)
        await task.save(); // Enregistrer les changements

        console.log('Tâche partagée avec les utilisateurs:', newUsers);
        console.log('Tache partagée:', task)
        // Répondre avec la tâche mise à jour
        res.status(200).json({ task, isError: false });
    } catch (error) {
        console.error('Erreur lors du partage de la tâche:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

module.exports = { shareTask };