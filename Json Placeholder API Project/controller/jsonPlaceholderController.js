const fetch = require('node-fetch');

const getAllPost = async () => {
    return await fetch('https://www.jsonplaceholder.org/posts');
}
module.exports = { getAllPost };