const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importer la connexion Sequelize

const Todo = sequelize.define('Todo', {
    idTodo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idTask:{
        type: DataTypes.INTEGER, // Type correspondant à l'id dans la table Todo
        allowNull: false,
        references: {
            model: 'Task', // Nom de la table cible (doit correspondre au modèle Task)
            key: 'idTask',  // Clé cible dans la table Task
        },
        onUpdate: 'CASCADE', // Comportement lors de la mise à jour
        onDelete: 'CASCADE', // Comportement lors de la suppression
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    isCompled:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},{ freezeTableName: true,
});

module.exports = Todo;