const express = require("express")
const authController = require("../Controllers/authController")
const bookController = require("../Controllers/bookController")

const { authorization } = require("../middleware/authMiddleware")

const router = express.Router()
//authRouter
router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.get('/logout', authController.logout_get)
router.get('/EditProfile' , authorization , authController.EditProfile_get)
router.get('/EditProfile' , authorization , authController.EditProfile_post)
router.get('/Profile' , authorization , authController.Profile_get)
router.delete('/deleteUser', authController.deleteUser)

//bookRouter
router.get("/", authorization, bookController.home_get);
router.get("/Addbook", authorization, bookController.AddBook_get)
router.post("/Addbook", authorization, bookController.AddBook_post)
router.get("/mybooks", authorization, bookController.myBooks_get)
router.delete("/books", authorization, bookController.books_delete)

module.exports = router;