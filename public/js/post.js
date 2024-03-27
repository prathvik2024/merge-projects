const PAGE_LIMIT = 10;
var allPostData = null;
var renderTableData = null;
document.getElementById('first').style.display = "none";
document.getElementById('prev').style.display = "none";

const generateTableString = (cols = [], rows = {}) => {
    var tableStr = "";
    tableStr += "<tr>";
    cols.forEach((col) => {
        tableStr += `<th>${col}</th>`;
    })
    tableStr += "</tr>";
    rows.forEach((row) => {
        tableStr += `<tr onclick="postDetails(${row.id})">`;
        cols.forEach((col) => {
            if (col == 'image' || col == 'thumbnail') {
                tableStr += `<th><img style="width:50%" height="50%" src="${row[col]}"></th>`;
            } else if (col === 'content') {
                tableStr += `<th>${row[col].split(" ").slice(0, 15).join(" ")}</th>`;
            } else {
                tableStr += `<th>${row[col]}</th>`;
            }
        })
        // tableStr += `<th><a href='/postdetails?id=${row.id}'>Viewmore</a></th>`
        tableStr += "</tr>"
    })
    return tableStr;
}
const getAllPosts = async () => {
    // return await fetch("https://jsonplaceholder.org/posts")
    return await fetch("https://jsonplaceholder.typicode.com/posts")
}
const showPost = () => {
    getAllPosts().then((result) => {
        return result.json();
    })
        .then((response) => {
            // console.log(response);
            document.getElementById('params').value = `${response.length}, ${PAGE_LIMIT}`;
            allPostData = response;
            renderTableData = allPostData;
            document.getElementById('table').innerHTML = generateTableString(Object.keys(allPostData[0]), renderTableData.slice(0, PAGE_LIMIT));
        });
}
showPost();
const postDetails = (id) => {
    location.href = `../html/postdetails.html?id=${id}`;
}
const getPagination = (id) => {
    if (id.value == "<<") {
        document.getElementById('currPage').innerHTML = 1;
        document.getElementById('first').style.display = "none";
        document.getElementById('prev').style.display = "none";
        document.getElementById('last').style.display = "block";
        document.getElementById('next').style.display = "block";
    } else if (id.value == "<") {
        var params = document.getElementById('params').value.split(",");
        document.getElementById('currPage').innerText = parseInt(document.getElementById('currPage').innerHTML) - 1;
        if (parseInt(document.getElementById('currPage').innerHTML) == 1) {
            document.getElementById('last').style.display = "block";
            document.getElementById('next').style.display = "block";
            document.getElementById('first').style.display = "none";
            document.getElementById('prev').style.display = "none";
        } else {
            document.getElementById('last').style.display = "block";
            document.getElementById('next').style.display = "block";
        }
    } else if (id.value === ">") {
        var params = document.getElementById('params').value.split(",");
        document.getElementById('currPage').innerText = parseInt(document.getElementById('currPage').innerHTML) + 1;
        if (parseInt(document.getElementById('currPage').innerHTML) == Math.ceil(params[0] / params[1])) {
            document.getElementById('last').style.display = "none";
            document.getElementById('next').style.display = "none";
            document.getElementById('first').style.display = "block";
            document.getElementById('prev').style.display = "block";
        } else {
            document.getElementById('first').style.display = "block";
            document.getElementById('prev').style.display = "block";
        }
    } else if (id.value === ">>") {
        var params = document.getElementById('params').value.split(",");
        document.getElementById('last').style.display = "none";
        document.getElementById('next').style.display = "none";
        document.getElementById('first').style.display = "block";
        document.getElementById('prev').style.display = "block";
        document.getElementById('currPage').innerHTML = Math.ceil(params[0] / params[1]);
    }
    // 7*10-10+1
    if (parseInt(document.getElementById('currPage').innerHTML) != 1) {
        var data = (parseInt(document.getElementById('currPage').innerHTML) * PAGE_LIMIT - PAGE_LIMIT);
        document.getElementById('table').innerHTML = generateTableString(Object.keys(renderTableData[0]), renderTableData.slice(data, data + PAGE_LIMIT));
    } else {
        document.getElementById('table').innerHTML = generateTableString(Object.keys(renderTableData[0]), renderTableData.slice(0, PAGE_LIMIT));
    }
}

const searchRecords = () => {
    var searchQuery = document.getElementById('search').value.trim();
    var searchResponse = [];
    allPostData.forEach((obj) => {
        for (var key in obj) {
            if (obj[key].toString().includes(searchQuery)) {
                searchResponse.push(obj);
                break;
            }
        }
    })
    // console.log(searchResponse);
    if (searchResponse.length <= 0) {
        document.getElementById('table').innerHTML = "";
        document.getElementById('pagination').style.display = "none";
        document.getElementById('not-found').style.display = "flex";
    } else if (searchResponse.length <= PAGE_LIMIT) {
        renderTableData = searchResponse;
        document.getElementById('pagination').style.display = "none";
        document.getElementById('not-found').style.display = "none";
        document.getElementById('currPage').innerHTML = 1;
        document.getElementById('first').style.display = "none";
        document.getElementById('prev').style.display = "none";
        document.getElementById('table').innerHTML = generateTableString(Object.keys(allPostData[0]), renderTableData.slice(0, PAGE_LIMIT));
    } else {
        renderTableData = searchResponse;
        document.getElementById('not-found').style.display = "none";
        document.getElementById('params').value = `${searchResponse.length}, ${PAGE_LIMIT}`;
        document.getElementById('currPage').innerHTML = 1;
        document.getElementById('first').style.display = "none";
        document.getElementById('prev').style.display = "none";
        document.getElementById('last').style.display = "flex";
        document.getElementById('next').style.display = "flex";
        document.getElementById('table').innerHTML = generateTableString(Object.keys(allPostData[0]), renderTableData.slice(0, PAGE_LIMIT));
        document.getElementById('pagination').style.display = "flex";
    }
}