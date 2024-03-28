const {showAllStudents, getRecords, getStudentAttendance, getAttendanceRecords, getStudentResult, getStudentInfo} = require('../models/studentmodel');

const studentController = async (offset, orderby, column) => {
    return await showAllStudents(offset, orderby, column);
}
const getRecordsController = async () =>{
    return await getRecords();
}
const getStudentAttendanceController = async (month, offset) =>{
    return await getStudentAttendance(month, offset);
}
const getAttendanceRecordsController = async (month) =>{
    return await getAttendanceRecords(month);
}
const getStudentResultController = async (offset) =>{
    return await getStudentResult(offset);
}
const getStudentInfoController = async (stud_id) =>{
    return await getStudentInfo(stud_id);
}
module.exports = {studentController, getRecordsController, getStudentAttendanceController
    , getAttendanceRecordsController,getStudentResultController,getStudentInfoController};