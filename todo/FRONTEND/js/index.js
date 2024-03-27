console.log("hello");
const insertUserNote = async (title, notes) => {
    var responce;
    await fetch("http://localhost:8000/insertNotes", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ title, notes })
    }).then((result) => {
        responce = result.json();
    }).catch((error) => {
        responce = error;
    })
    console.log(await responce);
    return await responce;
}
const getUserNotes = async () => {
    var responce;
    await fetch("http://localhost:8000/getNotes", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }).then((result) => {
        responce = result.json();
    }).catch((error) => {
        responce = error;
    })
    responce = await responce;
    if (responce.status) {
        var cardStr = "";
        responce.result.forEach(todo => {
            cardStr += `<div class="card bg-dark p-3 my-3">
            <div class="d-flex align-items-center">
                <h5 class="card-title text-white col-10">${todo.title}</h5>
                <input class="btn btn-success text-white mx-1" type="button" value="Edit" onclick='updateNote("${todo.id}", "${todo.title}", "${todo.note}")'>
                <input class="btn btn-danger text-white col-1 mx-1" type="button" value="Delete" onclick='deleteNote("${todo.id}")'>
            </div>
            <p class="card-text text-white my-2">${todo.note}</p>
        </div>`;
        });
        document.getElementById('todos').innerHTML = cardStr;
    }
}
getUserNotes()

const editNote = async (id, title,notes ) => {
        await fetch("http://localhost:8000/editNotes", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ id, title, notes })
        }).then((result) => {
            responce = result.json();
        }).catch((error) => {
            responce = error;
        })
        // console.log(responce);
        return await responce;
}
const deleteNote = async (id) => {
    var responce;
    await fetch("http://localhost:8000/deleteNotes", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ id })
    }).then((result) => {
        responce = result.json();
    }).catch((error) => {
        responce = error;
    })
    responce = await responce;
    if (responce.status) {
        getUserNotes();
    }
}