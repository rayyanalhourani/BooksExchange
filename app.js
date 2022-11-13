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
app.use(express.urlencoded());





  
app.get("/", (req, res) => {
    res.status(200).send("home page");
});

app.listen(5000, () => {
    console.log("server is running");
});
