const Task = require("../../models/Task");
const Todo = require("../../models/Todo");
// Assurez-vous que le chemin est correct

const updateTask = async (req, res) => {
  const taskId = parseInt(req.params.id, 10); // ID de la tâche

  // Vérifiez si les IDs sont valides
  if (isNaN(taskId)) {
    return res.status(400).json({
      message: "ID de la tâche invalide.",
      code: " INID-03",
      isError: true,
    });
  }

  try {
    const tasks = await Task.findOne({
      where: {
        idTask: taskId,
      },
    });

    if (!tasks) {
      return res
        .status(404)
        .json({ message: "Tache non trouvé", code: " TASK-08", isError: true });
    }

    // Mettre à jour le Todo avec les nouvelles données fournies
    const { title, description, isCompled, todos } = req.body;
    // Mettez à jour uniquement les champs fournis
    if (title !== undefined) {
      tasks.title = title;
    }
    if (isCompled !== undefined) {
      tasks.isCompled = isCompled;
    }
    if (description !== undefined) {
      tasks.description = description;
    }

    await tasks.save(); // Enregistrez les modifications

    // Mettre à jour les todos
    console.log(todos)
    if (Array.isArray(todos)) {
      // Parcourir les todos et mettre à jour ou créer
      for (const todo of todos) {
        if (todo.idTodo) {
          // Si l'ID du todo est fourni, mettez-le à jour
          await Todo.update(todo, { where: { idTodo: todo.idTodo } });
        } else {
          // Sinon, créez un nouveau todo associé à la tâche
          await Todo.create({title: todo.title, isCompled: todo.isCompled, idTask: taskId });
          console.log( todo.idTodo)
        }
      }
    }
    const updatedTodos = await Todo.findAll({
      where: { idTask: taskId },
    });
    res.status(200).json({
      message: "Tache mis à jour avec succès.",
      tasks,
      updatedTodos,
      isError: false,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tache:", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

module.exports = { updateTask };
