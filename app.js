const express = require("express");
const app = express();
const Routes = require("./Controllers/index")
const cookiesParser = require('cookie-parser')
const bodyParser = require('body-Parser')
const sequelize = require('./config/Database')
const User = require("./models/User")
const Book = require("./models/Book")


app.use(bodyParser.urlencoded({extended:  true}));
app.use(express.json()); 
app.use(cookiesParser())
app.use(Routes)
app.set("view engine", "ejs");
app.use(express.static('public'))

User.hasMany(Book);

//{force:true} to drop tables

sequelize.sync()
.then(result =>{ console.log("every thing is ok")})
.catch(err => {console.log(err)})

sequelize.authenticate().then(()=>console.log('DataBase connected'))
.catch(err => console.log(err))


app.listen(5000, () => {
    console.log("server is running");
});
