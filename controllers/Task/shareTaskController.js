const Task = require('../../models/Task'); // Assurez-vous de charger le modèle de tâche
const Todo = require('../../models/Todo');
const User = require('../../models/User'); // Assurez-vous de charger le modèle d'utilisateur

const shareTask = async (req, res) => {
    const { idTask, idUser} = req.body; // On suppose que idTask et userIds sont envoyés dans le corps de la requête

    try {
        // Vérifier que idTask et userIds sont fournis
        if (!idTask || !Array.isArray(idUser) || idUser.length === 0) {
            return res.status(400).json({
                message: 'idTask et userIds sont requis',
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

        task.isShared = true; // Assurez-vous que la propriété isShared existe dans le modèle Task  
        await task.save();

        const todos = await Todo.findAll({ where: { idTask } });

        // Optionnel: ajouter une logique pour partager la tâche avec les utilisateurs
        const users = await User.findAll({ where: { idUser: idUser } });
        if (users.length === 0) {
            return res.status(404).json({
                message: 'Aucun utilisateur trouvé',
                code: "USER-01",
                isError: true
            });
        }

        // Logique pour notifier les utilisateurs ou enregistrer le partage peut être ajoutée ici.

        console.log('Tâche partagée avec les utilisateurs sélectionnés');

        // Répondre avec la tâche mise à jour
        res.status(200).json({ tasksWithTodos: [
            {
                task: {
                    idTask: task.idTask,
                    idUser: task.idUser,
                    title: task.title,
                    description: task.description,
                    isCompled: task.isCompled,
                    isShared: task.isShared
                },
                todos: todos.map(todo => ({
                    idTodo: todo.idTodo,
                    idTask: todo.idTask,
                    title: todo.title,
                    isCompled: todo.isCompled
                }))
            }
        ],
        isError: false});
        
    } catch (error) {
        console.error('Erreur lors du partage de la tâche:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

module.exports = { shareTask };