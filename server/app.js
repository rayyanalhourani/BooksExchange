const express = require("express");
const app = express();
const Routes = require("./Controllers/index")

const cookiesParser = require('cookie-parser')

app.use(express.json()); 
app.use(cookiesParser())
app.use(Routes)


app.get("/", (req, res) => {
    res.status(200).send("home page");
});

app.listen(5000, () => {
    console.log("server is running");
});
