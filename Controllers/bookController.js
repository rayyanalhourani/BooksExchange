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

module.exports.books_get= (req , res) =>{

    const sql = `select * from book`;

    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(201).send(result);
        }
    });   
}

module.exports.books_delete= (req , res) =>{
    let token = req.cookies.jwt
    let userid = jwtDecode(token).id
    let bookid = req.body.bookid



    let sql = `Select book_owner_id from book where id = ${bookid}`
    let owner_id;
    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            owner_id=result[0].book_owner_id;
            console.log(owner_id);
        }
    });

    sql = `Select Role from user where id = ${userid}`
    let userRole;
    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            userRole=result[0].Role; 
            console.log(userRole);
        }
    });

    console.log("role",userRole);
    console.log("owner_id",owner_id);

    

    if(userRole==="admin" || owner_id===userid){
    sql = `delete from book where id = ${bookid}`;
    getconnection().query(sql, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(201).send("book deleted successfully");
        }
    });
}

else{
    res.send("you dont have permission")
}
   
}