const app = require('express');
const router = app.Router();
const dotenv = require('dotenv').config();
const { studentController, getRecordsController, getStudentAttendanceController
    , getStudentResultController, getStudentInfoController } = require('../controllers/studentcontroller');

var PAGE_NO = 1;
var offset = 0;
var month;
router.get('/showstudents', async (req, res) => {
    if (!process.env.MAX_RECORDS) {
        process.env.MAX_RECORDS = await getRecordsController();
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
        res.render('Student Management/showstudents', { result: await studentController(offset), currPage: PAGE_NO });
    } else {
        var orderbyArray = ['aesc', 'desc'];
        var colArray = ['fname', 'lname', 'age', 'phone', 'email']
        if (orderbyArray.includes(req.query.orderby) && colArray.includes(req.query.col)) {
            res.render('Student Management/showstudents', { result: await studentController(offset, req.query.orderby, req.query.col), currPage: PAGE_NO });
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
        res.render("Student Management/showattendance", { result: await getStudentAttendanceController(req.query.month || 12, offset), currPage: PAGE_NO, month })
    })
// .post(async (req, res) =>{
//     res.render("showattendance", {result: await getStudentAttendanceController(req.body.month, offset), currPage: PAGE_NO})
// });


router.get('/studentresult', async (req, res) =>{
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
    res.render("Student Management/studentresult", {result: await getStudentResultController(offset), currPage:PAGE_NO})
})

router.get('/studentdetails', async (req, res)=>{
    res.render('Student Management/showstudentinfo', {result: await getStudentInfoController(req.query.id), grandTotal: req.query.totalmarks});
});
module.exports = router;