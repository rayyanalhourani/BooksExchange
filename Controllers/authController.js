require('dotenv').config()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
let { getconnection } = require("../Model/database")
const jwtDecode = require("jwt-decode")



module.exports.signup_get = (req, res) => {
    res.send("signup page")
}

module.exports.login_get = (req, res) => {
    res.send("login page")
}

module.exports.signup_post = (req, res) => {
    let id = req.body.id,
        name = req.body.name,
        email = req.body.email,
        password = bcrypt.hashSync(req.body.password, 10),
        collage = req.body.collage,
        phone = req.body.phone;

    const sql = `INSERT INTO user (id,name,password,collage,phone,email) VALUES ("${id}","${name}","${password}","${collage}","${phone}","${email}")`;
    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(201).send("signup successfully");
        }
    });
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1m'})
}


module.exports.login_post = (req, res) => {
    const id = req.body.id
    const password = req.body.password

    const sql = `select password from books_exchange.user where id like ${id}`;
    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {

            try {
                if (bcrypt.compareSync(password, result[0].password)) {
                    const token = createToken(id)
                    res.cookie('jwt',token , {httpOnly : true})
                    res.redirect('/')
                }
                else {
                    res.send("wrong password")
                }
            }
            catch {
                res.send("invalid ID")
            }
        }
    })
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt','',{expiresIn:'1s'})
    res.redirect('/login');
}

module.exports.deleteUser = (req, res) => {
    let token = req.cookies.jwt
    let ownerId=jwtDecode(token).id
    let sql = `delete from book where book_owner_id = ${ownerId}`;

    getconnection().query(sql, (err, result) => {
    });

    sql = `delete from user where id = ${ownerId}`;

    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(201).send("user deleted successfully");
        }
    });
}