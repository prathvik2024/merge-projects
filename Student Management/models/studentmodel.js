const con = require('../../config/dbConnection');

const showAllStudents = async (offset, orderby, column) => {
    var resultSet = null;
    try {
        await new Promise((resolve, reject) => {
            var sql;
            if (typeof orderby !== 'undefined' && typeof column !== 'undefined') {
                if (orderby == 'aesc') {
                    sql = `select * from student order by ${column} limit ${offset},${process.env.PAGE_LIMIT}`;
                } else {
                    sql = `select * from student order by ${column} ${orderby} limit ${offset},${process.env.PAGE_LIMIT}`;
                }
                console.log('order by execute!');
            } else {
                sql = `select * from student limit ${offset},${process.env.PAGE_LIMIT}`;
                console.log('simple execute');
            }
            con.query(sql, (errors, result, field) => {
                if (errors) reject(errors);
                resolve(result);
            });
        }).then((result) => {
            resultSet = { success: true, result };
        }).catch(err => {
            resultSet = { success: false, error: err };
        });
    } catch (error) {
        resultSet = { success: false, error };
    }
    return resultSet;
}
const getRecords = async () => {
    var maxRecords = null;
    try {
        await new Promise((resolve, reject) => {
            const sql = `select count(*) AS MAX_RECORDS from student`;
            con.query(sql, (errors, result, field) => {
                if (errors) reject(errors);
                console.log(result);
                resolve(result[0].MAX_RECORDS);
            });
        }).then((result) => {
            maxRecords = result;
        }).catch(err => {
            maxRecords = err.sqlMessage;
        });
    } catch (error) {
        maxRecords = error;
    }
    return await maxRecords;
}

const getStudentAttendance = async (month, offset) => {
    var attResult;
    try {
        await new Promise((resolve, reject) => {
            const sql = `select id, fname, lname, count(*) AS PRESENT_DAYS,((count(*) * 100)/30)  AS ATTENDANCE_PER  from student, attendance where stud_id = id and month(att_date) = ${month} and attendance like  'Present ' group by stud_id limit ${offset},${process.env.PAGE_LIMIT}`;
            con.query(sql, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        }).then((result) => {
            resultSet = result;
        }).catch((error) => {
            resultSet = error;
        });
    } catch (error) {
        attResult = error;
    }
    return resultSet;
}
const getAttendanceRecords = async (month) => {
    var maxRecords = null;
    try {
        await new Promise((resolve, reject) => {
            const sql = `select count(*) AS MAX_RECORDS from attendance where month(att_date) = ${month} and attendance like  'Present '`;
            con.query(sql, (errors, result, field) => {
                if (errors) reject(errors);
                resolve(result[0].MAX_RECORDS);
            });
        }).then((result) => {
            maxRecords = result;
        }).catch(err => {
            maxRecords = err.sqlMessage;
        });
    } catch (error) {
        maxRecords = error;
    }
    return maxRecords;
}

const getStudentResult = async (offset) => {
    var resultSet = [];
    try {
        await new Promise((resolve, reject) => {
            const sql = `select sum(obtain_marks) as total_obtain from exam_detail where exam_id = 1 and exam_type = 'Theory' group by stud_id limit ${offset},${process.env.PAGE_LIMIT}`;
            con.query(sql, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        }).then((result) => {
            resultSet.push(result);
        }).catch((error) => {
            resultSet = error;
        });
        await new Promise((resolve, reject) => {
            const sql = `select sum(obtain_marks) as total_obtain from exam_detail where exam_id = 1 and exam_type = 'Practical' group by stud_id limit ${offset},${process.env.PAGE_LIMIT}`;
            con.query(sql, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        }).then((result) => {
            resultSet.push(result);
        }).catch((error) => {
            resultSet = error;
        });
        await new Promise((resolve, reject) => {
            const sql = `select sum(obtain_marks) as total_obtain from exam_detail where exam_id = 2 and exam_type = 'Theory' group by stud_id limit ${offset},${process.env.PAGE_LIMIT}`;
            con.query(sql, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        }).then((result) => {
            resultSet.push(result);
        }).catch((error) => {
            resultSet = error;
        });
        await new Promise((resolve, reject) => {
            const sql = `select sum(obtain_marks) as total_obtain from exam_detail where exam_id = 2 and exam_type = 'Practical' group by stud_id limit ${offset},${process.env.PAGE_LIMIT}`;
            con.query(sql, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        }).then((result) => {
            resultSet.push(result);
        }).catch((error) => {
            resultSet = error;
        });
        await new Promise((resolve, reject) => {
            const sql = `select sum(obtain_marks) as total_obtain from exam_detail where exam_id = 3 and exam_type = 'Theory' group by stud_id limit ${offset},${process.env.PAGE_LIMIT}`;
            con.query(sql, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        }).then((result) => {
            resultSet.push(result);
        }).catch((error) => {
            resultSet = error;
        });
        await new Promise((resolve, reject) => {
            const sql = `select sum(obtain_marks) as total_obtain from exam_detail where exam_id = 3 and exam_type = 'Practical' group by stud_id limit ${offset},${process.env.PAGE_LIMIT}`;
            con.query(sql, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        }).then((result) => {
            resultSet.push(result);
        }).catch((error) => {
            resultSet = error;
        });
        await new Promise((resolve, reject) => {
            const sql = `select id,fname, lname, sum(obtain_marks) as total_obtain_marks from exam_detail,student where student.id = exam_detail.stud_id group by stud_id limit ${offset},${process.env.PAGE_LIMIT}`;
            con.query(sql, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        }).then((result) => {
            resultSet.push(result);
        }).catch((error) => {
            resultSet = error;
        });
    } catch (error) {
        resultSet = error;
    }
    return {terminalTheory: resultSet[0], terminalPractical: resultSet[1],prelimTheory: resultSet[2],prelimPractical: resultSet[3],finalTheory: resultSet[4],finalpractical: resultSet[5],studentData: resultSet[6]};
}
const getStudentInfo = async (stud_id) => {
    var studentRecord = null;
    var attendance = null;
    try {
        await new Promise((resolve, reject) => {
            const sql = `select id, concat(student.fname, student.lname) as student_name,email, phone, city, state, subject_master.sub_name, exam_detail.sub_id, 
            sum(case when exam_detail.exam_id = 1 and exam_detail.exam_type = 'Theory' then obtain_marks end) terminalTheory,  
            sum(case when exam_detail.exam_id = 1 and exam_detail.exam_type = 'Practical' then obtain_marks end) terminalPractical, 
            sum(case when exam_detail.exam_id = 2 and exam_detail.exam_type = 'Theory' then obtain_marks end) prelimTheory,  
            sum(case when exam_detail.exam_id = 2 and exam_detail.exam_type = 'Practical' then obtain_marks end) prelimPractical ,
            sum(case when exam_detail.exam_id = 3 and exam_detail.exam_type = 'Theory' then obtain_marks end) finalTheory,  
            sum(case when exam_detail.exam_id = 3 and exam_detail.exam_type = 'Practical' then obtain_marks end) finalPractical ,
            (select sum(obtain_marks) from exam_detail where stud_id = ${stud_id} group by stud_id) as total_obtain_marks
            from student left join exam_detail on student.id = exam_detail.stud_id left join subject_master on exam_detail.sub_id =  subject_master.sub_id where stud_id = ${stud_id} group by stud_id, sub_id having stud_id = ${stud_id}`;
            con.query(sql, (errors, result, field) => {
                if (errors) reject(errors);
                resolve(result);
            });
        }).then((result) => {
            studentRecord = result;
        }).catch(err => {
            studentRecord = err.sqlMessage;
        });
        await new Promise((resolve, reject) => {
            const sql = `select ((count(*) * 100)/90)  AS ATTENDANCE_PER  from attendance where stud_id = ${stud_id} and attendance like  "Present "`;
            con.query(sql, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        }).then((result) => {
            attendance = result;
        }).catch((error) => {
            attendance = error;
        });
    } catch (error) {
        attendance = error;
    }
    return {studentRecord, attendance};
}

module.exports = { showAllStudents, getRecords, getStudentAttendance, getAttendanceRecords, getStudentResult,getStudentInfo};