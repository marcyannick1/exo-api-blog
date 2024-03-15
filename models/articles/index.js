const { DataTypes } = require("sequelize");
const sequelize = require("../../src/config/database");
const UserModel = require("../users")

const Articles = sequelize.define(
    "Articles",
    {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contenu: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserModel,
                key: "id",
            },
        },
    },
    {
        tableName: "articles",
        timestamps: true,
    }
);

Articles.belongsTo(UserModel, { foreignKey: "userId", as: "createur" });
UserModel.hasMany(Articles, { foreignKey: "userId" });

// Articles.sync()
//     .then(() => {
//         console.log("La table pour le modèle Articles a été créée avec succès !");
//     })
//     .catch((error) => {
//         console.error("Une erreur s'est produite lors de la création de la table :", error);
//     });

module.exports = Articles;
