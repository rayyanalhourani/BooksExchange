const jwtDecode = require("jwt-decode");
const async = require("async")
let { getconnection } = require("../Model/database");


module.exports.home_get = (req, res) => {
    let dict = {}
    

    async.series(
        [
            function (callback) {
                sql = `select id,name from user`;
                getconnection().query(sql, (err, result) => {
                    if (err) {
                        res.status(404).send(err);
                    } else {
                        result.forEach(element => {
                            dict[element.id]=element.name 
                        });
                    }
                });
                callback();
            },
            function (callback) {
                sql = `select * from book`;
                getconnection().query(sql, (err, result) => {
                    if (err) {
                        res.status(404).send(err);
                    } else {
                        res.render("../Views/home.ejs", { result,dict});
                    }
                });
                callback() // call this to proceed
            }
        ],
    )

};

module.exports.AddBook_get = (req, res) => {
    res.render("../Views/AddBook.ejs");
};


module.exports.AddBook_post = (req, res) => {
    let name = req.body.name;
    let collage = req.body.collage;
    let token = req.cookies.jwt;
    let ownerId = jwtDecode(token).id;
    let bookid = 0;

    
    let sql = `select MAX(id) from book`;
    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            if(result!=null){
                bookid=result;
            }
        }
    });

    sql = `INSERT INTO book (id,name ,collage, book_owner_id ) VALUES ("${bookid}","${name}","${collage}","${ownerId}")`;
    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.redirect('/Addbook')
        }
    });
};

module.exports.books_delete = (req, res) => {
    let token = req.cookies.jwt;
    let userid = jwtDecode(token).id;
    let bookid = req.body.bookid;

    let owner_id;
    let userRole;

    let sql = `Select book_owner_id from book where id = ${bookid}`;
    try {
        getconnection().query(sql, (err, result) => {
            if (err) {
                res.status(404).send(err);
            } else {
                owner_id = result[0].book_owner_id;
            }
        });
    } catch {
        res.status(404).send("error with get owner id");
    }

    try {
        sql = `Select Role from user where id = ${userid}`;
        getconnection().query(sql, (err, result) => {
            if (err) {
                res.status(404).send(err);
            } else {
                userRole = result[0].Role;
            }
        });
    }
    catch {
        res.status(404).send("error with get user role");

    }

    try {
        sql = `delete from book where id = ${bookid}`;
        getconnection().query(sql, (err, result) => {
            if (err) {
                res.status(404).send(err);
            } else {
                if (userRole === "admin" || owner_id == userid) {
                    res.status(201).send("book deleted successfully");
                } else {
                    res.send("you dont have permission");
                }
            }
        });
    } catch {
        res.status(404).send("error with delete book");
    }
};

module.exports.myBooks_get = (req, res) => {
    let token = req.cookies.jwt;
    let userid = jwtDecode(token).id;
    let userRole;

    let sql = `Select Role from user where id = ${userid}`;
        getconnection().query(sql, (err, result) => {
            if (err) {
                res.status(404).send(err);
            } else {
                userRole = result[0].Role;

                if(userRole==="admin"){
                    sql = `select * from book`;
                    getconnection().query(sql, (err, result) => {
                        if (err) {
                            res.status(404).send(err);
                        } else {
                            res.render("../Views/MyBooks.ejs", {result});
                        }
                    });
                }

                else{
                    sql = `select * from book where book_owner_id = ${userid}`;
                    getconnection().query(sql, (err, result) => {
                        if (err) {
                            res.status(404).send(err);
                        } else {
                            res.render("../Views/MyBooks.ejs", {result});
                        }
                    });
                }
            }
        });
    
    


};
