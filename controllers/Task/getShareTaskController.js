const { User, Task, Todo, Conversation } = require('../../models'); // Importer les modèles

const getSharedTasks = async (req, res) => {
  try {
      const sharedTasks = await Task.findAll({
          where: { isShared: true },
          include: [
              {
                  model: User,
                  as: 'user',
                  attributes: ['idUser', 'username']
              },
              {
                  model: Todo,
                  as: 'todos',
                  attributes: ['idTodo', 'title', 'isCompled', 'idTask']
              },
              {
                  model: User,
                  as: 'sharedWith',
                  through: { attributes: [] },
                  attributes: ['idUser', 'username']
              }
          ]
      });

      if (sharedTasks.length === 0) {
          return res.status(404).json({
              message: 'Aucune tâche trouvée.',
              isError: true,
              code: 'UT000'
          });
      }

      const tasksWithTodos = sharedTasks.map(tasks => ({
        task: {
        idTask: tasks.idTask,
        idUser: tasks.user.idUser,
        title: tasks.title,
        description: tasks.description,
        isCompleted: tasks.isCompleted,
        isShared: tasks.isShared,
        user: {
          username: tasks.user.username,
          idUser :tasks.user.idUser 
        }},
        todos: tasks.todos.length > 0 ? tasks.todos.map(todo => ({
          idTodo: todo.idTodo,
          idTask: todo.idTask,
          title: todo.title
        })) : [],
        sharedWith: tasks.sharedWith.map(user => ({
          idUser: user.idUser,
          username: user.username
        })),
        username: tasks.user.username
      }));
  
      res.status(200).json(tasksWithTodos);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches partagées :', error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des tâches partagées.' });
    }
  };

module.exports = { getSharedTasks };