const Task = require('../../models/Task');
const Todo = require('../../models/Todo'); // Assurez-vous d'importer le modèle Todo

const createTask = async (req, res) => {
    try {
        const idUser = req.user.id;
        const { title, description, isCompled, todos } = req.body;


        // Vérifiez si une tâche avec le même titre et l'utilisateur existe déjà
        const existingTask = await Task.findOne({
            where: {
                title: title,
                idUser: idUser,
            }
        });

        if (existingTask) {
            return res.status(409).json({ message: 'Une tâche avec ce titre existe déjà.', 
                code: "TASK-01",
                isError: true
            });
        }
          // Vérifiez si des todos sont fournis dans la requête
          if (todos && Array.isArray(todos)) {
            // Créez un ensemble pour vérifier les titres uniques
            const titlesSet = new Set();
            const duplicateTitles = [];

            // Vérifiez les titres des todos
            for (const todo of todos) {
                if (titlesSet.has(todo.title)) {
                    duplicateTitles.push(todo.title);
                } else {
                    titlesSet.add(todo.title);
                }
            }

            // Si des titres en double sont trouvés, renvoyez une erreur
            if (duplicateTitles.length > 0) {
                return res.status(400).json({ message: 'Veuillez entrer des titres différents pour les todos.', 
                    duplicates: duplicateTitles,
                 code: "TASK-02",
                isError: true});
            }
        }

        // Créer une nouvelle tâche
        const task = await Task.create({
            idUser: idUser,
            title:title,
            description:description,
            isCompled:isCompled,
        });
        // Vérifiez si des todos sont fournis dans la requête
        if (req.body.todos && Array.isArray(req.body.todos)) {
            // Ajoutez chaque todo pour la tâche créée
            const todos = req.body.todos.map(todo => ({
                idTask: task.idTask, // Associez le todo à la tâche créée
                title: todo.title,
                isCompleted: todo.isCompleted || false,
            }));
            
            console.log('Todos à créer:', todos);

            await Todo.bulkCreate(todos); // Créez tous les todos en une seule opération
        }
        // Récupérer les todos associés à la tâche
        const createdTodos = await Todo.findAll({ where: { idTask: task.idTask } });

        res.status(201).json({task, todos: createdTodos, isError: false});
    } catch (error) {
        console.error('Erreur lors de la création de la tâche:', error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createTask };