const fetch = require('node-fetch');

const queryRequestController = async (query, database, limit, offset, allCount) => {
    if (!allCount && query.startsWith('select') && query.indexOf('limit') != -1) {
        query = query.slice(0, query.indexOf("limit"))
        query += ` limit ${offset}, ${limit};`;
    } else if (!allCount && query.startsWith('select')) {
        query += ` limit ${offset}, ${limit};`;
    }
    console.log(query);
    var result = null;
    await new Promise((resolve, reject) => {
        fetch("http://localhost:8000/queryExecute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, database }),
        }).then(async (data) => {
            resolve(await data.json());
        }).catch((error) => {
            reject(error);
        })
    }).then((data) => { result = data })
        .catch((error) => { result = error });
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
    return { currPage, maxRecords, pageLimit, offset }
}
const stringToQuery = (str) => {
    // var delimiters = ['_', '^', '$', ':', '{', '}'];
    // console.log(str.includes(delimiters));
    // if (str.includes(delimiters)) {
    var query = "select * from student ";
    var word = '', arr;
    var obj = {};
    str = str.replaceAll('_', ",fname=")
        .replaceAll('^', ",lname=")
        .replaceAll('$', ",age=")
        .replaceAll('{', ",phone=")
        .replaceAll('}', ",email=")
        .replaceAll(':', ",city=");

        console.log(str);
    // str = str.split(/[_^${}:]/).join('');
    str.split(',').forEach((elm) => {
        if (elm != '') {
            var key = elm.split('=')[0];
            if (arr == key) {
                obj[key].push(elm.split('=')[1]);
            } else {
                arr = key;
                obj[key] = [elm.split('=')[1]]
            }
        }
    })
    var where = 'where ';
    Object.entries(obj).forEach(([key, value], i) => {
        if (value.length > 1) {
            where += '(';
            value.forEach((val, i) => { where += `${key} like `; (val !== '') ? where += `'%${val}%' ${(i != value.length - 1) ? 'or' : ''} ` : ''; })
            where += ')';
        } else {
            where += `${key} like '%${value[0]}%' `;
        }
        (i != Object.keys(obj).length - 1) ? where += ' and ' : where += ';';
    })
    // console.log(where);
    console.log(where);
    return query += where;
    // }else{
    //     return {status: false};
    // }
}
// stringToQuery("__aw");
module.exports = { queryRequestController, getPagination, stringToQuery };