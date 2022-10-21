const mysql = require("mysql");


let getconnection = ()=> {
    try {
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "123456",
            database: "books_exchange",
        });
    }
    catch {
        console.log("database connection error");
    }
}

module.exports = {getconnection}