const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoute")
const cookiesParser = require('cookie-parser')
const {requireAuth} = require("./middleware/authMiddleware")

app.use(express.json()); 
app.use(cookiesParser())
app.use(authRoutes)


app.get("/", (req, res) => {
    res.status(200).send("home page");
});

app.listen(5000, () => {
    console.log("server in running");
});
