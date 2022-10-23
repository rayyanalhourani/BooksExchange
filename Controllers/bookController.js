const jwtDecode = require("jwt-decode")
let { getconnection } = require("../Model/database")

module.exports.books_post= (req , res) => {
    let bookid = req.body.bookid
    let name = req.body.name
    let collage = req.body.collage
    let token = req.cookies.jwt
    let ownerId=jwtDecode(token).id
    const sql = `INSERT INTO book (id,name ,collage, book_owner_id ) VALUES ("${bookid}","${name}","${collage}","${ownerId}")`;

    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(201).send("book added successfully");
        }
    });

}

module.exports.books_get={
    
}

module.exports.books_delete={
    
}