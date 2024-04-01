// const getUserLogin = async (email, password) => {
//     var response = null;
//     await fetch("http://localhost:8000/checkUserCredentials", {
//         method: "POST",
//         mode: "cors",
//         headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*"
//         },
//         body: JSON.stringify({ email, password })
//     }).then((data) => {
//         response = data.json();
//     })
//     return await response;
// }
var user = localStorage.getItem('userDetails');
if(user !== null){
    user = JSON.parse(user);
    if(user.status){
        document.getElementById('userdetails').innerText = Object.entries(user.userDetails[0]).join("\n").toString();
    }else{
        window.location.href = "http://127.0.0.1:5500/Login Register ModuleFRONTEND/html/register.html";
    }
}else{
    window.location.href = "http://127.0.0.1:5500/Login Register ModuleFRONTEND/html/register.html";
}