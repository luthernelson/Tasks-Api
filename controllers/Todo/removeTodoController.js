const Todo  = require('../../models/Todo');

const deleteTodo = async (req, res) => {
    const TaskId = parseInt(req.params.taskId, 10);
    const TodoId = parseInt(req.params.todoId, 10);
    console.log(TaskId);
    console.log(TodoId);
        // Vérifiez si les IDs sont valides
        if (isNaN(TaskId) || isNaN(TodoId)) {
            return res.status(400).json({ message: 'ID de tâche ou de Todo invalide.' ,
                code: " INID-05",
                isError: true});
        }
    try {
        
        const todo = await Todo.findOne({
            where: {
                idTodo: TodoId,
                idTask: TaskId
            }
        });
        if (!todo) {
            return res.status(404).json({ message: 'Todo non trouvé pour cette tâche.',
                code: " TODO-03",
                isError: true });
        }

        // Supprimer le Todo
        await todo.destroy();

        res.status(200).json({ message: 'Todo supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du Todo:', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};
module.exports = { deleteTodo };