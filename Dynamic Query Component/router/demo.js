var sql = ("select * from student_master where id = 1").trim().split('from')[1].trim().split(' ')[0];
console.log(sql);
