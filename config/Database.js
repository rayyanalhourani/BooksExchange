const Sequelize = require('sequelize')
const sequelize = new Sequelize('books_exchange', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = sequelize

