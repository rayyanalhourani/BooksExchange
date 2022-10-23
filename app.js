const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoute")
const bookRoutes = require("./routes/bookRoute")

const cookiesParser = require('cookie-parser')

app.use(express.json()); 
app.use(cookiesParser())
app.use(authRoutes)
app.use(bookRoutes)


app.get("/", (req, res) => {
    res.status(200).send("home page");
});

app.listen(5000, () => {
    console.log("server in running");
});
