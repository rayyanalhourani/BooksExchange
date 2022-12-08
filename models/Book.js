const Sequelize = require('sequelize')
const sequelize = require("../config/Database")

const Book = sequelize.define("book", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    collage: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

module.exports = Book