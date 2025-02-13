const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importer la connexion Sequelize

const Conversation = sequelize.define('Conversation', {
    idConversation: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idTask: {
        type: DataTypes.INTEGER, // Type correspondant à l'id dans la table Task
        allowNull: false,
        references: {
            model: 'Task', // Nom de la table cible (doit correspondre au modèle User)
            key: 'idTask', // Clé cible dans la table User
        },
        onUpdate: 'CASCADE', // Comportement lors de la mise à jour
        onDelete: 'CASCADE', // Comportement lors de la suppression
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
}, {
    freezeTableName: true, // Empêche Sequelize d'ajouter un 's' au nom de la table
});

module.exports = Conversation;
