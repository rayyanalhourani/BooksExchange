const express = require("express")
const bookController = require("../Controllers/bookController");
const {authorization} = require("../middleware/authMiddleware")


const router =express.Router()

router.post("/books",authorization ,  bookController.books_post)
// router.get("/books",authorization,bookController.books_get)
// router.delete("/books",authorization,bookController.books_delete)


module.exports = router;