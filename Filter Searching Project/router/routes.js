const app = require('express');
const router = app.Router();
const dotenv = require('dotenv').config();
const { filterController, getPagination } = require("../controller/filterController");

var maxRecords, currPage, offset, button, where, params;

function filterSearch (filters) {
    if(typeof filters.filter !== 'undefined'){
        delete filters['filter'];
        var type = filters['type'];
        delete filters['type'];
        where = " where "
        Object.entries(filters).forEach(([key, value]) =>{
            if(value != ''){
                if(key == 'id'){
                    where += `${key} in (${value}) or `;
                }else{
                    where += `${key} like '%${value}%' ${type} `;
                }
            }
        })
        return where.substring(0, (type === 'or') ? where.length - 4 : where.length - 5);
    }
}
router.all('/filter', async (req, res) => {
    var query = "select * from student";
    var database = "student_mang_26_feb";
    var response = await filterController(query, database, process.env.PAGE_LIMIT,offset, true);
    currPage = req?.body?.page || 1;
    offset = req?.body?.offset || 0;
    button = req?.body?.button || null;
    maxRecords = response.result.data.length;
    console.log(req.body);
    if(typeof req.body.filter !== 'undefined'){
        query = query + filterSearch(req.body);
        var response = await filterController(query, database, process.env.PAGE_LIMIT,offset, true);
        res.render('Filter Searching Project/filter', { result: response.result, params: false});
    }else{
        params = getPagination(button, parseInt(currPage), parseInt(maxRecords), process.env.PAGE_LIMIT, parseInt(offset));
        var result = await filterController(query, database, process.env.PAGE_LIMIT, params.offset, false);
        res.render('Filter Searching Project/filter', { result: result.result, params });
    }
});
module.exports = router;