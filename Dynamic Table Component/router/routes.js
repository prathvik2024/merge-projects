const app = require('express');
const router = app.Router();
const path = require('path');
const dotenv = require('dotenv').config();
const { getRecords, getPagination } = require('../controller/dynamicTableController');


var offset = 0;
var query, database;
router.get('/table', (req, res) => {
    if (typeof maxRecords === 'undefined') {
        var page = { currPage: 1, pageLimit: process.env.PAGE_LIMIT };
        // console.log(ejsPath);
        res.render('Dynamic Table Component/dynamictable', page);
    }
});
router.post('/dynamictable', async (req, res) => {
    // res.setHeader("Content-Type", "text/html");
    query = (typeof req.body.inputquery === 'undefined') ? query : req.body.inputquery;
    database = (typeof req.body.inputdb === 'undefined') ? database : req.body.inputdb;
    var maxRecords, currPage, offset, button;
    // let regex = /^[a-zA-Z]+$/;
    // if(!regex.test(req.body.inputdb)){
    //     res.render('Dynamic Table Component/dynamictable', {dbError: 'Enter valid database name'});
    // }else 
    // console.log('query :' + query);
    // console.log('database :' + database);
    if (!query.trim().startsWith('select')) {
        res.render('Dynamic Table Component/dynamictable', { Qerror: 'Enter only select query!' });
    } else {
        // console.log(req.body);
        offset = req?.body?.offset || 0;
        button = req?.body?.button || null;
        // var table_name = query.trim().split('from')[1].trim().split(' ')[0];

        let response = await getRecords(query, database, process.env.PAGE_LIMIT, offset, true);
        console.log(response);
        if (!response?.result?.status) {
            res.render('Dynamic Table Component/dynamictable', { dbError: response.error, query, database });
        } else if (response.result.sqlMessage) {
            res.render('Dynamic Table Component/dynamictable', { Qerror: response.result.sqlMessage, query, database });
        } else {
            maxRecords = response.result.data.length;
            currPage = req?.body?.page || 1;
            if (maxRecords <= process.env.PAGE_LIMIT) {
                let result = await getRecords(query, database, process.env.PAGE_LIMIT, 0, true);
                console.log(result);
                res.render('Dynamic Table Component/dynamictable', { result: result.result, params: {max_records:maxRecords, pageLimit: process.env.PAGE_LIMIT}, query, database});
            }else{
                let params = getPagination(button, parseInt(currPage), parseInt(maxRecords), process.env.PAGE_LIMIT, parseInt(offset));
                let result = await getRecords(query, database, process.env.PAGE_LIMIT, params.offset, false);
                console.log(result);
                if(result?.result?.error?.sqlMessage){
                    console.log("if down");
                    res.render('Dynamic Table Component/dynamictable', { Qerror: "please remove semicolon(';')!!", query, database });
                }else if (!result?.result?.status) {
                    console.log("else if down");
                    res.render('Dynamic Table Component/dynamictable', { dbError: result.result.error.sqlMessage, query, database });
                }else{
                    console.log("else down");
                    res.render('Dynamic Table Component/dynamictable', { result: result.result, params, query, database });
                }
            }
        }
    }
})
module.exports = router;