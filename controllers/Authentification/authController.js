const User  = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
      if(!email || !password){
         return res.status(400).json({ message: " les champs email et password sont requis",
             code: "AUTH-01",
             isError: true
         });
     }

         //verifie si l'utilisateur existe 
         const user = await User.findOne ({ where: { email}});
         if (!user) {
            return res.status(404).json({ message: 'utilisateur non trouvé',
               code: " AUTH-02",
               isError: true
             });
         }

         // verifie le mot de passe
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res.status(404).json({ message: ' Mot de passe incorrect',
               code: " AUTH-03",
               isError: true})
         }

         // créer un token Jwt
         const token =  jwt.sign({ id: user.idUser, email: user.email},process.env.JWT_SECRET, {
            expiresIn: '3h',
         });

         res.json({token,
            idUser: user.idUser,
            username: user.username, isError: false });

    }catch (error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = { loginUser };