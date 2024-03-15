const userRoute = require('express').Router()
const userController = require('../../controller/user');

module.exports = (app) => {
    userRoute.post('/user', userController.create)
    app.use('/api/v1', userRoute)
}