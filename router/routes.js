const app = require('express');
const router = app.Router();
const dotenv = require('dotenv').config();

const loginControllers = require('../controllers/loginController');
const todoControllers = require('../controllers/todoControllers');
const queryExecuterController = require('../controllers/queryController');
const getComboBoxes = require('../controllers/comboController');
const delimiterSearchController = require('../controllers/delimiterSearchController');
const dynamictableController = require('../controllers/dynamicTableController');
const filterController = require('../controllers/filterController');
const studentController = require('../controllers/studentcontroller');
const comboBoxGenerater = require('../helper/comboBoxGenerate');
const {dbConnection} = require('../config/dbConnection2');


router.post('/registerUser', async (req, res) => {
    res.status(200).json(await loginControllers.registerUserController(req?.body?.fname, req?.body?.lname, req?.body?.email));
})

router.post("/checkUserActivation", async (req, res) => {
    res.status(200).json(await loginControllers.checkUserActivationController(req?.body?.user_id, req?.body?.activation_id));
});

router.post('/activeUser', async (req, res) => {
    res.status(200).json(await loginControllers.userActivationController(req?.body?.user_id, req?.body?.password));
});

router.post("/checkUserCredentials", async (req, res) => {
    res.status(200).json(await loginControllers.checkUserLoginController(req?.body?.email, req?.body?.password));
});

router.post("/getNotes", async (req, res) => {
    res.status(200).json(await todoControllers.getNotesController());
})

router.post("/insertNotes", async (req, res) => {
    res.status(200).json(await todoControllers.insertNotesController(req?.body?.title, req?.body?.notes));
})

router.post("/editNotes", async (req, res) => {
    res.status(200).json(await todoControllers.editNotesController(req?.body?.id, req?.body?.title, req?.body?.notes));
})

router.post("/deleteNotes", async (req, res) => {
    console.log(req.body.id);
    res.status(200).json(await todoControllers.deleteNotesController(req?.body?.id));
})

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
    } else {
        var sql = req.body.query.trim();
        if (sql.startsWith('select') || sql.startsWith('insert') || sql.startsWith('update') || sql.startsWith('delete')) {
            res.status(200).json({ result: await queryExecuterController(con, sql) });
        }
    }
});

router.all('/combo', async (req, res) => {
    var components = ['ComboBox', 'Radio', 'CheckBox'];
    var output = '';
    var arr = [];
    var selects = await getComboBoxes('select unique_name from select_master;', 'job_application');
    if (typeof req.body.type !== 'undefined' && typeof req.body.field !== 'undefined') {
        var result = await getComboBoxes(`select option_value from select_master, option_master where id = sid and unique_name = '${req.body.field}'`, 'job_application');
        result.result.data.forEach((val) => {
            arr.push(val[result.result.colsName[0]]);
        });
        if (req.body.type == 'ComboBox') {
            output = comboBoxGenerater.generateSelectBox(req.body.field, req.body.field, arr, arr, false, '', 'col-md-2');
        } else if (req.body.type == 'Radio') {
            output = comboBoxGenerater.generateRadioGroup(req.body.field, req.body.field, arr);
        } else if (req.body.type == 'CheckBox') {
            output = comboBoxGenerater.generateCheckboxGroup(req.body.field, req.body.field, arr);
        }
        res.render('combo practice/dynamiccombobox', { components, result: selects.result, output });
    } else {
        res.render('combo practice/dynamiccombobox', { components, result: selects.result });
    }
});



var data = "<p style='color: red'> hello dude!</p>";
var maxRecords, currPage, offset, button, where, params;
router.all('/', async (req, res) => {
    var query = "select * from student"
    var database = "student_mang_26_feb";
    var response = await delimiterSearchController.queryRequestController(query, database, process.env.PAGE_LIMIT, offset, true);
    currPage = req?.body?.page || 1;
    offset = req?.body?.offset || 0;
    button = req?.body?.button || null;
    maxRecords = response.result.data.length;
    if (typeof req.body.query !== 'undefined') {
        let result = await delimiterSearchController.queryRequestController(await delimiterSearchController.stringToQuery(req.body.query.trim()), "student_mang_26_feb", process.env.PAGE_LIMIT, offset, true);
        if (!result.result.status) {
            res.render('delimiter search/delimitersearch', { query: req.body.query.trim() });
        } else {
            res.render('delimiter search/delimitersearch', { result: result.result, params: false, query: req.body.query.trim() });
        }
    } else {
        params = delimiterSearchController.getPagination(button, parseInt(currPage), parseInt(maxRecords), process.env.PAGE_LIMIT, parseInt(offset));
        var result = await delimiterSearchController.queryRequestController(query, database, process.env.PAGE_LIMIT, params.offset, false);
        res.render('delimiter search/delimitersearch', { result: result.result, params });
    }
})

// done
var maxRecords, currPage, offset, button, where, params;

function filterSearch(filters) {
    if (typeof filters.filter !== 'undefined') {
        delete filters['filter'];
        var type = filters['type'];
        delete filters['type'];
        where = " where "
        Object.entries(filters).forEach(([key, value]) => {
            if (value != '') {
                if (key == 'id') {
                    where += `${key} in (${value}) or `;
                } else {
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
    var response = await filterController.filterController(query, database, process.env.PAGE_LIMIT, offset, true);
    currPage = req?.body?.page || 1;
    offset = req?.body?.offset || 0;
    button = req?.body?.button || null;
    maxRecords = response.result.data.length;
    console.log(req.body);
    if (typeof req.body.filter !== 'undefined') {
        query = query + filterSearch(req.body);
        var response = await filterController.filterController(query, database, process.env.PAGE_LIMIT, offset, true);
        res.render('Filter Searching Project/filter', { result: response.result, params: false });
    } else {
        params = filterController.getPagination(button, parseInt(currPage), parseInt(maxRecords), process.env.PAGE_LIMIT, parseInt(offset));
        var result = await filterController.filterController(query, database, process.env.PAGE_LIMIT, params.offset, false);
        res.render('Filter Searching Project/filter', { result: result.result, params });
    }
});
var offset = 0;
var query, database;
router.get('/table', (req, res) => {
    if (typeof maxRecords === 'undefined') {
        var page = { currPage: 1, pageLimit: process.env.PAGE_LIMIT };
        res.render('Dynamic Table Component/dynamictable', page);
    }
});
router.post('/dynamictable', async (req, res) => {
    query = (typeof req.body.inputquery === 'undefined') ? query : req.body.inputquery;
    database = (typeof req.body.inputdb === 'undefined') ? database : req.body.inputdb;
    var maxRecords, currPage, offset, button;
    if (!query.trim().startsWith('select')) {
        res.render('Dynamic Table Component/dynamictable', { Qerror: 'Enter only select query!' });
    } else {
        offset = req?.body?.offset || 0;
        button = req?.body?.button || null;

        let response = await dynamictableController.getRecords(query, database, process.env.PAGE_LIMIT, offset, true);
        if (!response?.result?.status) {
            res.render('Dynamic Table Component/dynamictable', { dbError: response.error, query, database });
        } else if (response.result.sqlMessage) {
            res.render('Dynamic Table Component/dynamictable', { Qerror: response.result.sqlMessage, query, database });
        } else {
            maxRecords = response.result.data.length;
            currPage = req?.body?.page || 1;
            if (maxRecords <= process.env.PAGE_LIMIT) {
                let result = await dynamictableController.getRecords(query, database, process.env.PAGE_LIMIT, 0, true);
                res.render('Dynamic Table Component/dynamictable', { result: result.result, params: { max_records: maxRecords, pageLimit: process.env.PAGE_LIMIT }, query, database });
            } else {
                let params = dynamictableController.getPagination(button, parseInt(currPage), parseInt(maxRecords), process.env.PAGE_LIMIT, parseInt(offset));
                let result = await dynamictableController.getRecords(query, database, process.env.PAGE_LIMIT, params.offset, false);
                if (result?.result?.error?.sqlMessage) {
                    res.render('Dynamic Table Component/dynamictable', { Qerror: "please remove semicolon(';')!!", query, database });
                } else if (!result?.result?.status) {
                    res.render('Dynamic Table Component/dynamictable', { dbError: result.result.error.sqlMessage, query, database });
                } else {
                    res.render('Dynamic Table Component/dynamictable', { result: result.result, params, query, database });
                }
            }
        }
    }
});

var PAGE_NO = 1;
var offset = 0;
var month;
router.get('/showstudents', async (req, res) => {
    if (!process.env.MAX_RECORDS) {
        process.env.MAX_RECORDS = await studentController.getRecordsController();
    }
    if (!req.query.page) {
        offset = 0 * process.env.PAGE_LIMIT;
    } else {
        PAGE_NO = req.query.page;
        if (PAGE_NO <= 1 || PAGE_NO > parseInt(process.env.MAX_RECORDS / process.env.PAGE_LIMIT)) {
            PAGE_NO = 1;
            offset = offset = 0 * process.env.PAGE_LIMIT;
        } else if (PAGE_NO == parseInt(process.env.MAX_RECORDS / process.env.PAGE_LIMIT)) {
            offset = parseInt(process.env.MAX_RECORDS - process.env.PAGE_LIMIT);
        } else {
            offset = PAGE_NO * process.env.PAGE_LIMIT;
        }
    }
    if (!req.query.orderby) {
        res.render('Student Management/showstudents', { result: await studentController.studentController(offset), currPage: PAGE_NO });
    } else {
        var orderbyArray = ['aesc', 'desc'];
        var colArray = ['fname', 'lname', 'age', 'phone', 'email']
        if (orderbyArray.includes(req.query.orderby) && colArray.includes(req.query.col)) {
            res.render('Student Management/showstudents', { result: await studentController.studentController(offset, req.query.orderby, req.query.col), currPage: PAGE_NO });
        } else {
            res.send("Please select columns and order by from table only!");
        }
    }
});

router.route('/showattendance')
    .get(async (req, res) => {
        if (!req.query.page) {
            offset = 0 * process.env.PAGE_LIMIT;
        } else {
            PAGE_NO = req.query.page;
            if (PAGE_NO <= 1 || PAGE_NO > parseInt(process.env.MAX_RECORDS / process.env.PAGE_LIMIT)) {
                PAGE_NO = 1;
                offset = offset = 0 * process.env.PAGE_LIMIT;
            } else if (PAGE_NO == parseInt(process.env.MAX_RECORDS / process.env.PAGE_LIMIT)) {
                offset = parseInt(process.env.MAX_RECORDS - process.env.PAGE_LIMIT);
            } else {
                offset = PAGE_NO * process.env.PAGE_LIMIT;
            }
        }
        if (month !== req.query.month) {
            PAGE_NO = 1;
            month = req.query.month;
        }
        res.render("Student Management/showattendance", { result: await studentController.getStudentAttendanceController(req.query.month || 12, offset), currPage: PAGE_NO, month })
    })

router.get('/studentresult', async (req, res) => {
    if (!req.query.page) {
        offset = 0 * process.env.PAGE_LIMIT;
    } else {
        PAGE_NO = req.query.page;
        if (PAGE_NO <= 1 || PAGE_NO > parseInt(process.env.MAX_RECORDS / process.env.PAGE_LIMIT)) {
            PAGE_NO = 1;
            offset = offset = 0 * process.env.PAGE_LIMIT;
        } else if (PAGE_NO == parseInt(process.env.MAX_RECORDS / process.env.PAGE_LIMIT)) {
            offset = parseInt(process.env.MAX_RECORDS - process.env.PAGE_LIMIT);
        } else {
            offset = PAGE_NO * process.env.PAGE_LIMIT;
        }
    }
    res.render("Student Management/studentresult", { result: await studentController.getStudentResultController(offset), currPage: PAGE_NO })
})

router.get('/studentdetails', async (req, res) => {
    res.render('Student Management/showstudentinfo', { result: await studentController.getStudentInfoController(req.query.id), grandTotal: req.query.totalmarks });
});
module.exports = router;