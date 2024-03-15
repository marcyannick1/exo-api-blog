const User = require("../../models/users");
const { checkPassword } = require("../../utils/bcrypt");
const { jwtSign } = require("../../utils/jwt");

const login = async (req, res)=>{
    if (!req.body) return res.status(400).json({ msg: 'BAD REQUEST BODY IS REQUIRED'})
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !checkPassword(password, user.password)) {
            return res.status(401).send({ error: "Login failed! Check authentication credentials" });
        }

        const token = await jwtSign({id: user.id});
        // await User.update({token}, {where: {id: user.id}})

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    login
}