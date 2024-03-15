module.exports = (app) => {
    require('./user')(app)
    require('./auth')(app)
}