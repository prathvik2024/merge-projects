const fetch = require("node-fetch");
const getComboBoxes = async (query, database) => {
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
module.exports = getComboBoxes;