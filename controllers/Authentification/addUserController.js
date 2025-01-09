const User = require('../../models/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { username, email, password} = req.body
        console.log('req.body', req.body)
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingEmail = await User.findOne({
            where: {
                email: email,
            }
        });

        if (existingEmail) {
            return res.status(409).json({ message: 'Cet email existe existe déjà.', 
                code: "USER-01",
                isError: true
            });
        }

        // Créer un nouvel utilisateur sans spécifier idUser
        const user = await User.create({
            username:username,
            password: hashedPassword,
            email: email,
        });

        res.status(201).json({ user, isError: false});
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error); // Pour le débogage
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createUser };