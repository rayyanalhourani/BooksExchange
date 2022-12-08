const jwtDecode = require("jwt-decode");
const jwt = require("jsonwebtoken")
const DB = require('../config/Database')
const Book = require('../models/Book')
const User = require('../models/User')



module.exports.home_get = async (req, res) => {
    let sql = "select books.id , books.name as book_name , books.collage , books.userId , users.name from books,users where users.name = (select name from users where id =  books.userId)"
    
    let books = await DB.query(sql);
    books=books[0];
    res.render("../Views/home.ejs", { books});
    


    // async.series(
    //     [
    //         function (callback) {
    //             sql = `select id,name from user`;
    //             getconnection().query(sql, (err, result) => {
    //                 if (err) {
    //                     res.status(404).send(err);
    //                 } else {
    //                     
    //                 }
    //             });
    //             callback();
    //         },
    //         function (callback) {
    //             sql = `select * from book`;
    //             getconnection().query(sql, (err, result) => {
    //                 if (err) {
    //                     res.status(404).send(err);
    //                 } else {
    //                    
    //                 }
    //             });
    //             callback() // call this to proceed
    //         }
    //     ],
    // )

};

module.exports.AddBook_get = (req, res) => {
    res.render("../Views/AddBook.ejs");
};

module.exports.AddBook_post = async (req, res) => {
    let name = req.body.name;
    let collage = req.body.collage;
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
            console.log("book doesn't added");
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
            res.send("you dont have permission to delete book");
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

    if(userRole==="admin"){
        books = await Book.findAll();
    }

    else{
        books = await Book.findAll({where:{'userId':userid}});
    }
    res.render("../Views/MyBooks.ejs", {books});

    
};
