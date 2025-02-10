const User = require('../../models/User');

const getUser = async (req, res) => {
    try {
        // Récupérer l'utilisateur
        const user = await User.findAll({});

        if (!user) {
            return res.status(404).json({
                message: 'Aucun utilisateur trouvé',
                code: "USER-03",
                isError: true
            });
        }

        console.log('Liste des utilisateurs:', user);

        // Inclure l'utilisateur dans la réponse
        res.status(200).json( user);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

module.exports = { getUser };