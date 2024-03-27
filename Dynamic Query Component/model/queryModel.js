const { response } = require("express");
const queryExecuter = async (con, query) => {
    var response = null;
    try {
        await new Promise((resolve, reject) => {
            con.query(query, (errors, result, fields) => {
                if (errors) {
                    
                    reject(errors);
                }else{
                    resolve({result, fields});
                }
            })
        }).then(({result, fields}) =>{
            // console.log(fields);
            if(typeof fields !== 'undefined'){
                var colsName = [], colsOrgName = [];
                fields.forEach((elm) => {colsName.push(elm.name); colsOrgName.push(elm.orgName);});
                response = {status:true, data: result, colsName, colsOrgName};
            }else{
                response = {status:true, data: result};
            }
        }).catch(err =>{
                response = {status: false, error:err};
        })
    } catch (error) {
        response =  {status: false, error };
    }
    // console.log(await response);
    return await response;
}
// const queryExecuter = async (con, query) =>{
//     var response = null;
//     await new Promise((resolve, reject) => {
//         con.query(query, (errors, result) => {
//             if (errors) {
//                 reject(errors);
//             }else{
//                 resolve(result);
//             }
//         })
//     }).then((result) =>{
//         response = result;
//     }).catch(err =>{
//             response = err;
//     })
//     return await response;
// }
module.exports = {queryExecuter};