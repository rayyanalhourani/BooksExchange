const express = require("express");
const app = express();
const Routes = require("./Controllers/index")
const cookiesParser = require('cookie-parser')
const bodyParser = require('body-Parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json()); 
app.use(cookiesParser())
app.use(Routes)
app.set("view engine", "ejs");
app.use(express.static('public'))

app.listen(5000, () => {
    console.log("server is running");
});
