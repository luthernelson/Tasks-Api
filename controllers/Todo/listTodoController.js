const Todo  = require('../../models/Todo');

const getTodosByTaskId = async (req, res) => {
const taskId = parseInt(req.params.id, 10);
    try {

        if (isNaN(taskId)) {
            return res.status(400).json({ message: 'ID de tâche invalide.' ,
                code: " INID-04",
                isError: true});
        }
        const todos = await Todo.findAll({
            where:{
               idTask: taskId, 
            },
        });

        if (todos.length === 0) {
            return res.status(404).json({ message: 'Aucune sous tache trouvé',
                code: " TODO-02",
                isError: true});
        }
        res.status(200).json({todos, isError: false  });
    } catch (error){
        console.error('Erreur lors de la recuperation des sosus taches:', error);
        res.status(500).json({ error: 'Erreur innterne du serveur'});
    }


}; 
module.exports = { getTodosByTaskId };