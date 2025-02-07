const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importer la connexion Sequelize

const Comment = sequelize.define('Comment', {
    idComment: {
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
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Timetamps: {
        type: DataTypes.DATE, // Utilisez DATE pour enregistrer la date et l'heure
        allowNull: false,
        defaultValue: DataTypes.NOW, // Définit la date/heure actuelle par défaut
    },
}, {
    freezeTableName: true, // Empêche Sequelize d'ajouter un 's' au nom de la table
    
});
// Association avec User (sans stocker userId)
Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'idUser', as: 'user' });
};

module.exports = Comment;
