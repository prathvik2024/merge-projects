const mysql = require('mysql');
const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.SQL_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
con.connect(err=>{
    if (err){
        console.log(err);
    }else{
        console.log("Database is Connected!!");
    }
})

module.exports = con;