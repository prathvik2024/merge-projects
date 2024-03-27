const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../.env')});

module.exports.dbConnection = async () => {
    var response = null;
    await new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.SQL_USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        })
        con.connect((err) => {
            if (err) {
                reject(err);
            } else {
                resolve(con);
            }
        });
    }).then((con)=>{
        response = {status: true, con};
    }).catch((err)=>{
        response = {status: false, err};
    })
    return response;
}
module.exports.closeDbConnection = (con) => {
    con.destroy();
}
