const Todo = require('../../models/Todo');

const createTodo = async (req, res) => {
    try {

        const existingTodo = await Todo.findOne({
            where: {
                title: title,
                idTask: idTask,
            }
        });

        if (existingTodo) {
            return res.status(409).json({ message: 'Un todo de ce nom existet deja.', 
                code: "TODO-01",
                isError: true
            });
        }
        // Créer un nouvel utilisateur sans spécifier idUser
        const newTodo = await Todo.create({
            idTask: req.body.idTask,
            title: req.body.title,
            isCompled: req.body.isCompled,
        });

        res.status(201).json({ newTodo, isError: false });
    } catch (error) {
        console.error('Erreur lors de la création d\'un todo:', error); // Pour le débogage
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createTodo };