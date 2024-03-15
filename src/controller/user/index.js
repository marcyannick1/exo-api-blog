const User = require('../../models/users')
const {hashPassword} = require("../../utils/bcrypt");

const create = async (req, res)=>{
    const { nom, prenom, email, pseudo, password } = req.body;
    const hashedPassword = hashPassword(password);
    try {
        const user = await User.create({ nom, prenom, email, pseudo, password: hashedPassword });

        if (!user.id){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        
        res.status(201).send({ user });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    create
}