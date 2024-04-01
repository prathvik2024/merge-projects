var response = null;
const checkUserActivation = async (user_id, activation_id) =>{
    await fetch("http://localhost:8000/checkUserActivation", {
            method: "POST",
            mode: "cors",
            headers:{"Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify({user_id, activation_id})
        }).then((data)=>{
            response = data.json();
            // console.log(response);
        })
        response = await response;
        // console.log(await response);
        if(response.status){
            document.getElementById('verifySuccess').classList.remove('d-none');
        }else{
            document.getElementById('verifyFailed').classList.remove('d-none');
        }
        // return await response.status;
}

var queryParams = window.location.search.split(/[\s,:?& ]+/);
if(queryParams[1] === 'user_id' && queryParams[3] === 'activation_id'){
    var user_id = queryParams[2];
    var activation_id = queryParams[4];
    checkUserActivation(user_id, activation_id);
}
document.getElementById('submit').addEventListener('click', async function (){
    document.querySelectorAll('span').forEach((elm)=>elm.classList.add('d-none'));
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    if(password.trim().length < 8){
        document.querySelector('.pass').classList.remove('d-none');
    }else if(password !== confirmPassword){
        document.querySelector('.cpass').classList.remove('d-none');
    }else{
        // console.log(password);
        if(await userActivation(response.result[0].id, password)){
            window.location.href = "http://127.0.0.1:5500/public/html/login.html";
        }else{
            document.getElementById('verifySuccess').classList.add('d-none');
            document.getElementById('verifyFailed').classList.remove('d-none');
        }
    }
})
const userActivation = async (user_id, password) =>{
    var response = null;
    await fetch("http://localhost:8000/activeUser", {
            method: "POST",
            mode: "cors",
            headers:{"Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify({user_id,password})
        }).then((data)=>{
            response = data.json();
        })
    return await response;
}   