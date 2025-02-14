require('dotenv').config({ path: './secret.env' });
const { Sequelize } = require('sequelize');

// connexion à la base de donnée 

const sequelize = new Sequelize(  process.env.DB_NAME,      
    process.env.DB_USER,      
    process.env.DB_PASS ,{
        host: process.env.DB_HOST,    
        dialect: process.env.DB_DIALECT, // type de base de données
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

// Test de la connexion
sequelize.authenticate()
    .then(() => console.log('Connexion à la base de donnée reussie !'))
    .catch((error) => console.error('Erreur de connexion :', error));

    module.exports = sequelize;