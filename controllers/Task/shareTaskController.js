const Task = require('../../models/Task'); // Assure-toi de charger le modèle de tâche
const Todo = require('../../models/Todo');

const shareTask = async (req, res) => {
    const { idTask } = req.body; // On suppose que taskId et userIds sont envoyés dans le corps de la requête

    try {
        // Vérifier que idTask est fourni
        if (!idTask) {
            return res.status(400).json({
                message: 'idTask est requis',
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
        }else{
        task.isShared = true; // Assurez-vous que la propriété isShared existe dans le modèle Task  
        await task.save();
        const todos = await Todo.findAll({ where: { idTask } });

    
        console.log('Tâche partagée avec tous les utilisateurs');
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
        }

    } catch (error) {
        console.error('Erreur lors du partage de la tâche:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};
module.exports = { shareTask };