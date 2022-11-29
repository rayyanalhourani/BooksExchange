const jwtDecode = require("jwt-decode");
let { getconnection } = require("../Model/database");

module.exports.home_get = (req, res) => {
    const sql = `select * from book`;

    let data = "hi";

    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.render("../Views/home.ejs", { result });
        }
    });
};

module.exports.AddBook_get = (req, res) => {
    res.render("../Views/AddBook.ejs");
};

module.exports.AddBook_post = (req, res) => {
    let bookid = req.body.bookid;
    let name = req.body.name;
    let collage = req.body.collage;
    let token = req.cookies.jwt;
    let ownerId = jwtDecode(token).id;
    const sql = `INSERT INTO book (id,name ,collage, book_owner_id ) VALUES ("${bookid}","${name}","${collage}","${ownerId}")`;

    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(201).send("book added successfully");
        }
    });
};

module.exports.books_get = (req, res) => {
    const sql = `select * from book`;

    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(201).send(result);
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
        res.status(404).send("you cant delete this book");
    }

    sql = `Select Role from user where id = ${userid}`;
    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            userRole = result[0].Role;
        }
    });

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
        res.status(404).send("you can't delete the book");
    }
};

module.exports.myBooks_get = (req, res) => {
    let token = req.cookies.jwt;
    let userid = jwtDecode(token).id;

    let sql = `select name from book where book_owner_id = ${userid}`;
    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(201).send(result);
        }
    });
};
