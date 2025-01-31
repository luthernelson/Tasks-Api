const { User, Task, Todo } = require('../../models'); // Importer les modèles
const getSharedTasks = async (req, res) => {
    try {
      const sharedTasks = await Task.findAll({
        where: { isShared: true }, 
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['username'], 
          },
          {
            model: Todo,
            as: 'todos', 
            attributes: ['idTodo', 'title','iscompled'], 
          },
        ],
      });

      if (sharedTasks.length === 0) {
        return res.status(404).json({
          message: 'Aucune tache trouvée.',
          isError: true,
          code: 'UT000'
        });
      }
        // Récupérer tous les todos associés aux tâches
        const taskIds = sharedTasks.map(task => task.idTask); // Récupérer tous les idTask
        const todos = await Todo.findAll({
            where: { idTask: taskIds },
        });
      const tasksWithTodos = sharedTasks.map(task => {
        const taskTodos = todos.filter(todo => todo.idTask === task.idTask); // Filtrer les todos associés
        return {
            task, // Convertir en objet simple
            todos: taskTodos, // Ajouter les todos associés
        };
    });
      res.status(200).json( tasksWithTodos );
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches partagées :', error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des tâches partagées.' });
    }
  };

  module.exports = { getSharedTasks }