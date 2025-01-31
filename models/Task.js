const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importer la connexion Sequelize

const Task = sequelize.define('Task', {
    idTask: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idUser: {
        type: DataTypes.INTEGER, // Type correspondant à l'id dans la table Task
        allowNull: false,
        references: {
            model: 'User', // Nom de la table cible (doit correspondre au modèle User)
            key: 'idUser', // Clé cible dans la table User
        },
        onUpdate: 'CASCADE', // Comportement lors de la mise à jour
        onDelete: 'CASCADE', // Comportement lors de la suppression
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isCompled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    isShared: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    freezeTableName: true, // Empêche Sequelize d'ajouter un 's' au nom de la table
});

module.exports = Task;
