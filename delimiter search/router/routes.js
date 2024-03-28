const app = require('express');
const router = app.Router();
const path = require('path');
const { queryRequestController, getPagination, stringToQuery } = require('../controller/delimiterSearchController');
const dotenv = require('dotenv').config();
var data = "<p style='color: red'> hello dude!</p>";
var maxRecords, currPage, offset, button, where, params;

router.all('/', async (req, res) => {
    var query = "select * from student"
    var database = "student_mang_26_feb";
    var response = await queryRequestController(query, database, process.env.PAGE_LIMIT, offset, true);
    currPage = req?.body?.page || 1;
    offset = req?.body?.offset || 0;
    button = req?.body?.button || null;
    maxRecords = response.result.data.length;
    if (typeof req.body.query !== 'undefined') {
        let result = await queryRequestController(await stringToQuery(req.body.query.trim()), "student_mang_26_feb", process.env.PAGE_LIMIT, offset, true);
        if (!result.result.status) {
            res.render('delimiter search/delimitersearch', {query: req.body.query.trim()});
        } else {
            res.render('delimiter search/delimitersearch', { result: result.result, params: false, query: req.body.query.trim()});
        }
    } else {
        params = getPagination(button, parseInt(currPage), parseInt(maxRecords), process.env.PAGE_LIMIT, parseInt(offset));
        var result = await queryRequestController(query, database, process.env.PAGE_LIMIT, params.offset, false);
        res.render('delimiter search/delimitersearch', { result: result.result, params});
    }
})

module.exports = router;