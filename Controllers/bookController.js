const jwtDecode = require("jwt-decode");
const jwt = require("jsonwebtoken")
const DB = require('../config/Database')
const Book = require('../models/Book')
const User = require('../models/User')



module.exports.home_get = async (req, res) => {
    let sql = "select books.id , books.name as book_name , books.collage , books.userId , users.name from books,users where users.name = (select name from users where id =  books.userId)"
    let token = req.cookies.jwt;
    let userid = jwtDecode(token).id;
    let books = await DB.query(sql);
    books=books[0];
    let title= "Home Page"
    res.render("../Views/home.ejs", { title, books,userid});

};

module.exports.AddBook_get = (req, res) => {
    let title= "Add book"
    let token = req.cookies.jwt;
    let userid = jwtDecode(token).id;
    res.render("../Views/AddBook.ejs",{title,userid});
};

module.exports.AddBook_post = async (req, res) => {
    let { name ,collage } = req.body;
    let token = req.cookies.jwt;
    let userId = jwtDecode(token).id;

    let data = {
        name,
        collage,
        userId
    }

    let book = await Book.create(data)
    try {
        if (book) {
            res.redirect('/Addbook')
        }
        else {
            res.send("<script>alert('book doesn't added'); window.location.href = '/Addbook'; </script>");
        }
    }
    catch (error) {
        console.log(error);
    }

};

module.exports.books_delete =async (req, res) => {
    let token = req.cookies.jwt;
    let userid = jwtDecode(token).id;
    let bookid = req.body.bookid;

    let user = await User.findOne({where:{'id':userid}});
    let book = await Book.findOne({where:{'id':bookid}});
    let owner_id = book.userId;
    let userRole=user.role;

    try {
        if(userid===owner_id || userRole==='admin'){
            await Book.destroy({where:{'id':bookid}})
            res.redirect('/')
        }
        else{
            res.send("<script>alert('you dont have permission to delete book'); window.location.href = '/mybooks'; </script>");
        }
        
    } catch (error) {
        console.log(error);
    }
    
};

module.exports.myBooks_get =async (req, res) => {
    let token = req.cookies.jwt;
    let userid = jwtDecode(token).id;

    let user = await User.findOne({where:{'id':userid}});
    let userRole=user.role;
    let books="";
    let title= "my books"
    if(userRole==="admin"){
        books = await Book.findAll();
    }

    else{
        books = await Book.findAll({where:{'userId':userid}});
    }
    res.render("../Views/MyBooks.ejs", {title , books , userid});

    
};
