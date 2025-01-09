const { Sequelize } = require('sequelize');

// connexion à la base de donnée 

const sequelize = new Sequelize('taskbd', 'root', '',{
    host: 'localhost', // Adresse de la base de donnée
    dialect: 'mysql', // type de base de données
    define: {
        timestamps: false
    }
});

// Test de la connexion
sequelize.authenticate()
    .then(() => console.log('Connexion à la base de donnée reussie !'))
    .catch((error) => console.error('Erreur de connexion :', error));

    module.exports = sequelize;