const authRoute = require("express").Router();
const authController = require("../../controller/auth");

module.exports = (app) => {
    authRoute.post("/login", authController.login);
    app.use("/api/v1", authRoute);
};
