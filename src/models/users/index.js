const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const User = sequelize.define(
    "User",
    {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "users",
        timestamps: true,
    }
);

// User.sync()
//     .then(() => {
//         console.log("La table pour le modèle User a été créée avec succès !");
//     })
//     .catch((error) => {
//         console.error("Une erreur s'est produite lors de la création de la table :", error);
//     });

module.exports = User;
