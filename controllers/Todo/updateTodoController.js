const Todo  = require('../../models/Todo');
// Assurez-vous que le chemin est correct

const updateTodo = async (req, res) => {
    const taskId = parseInt(req.params.taskId, 10); // ID de la tâche
    const todoId = parseInt(req.params.todoId, 10); // ID du Todo

    // Vérifiez si les IDs sont valides
    if (isNaN(taskId) || isNaN(todoId)) {
        return res.status(400).json({ message: 'ID de tâche ou de Todo invalide.',
            code: " INID-06",
            isError: true});
    }

    try {
        // Rechercher le Todo pour vérifier s'il existe et s'il est associé à la tâche
        const todo = await Todo.findOne({
            where: {
                idTodo: todoId,
                idTask: taskId
            }
        });

        if (!todo) {
            return res.status(404).json({ message: 'Todo non trouvé pour cette tâche.' ,
                code: " TODO-04",
                isError: true});
        }

        // Mettre à jour le Todo avec les nouvelles données fournies
        const { title, isCompled } = req.body; // Assurez-vous que ces champs sont dans le corps de la requête

        // Mettez à jour uniquement les champs fournis
        if (title !== undefined) {
            todo.title = title;
        }
        if (isCompled !== undefined) {
            todo.isCompled = isCompled;
        }

        await todo.save(); // Enregistrez les modifications

        res.status(200).json({ message: 'Todo mis à jour avec succès.', todo, isError: false});
    } catch (error) {
        console.error('Erreur lors de la mise à jour du Todo:', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

module.exports = { updateTodo };