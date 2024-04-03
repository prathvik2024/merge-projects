const queryExecuter = async (con, query) => {
    var response = null;
    try {
        await new Promise((resolve, reject) => {
            con.query(query, (errors, result, fields) => {
                if (errors) {

                    reject(errors);
                } else {
                    resolve({ result, fields });
                }
            })
        }).then(({ result, fields }) => {
            if (typeof fields !== 'undefined') {
                var colsName = [], colsOrgName = [];
                fields.forEach((elm) => { colsName.push(elm.name); colsOrgName.push(elm.orgName); });
                response = { status: true, data: result, colsName, colsOrgName };
            } else {
                response = { status: true, data: result };
            }
        }).catch(err => {
            response = { status: false, error: err };
        })
    } catch (error) {
        response = { status: false, error };
    }
    return await response;
}
module.exports = { queryExecuter };