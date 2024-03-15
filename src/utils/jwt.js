const jwt = require('jsonwebtoken');
const UserModel = require('../models/users')

const jwtSign = async (payload) => {
    try {
        return jwt.sign(payload, process.env.SECRET_PASS, {
            expiresIn: '1d'
        })
    } catch (e) {
        return e.message
    }
}

const jwtVerify = async (token) => {
    try {
        const decoded =  jwt.verify(token, process.env.SECRET_PASS);

        if (decoded.exp < Date.now() / 1000) {
            return false
        }
        const user = await UserModel.findByPk(decoded.id)
        if (user.dataValues.token !== token) return false
        
        return true
    }
    catch (e) {
        console.log(e.message)
        return false
    }
}

module.exports = {
    jwtSign,
    jwtVerify
}