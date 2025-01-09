const Task = require('../../models/Task');
const Todo = require('../../models/Todo');

const getTaskByTaskId = async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
        // Vérifiez si les IDs sont valides
        if (isNaN(taskId)) {
            return res.status(400).json({ message: 'ID de tâche invalide.',
                code: " INID-01",
                isError: true });
        }
    
    try {
        // Récupérer la tâche
        const task = await Task.findOne({
            where: { idTask: taskId },
        });

        if (!task) {
            return res.status(404).json({ message: 'Aucune tâche trouvée',
                code: " TASK-03",
                isError: true});
        }

        // Récupérer les todos associés à cette tâche
        const todos = await Todo.findAll({
            where: { idTask: taskId },
            
        });
        if (todos.length === 0){
            return res.status(404).json({ message: 'Cette tache ne possede pas de Todo',
                code: " TASK-04",
                isError: true
            })
        }
        console.log('ID de la tâche:', taskId);
        console.log('Todos récupérés:', todos.length);

        // Inclure les todos dans la réponse
        res.status(200).json({task, todos, isErro: false });
    } catch (error) {
        console.error('Erreur lors de la récupération de la tâche:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

module.exports = { getTaskByTaskId };