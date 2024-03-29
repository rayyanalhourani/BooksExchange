const Sequelize = require('sequelize')
const sequelize = require("../config/Database")

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, 
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    collage: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull :false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull :false
    },
    role: {
        type: Sequelize.STRING,
        allowNull :false
    },
    facebook:{
        type: Sequelize.STRING,
        allowNull :true
    },
    linkedin:{
        type: Sequelize.STRING,
        allowNull :true
    }
})

module.exports = User