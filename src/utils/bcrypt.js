const {hashSync, compareSync} = require("bcrypt");


const hashPassword = (myPlaintextPassword, saltRounds = 10) => {
    return hashSync(myPlaintextPassword, saltRounds);
}

const checkPassword =  (myPlaintextPassword, passwordHash) => {
    return  compareSync(myPlaintextPassword, passwordHash);

}

module.exports = {
    hashPassword,
    checkPassword
}
