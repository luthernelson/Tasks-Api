const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importer la connexion Sequelize

const User = sequelize.define('User', {
    idUser: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // Longueur minimale
            len: {
                args: [8, 100], // Entre 8 et 100 caractères
                msg: 'Le mot de passe doit contenir entre 8 et 100 caractères.',
            },
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Validation pour vérifier le format de l'email
        },
    },
},{
    freezeTableName: true,
});

module.exports = User;