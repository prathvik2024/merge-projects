import { formBuilder } from "../../helper/formBuilder.js";

var formStr = formBuilder.make({ control: "input", type: "email", inputLabel: "Email Address", class: "form-control isEmail", parentClasses: "col-12 my-3", id: "email" });
formStr += formBuilder.make({ control: "input", type: "password", inputLabel: "Password", class: "form-control isPassword", parentClasses: "col-12 my-3", id: "password" });
formStr += formBuilder.make({ control: "input", type: "button", class: "btn btn-primary px-3 fs-6", parentClasses: "float-end mt-4", value: "Login", id: "loginBtn" });

document.getElementById('form').innerHTML = formStr;

document.getElementById('loginBtn').addEventListener('click', async () => {
    document.querySelectorAll('span').forEach((elm)=> elm.classList.add('d-none'));
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    // console.log(email, password);
    var userDetail = await checkUserLogin(email, password);

    if (userDetail.status) {
        console.log(userDetail);
        localStorage.setItem("userDetails", JSON.stringify(userDetail));
        window.location.href = "http://127.0.0.1:5500/public/html/index.html";
    } else {
        var span = document.createElement('span');
        span.className = "text-danger";
        span.innerHTML = `<i class="bi bi-exclamation-circle mx-2"></i>` + userDetail.error;
        document.getElementById('form').parentElement.appendChild(span);
    }
})

const checkUserLogin = async (email, password) => {
    var response = null;
    await fetch("http://localhost:8000/checkUserCredentials", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ email, password })
    }).then((data) => {
        response = data.json();
    })
    return await response;
}