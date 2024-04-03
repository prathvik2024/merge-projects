const fetch = require("node-fetch");
const getRecords = async (query, database, limit, offset, allCount) => {
    if (!allCount && query.startsWith('select') && query.indexOf('limit') != -1) {
        query = query.slice(0, query.indexOf("limit"))
        query += ` limit ${offset}, ${limit};`;
    }else if(!allCount && query.startsWith('select')){
        query += ` limit ${offset}, ${limit};`;
    }
    console.log(query);
    var result;
    await new Promise((resolve, reject) => {
        fetch("http://localhost:8000/queryExecute", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ query, database }),
        }).then(async (data) => {
            resolve(await data.json());
        }).catch((err) => {
            reject(err);
        })
    }).then((data) => {
        result = data;
    }).catch((err) => {
        console.log(err);
        result = err;
    })
    // console.log(await result);
    return await result;
}
const getPagination = (button, currPage, maxRecords, pageLimit, offset) => {
    if (button == '>') {
        offset = currPage * pageLimit;
        currPage += 1;
    } else if (button == '<') {
        currPage -= 1;
        offset = (currPage - 1) * pageLimit;
    } else if (button == '<<') {
        offset = 0;
        currPage = 1;
    } else if (button == '>>') {
        offset = ((maxRecords / pageLimit) - currPage) * pageLimit;
        currPage = parseInt(maxRecords / pageLimit);
    }
    return { currPage, maxRecords, pageLimit, offset}
}
module.exports = { getRecords, getPagination };