const app = require('express');
const router = app.Router();
const dotenv = require('dotenv').config();
const {queryExecuterController} = require('../controller/queryController');
const { dbConnection, closeDbConnection } = require('../config/dbConnection');

router.post('/queryExecute', async (req, res) => {
    res.setHeader("Content-Type", "application/json ");
    if (!req.body.database && !req.body.query) {
        res.status(500).json({ status: false, error: 'Parameters are missing!!' });
    } else {
        process.env.DATABASE = req.body.database;
    }
    const { status, con } = await dbConnection();
    if (!status) {
        res.status(500).json({ status: false, error: 'Undefined Database please check your database name!' });
    }else{
        var sql = req.body.query.trim();
        if(sql.startsWith('select') || sql.startsWith('insert') || sql.startsWith('update') || sql.startsWith('delete')){
            console.log(sql);
            res.status(200).json({result: await queryExecuterController(con, sql)});
        }
    }
})
module.exports = router;