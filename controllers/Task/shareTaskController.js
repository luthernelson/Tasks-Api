const Task = require('../../models/Task'); // Assurez-vous de charger le modèle de tâche
const Todo = require('../../models/Todo');
const User = require('../../models/User'); // Assurez-vous de charger le modèle d'utilisateur
const Conversation = require('../../models/Conversation');

const shareTask = async (req, res) => {
    const { idTask, idUser } = req.body;

    try {
        if (!idTask || !Array.isArray(idUser) || idUser.length === 0) {
            return res.status(400).json({
                message: 'idTask et userIds sont requis',
                code: "TASK-06",
                isError: true
            });
        }

        const task = await Task.findByPk(idTask);
        if (!task) {
            return res.status(404).json({
                message: 'Tâche non trouvée',
                code: "TASK-04",
                isError: true
            });
        }

        task.isShared = true;  
        await task.save();

        const todos = await Todo.findAll({ where: { idTask } });

        const users = await User.findAll({ where: { idUser: idUser } });
        if (users.length === 0) {
            return res.status(404).json({
                message: 'Aucun utilisateur trouvé',
                code: "USER-01",
                isError: true
            });
        }

        // Vérifier si la tâche a déjà été partagée avec ces utilisateurs
        for (const userId of idUser) {
            const existingConversation = await Conversation.findOne({
                where: { idTask, idUser: userId }
            });
            if (existingConversation) {
                return res.status(400).json({
                    message: `La tâche a déjà été partagée avec l'utilisateur ${userId}`,
                    code: "TASK-07",
                    isError: true
                });
            }
        }

        // Créer une nouvelle conversation pour chaque utilisateur
        const conversations = await Promise.all(idUser.map(async (userId) => {
            return await Conversation.create({ 
                idTask: task.idTask,
                idUser: userId 
            });
        }));

        console.log('Tâches partagées avec les utilisateurs sélectionnés');

        res.status(200).json({
            tasksWithTodos: [
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
            isError: false
        });
        
    } catch (error) {
        console.error('Erreur lors du partage de la tâche:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

module.exports = { shareTask };
