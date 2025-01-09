const Task  = require('../../models/Task');
const Todo = require('../../models/Todo');

const deleteTask = async (req, res) => {
    const TaskId = parseInt(req.params.id, 10);
    console.log(TaskId);
        // Vérifiez si les IDs sont valides
        if (isNaN(TaskId)) {
            return res.status(400).json({ message: 'ID de tâche invalide.' ,
                code: " INID-02",
                isError: true});
        }
    try {
        // Supprimer tous les todos associés à la tâche
        await Todo.destroy({
            where: { idTask: TaskId },
        });

        const tasks = await Task.findOne({
            where: {
                idTask: TaskId
            }
        });
        if (!tasks) {
            return res.status(404).json({ message: 'Tache non trouvé',
                code: " TASK-07",
                isError: true });
        }

        // Supprimer la tache
        await tasks.destroy();

        res.status(200).json({ message: 'Tache supprimé avec succès.', isError: false });
    } catch (error) {
        console.error('Erreur lors de la suppression du Tache:', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};
module.exports = { deleteTask };