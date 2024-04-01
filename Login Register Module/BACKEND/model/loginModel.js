const con = require('../../../config/dbConnection');
const queryExecuter = require('../helper/queryExecuter');
const md5 = require('md5');
var salting = (Math.random() + 1).toString(36).substring(2, 7);
var activation_link = md5(salting);
module.exports = {
    registerUserModel: async (fname, lname, email) => {
        var responce;
        var sql1 = `SELECT * FROM users where email="${email}"`;
        var checkEmail = await queryExecuter(con, sql1);
        // console.log(checkEmail.result.length);
        if(checkEmail.result.length >= 1){
            responce = {status: false, error: "Email is already used!!"};
        }else{
            var sql = `INSERT INTO users (fname, lname, email, salting, activation_link) VALUES("${fname}","${lname}","${email}","${salting}","${activation_link}")`;
            responce = await queryExecuter(con, sql);
            responce['activation_link'] = activation_link;
        }
        return responce;
    },
    checkUserActivationModel: async (user_id, activation_id) => {
        var sql = `select * from users where id=${user_id} and activation_link="${activation_id}"`;
        var result = await queryExecuter(con, sql);
        // console.log(result);
        if (result.result.length !== 0) {
            return {status: true, result };
        } else {
            return {status: false, error: "Activation id is not Matched!!" };
        }
    },
    activeUserModel: async (user_id, password) => {
        console.log(password);
        // console.log(md5(salting.substring(0, 3) + password+salting.substring(3, 5)));
        var sql = `update users set status=1, pass="${md5(salting.substring(0, 3) + password+salting.substring(3, 5))}" where id=${user_id}`;
        return await queryExecuter(con, sql);
    },
    checkUserLoginModel : async (email, password) =>{
        var sql = `select * from users where email="${email}"`;
        var userResponse = await queryExecuter(con, sql);
        // console.log(userResponse);
        if(userResponse){
            var pass = userResponse?.result[0]?.salting.substring(0, 3) + password + userResponse?.result[0]?.salting.substring(3, 5);
            // console.log(md5(pass));
            var sql = `select * from users where email="${email}" and pass="${md5(pass)}" and status=1`;
            var userLoginDetails = await queryExecuter(con, sql);
            // console.log(userLoginDetails);
            if(userLoginDetails.status && userLoginDetails.result.length !== 0){
                return {status: true, userDetails: userLoginDetails.result}
            }else{
                return {status: false, error:"Invalid credentials!!"}
            }
        }else{
            return {status: false, error:"Invalid credentials!!"}
        }
    }
}