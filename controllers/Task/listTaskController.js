const Task = require('../../models/Task');
const Todo = require('../../models/Todo');

const getUserTasks = async (req, res) => {
    const idUser = req.user.id;

    try {
        // Récupérer toutes les tâches de l'utilisateur
        const tasks = await Task.findAll({
            where: { idUser: idUser },
        });

        if (tasks.length === 0) {
            return res.status(404).json({ message: 'Aucune tâche trouvée pour cet utilisateur',
                code: " TASK-05",
                isError: true });
        }

        // Récupérer tous les todos associés aux tâches
        const taskIds = tasks.map(task => task.idTask); // Récupérer tous les idTask
        const todos = await Todo.findAll({
            where: { idTask: taskIds },
        });
        if ( todos.length === 0){
            return res.status(404).json({ message: 'Aucun Todo Trouvé pour cette Tache',
                code: " TASK-06",
                isError: true})
        }
        // Créer un objet pour stocker les tâches avec leurs todos
        const tasksWithTodos = tasks.map(task => {
            const taskTodos = todos.filter(todo => todo.idTask === task.idTask); // Filtrer les todos associés
            return {
                task, // Convertir en objet simple
                todos: taskTodos, // Ajouter les todos associés
            };
        });

        res.status(200).json({ tasksWithTodos, isError: false}); // Retourner les tâches avec leurs todos
    } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

module.exports = { getUserTasks };