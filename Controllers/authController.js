require('dotenv').config()

const bcrypt = require("bcrypt")
const e = require('express')
const jwt = require("jsonwebtoken")
const jwtDecode = require("jwt-decode")
const DB = require('../config/Database')
const User = require('../models/User')


module.exports.signup_get = (req, res) => {
  res.render("../Views/signup.ejs")
}

module.exports.login_get = (req, res) => {
  res.render('../Views/login.ejs')
}

module.exports.signup_post = async (req, res, next) => {
  let { id, name, email, password, collage, phone } = req.body;

  try {
    const username = await User.findOne({
      where: {
        id: req.body.id,
      },
    });
    //if username exist in the database respond with a status of 409
    if (username) {
      return res.json(409).send("ID already taken");
    }

    else {
      let data = {
        id,
        name,
        password: await bcrypt.hash(password, 10),
        collage,
        phone,
        email,
        role: "user"
      };

      const user = User.create(data)

      if (user) {
        res.redirect("/login")
      }

      else {
        res.json("user doesn't created")
      }
    }

    next();
  }

  catch (error) {
    console.log(error);
  }
}

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}


module.exports.login_post = async (req, res) => {

  const id = req.body.id
  const password = req.body.password

  let user =await User.findOne({where:{'id':id}})
  
  try {
    if (user) {
      let checkpass =await bcrypt.compare(password, user.password)
      if (checkpass){
          let token = createToken(user.id); 
          res.cookie('jwt',token , {httpOnly : true})
          res.send('home page')
      }

      else{
        res.json("wrong password")
      }
    }

    else{
      res.json("wrong id")
    }
  } catch (error) {
    console.log(error);
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { expiresIn: '1s' })
  res.redirect('/login');
}

module.exports.deleteUser =async (req, res) => {
  let token = req.cookies.jwt
  let id = jwtDecode(token).id
  let user =await User.findOne({where:{'id':id}})

  try {
    if(user){
        await User.destroy({where:{'id':id}})
        res.redirect('/login')
    }

    else{
      console.log("no user with that id");
    }
  } catch (error) {
    console.log(error);
  }





  // sql = `delete from user where id = ${ownerId}`;
  // getconnection().query(sql, (err, result) => {
  //     if (err) {
  //         res.status(404).send(err);
  //     } else {
  //         res.status(201).send("user deleted successfully");
  //     }
  // });
}
