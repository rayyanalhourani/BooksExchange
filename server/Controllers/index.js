const express = require("express")
const authController = require("../Controllers/authController")
const bookController = require("../Controllers/bookController")

const {authorization} = require("../middleware/authMiddleware")



const router =express.Router()
//authRouter
router.get('/signup',authController.signup_get)
router.post('/signup',authController.signup_post)
router.get('/login',authController.login_get)
router.post('/login',authController.login_post)
router.get('/logout',authController.logout_get)
router.delete('/deleteUser',authController.deleteUser)


//bookRouter
router.post("/books",authorization ,bookController.books_post)
router.get("/books",authorization,bookController.books_get)
router.get("/mybooks",authorization,bookController.myBooks_get)
router.delete("/books",authorization,bookController.books_delete)



module.exports = router;



