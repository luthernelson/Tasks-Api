const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extraire le token

    if (!token) {
        return res.status(401).json({ error: 'Token non fourni.' });
    }

    jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
        if (err) {

            console.error('Erreur lors de la vérification du token:', err);
            return res.status(403).json({ error: 'Token invalide.' });
        }
        req.user = user; // Ajouter l'utilisateur décodé à la requête
        next(); // Passer au middleware suivant ou au contrôleur
    });
};

module.exports = authenticateToken;