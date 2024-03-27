const generateTableString = (cols = [], rows = {}) => {
    var tableStr = "";
    cols.forEach((obj) => {
        tableStr += "<tr>";
        tableStr += `<td>${obj}</td><td>${rows[obj]}</td></tr>`
    })
    return tableStr;
}
const getPost = async (id) => {
    // await fetch(`https://jsonplaceholder.org/posts/${id}`)
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((result) => {
            return result.json();
        })
        .then((response) => {
            // console.log(response);
            document.getElementById('table').innerHTML = generateTableString(Object.keys(response), response);
        });
}
var id = window.location.search.split("=")[1];
// console.log(url);
getPost(id);

const showComments = async () => {
    var btn = document.getElementById('commentBtn').value;
    if(btn === "Hide Comments"){
        document.getElementById('comments').style.display = "none";
        document.getElementById('commentBtn').value = "Show Comments";
    }else{
        // await fetch(`https://jsonplaceholder.org/comments/${id}`)
        await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`)
        .then((result) => {
            return result.json();
        })
        .then((response) => {
            // console.log(response);
            document.getElementById('comments').style.display = "block";
            document.getElementById('comments').innerHTML = `<p class='comment-text'>${response.body}</p> `;
            document.getElementById('commentBtn').value = "Hide Comments";
        });
    }
    
}