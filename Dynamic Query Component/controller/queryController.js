const {queryExecuter} =  require('../model/queryModel');
    
const queryExecuterController = async (con, query) =>{
    return await queryExecuter(con, query);
}
module.exports = {queryExecuterController};