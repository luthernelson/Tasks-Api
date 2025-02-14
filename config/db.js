const { Sequelize } = require('sequelize');

// connexion à la base de donnée 

const sequelize = new Sequelize('neondb', 'neondb_owner', 'npg_CpmK2WuEHl1M',{
    host: 'postgres://neondb_owner:npg_CpmK2WuEHl1M@ep-lucky-pond-a62hm6aw-pooler.us-west-2.aws.neon.tech/neondb?sslmode=require', // Adresse de la base de donnée
    dialect: 'postgres', // type de base de données
    define: {
        timestamps: false
    }
});

// Test de la connexion
sequelize.authenticate()
    .then(() => console.log('Connexion à la base de donnée reussie !'))
    .catch((error) => console.error('Erreur de connexion :', error));

    module.exports = sequelize;