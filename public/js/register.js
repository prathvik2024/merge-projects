import { formBuilder } from "../../helper/formBuilder.js";

var formStr = formBuilder.make({ control: "input", type: "text", inputLabel: "First Name", class: "form-control isAlpha", parentClasses: "col-12", id:"fname"});
formStr += formBuilder.make({ control: "input", type: "text", inputLabel: "Last Name", class: "form-control isAlpha", parentClasses: "col-12 my-3",  id:"lname"});
formStr += formBuilder.make({ control: "input", type: "email", inputLabel: "Email Address", class: "form-control isEmail", parentClasses: "col-12 my-3", id:"email" });
formStr += formBuilder.make({ control: "input", type: "button", class: "btn btn-primary px-3 fs-6", parentClasses: "float-end mt-4", value: "Register", id: "registerBtn" });

document.getElementById('form').innerHTML = formStr;

const isEmail = (str) => {
    return !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str));
}
const registerUser = async (obj) =>{
    var response = null;
    await fetch("http://localhost:8000/registerUser", {
            method: "POST",
            mode: "cors",
            headers:{"Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(obj)
        }).then((data)=>{
            response = data.json();
        })
        response = await response;
        if(response.status){
            document.getElementById('form').classList.add('d-none');
            document.getElementById('emailcheck').classList.remove('d-none');
            document.getElementById('activation_link').classList.remove('d-none');
            document.getElementById('activation_link').href = `http://127.0.0.1:5500/public/html/user_activation.html?user_id:${response.result.insertId}&activation_id:${response.activation_link}`
        }else{
            var span = document.createElement('span');
            span.className = "text-danger";
            span.innerHTML = `<i class="bi bi-exclamation-circle mx-2"></i>` + response.error;
            document.getElementById('form').appendChild(span);
        }
}
  document.getElementById('registerBtn').addEventListener('click', event =>{
    document.querySelectorAll('span').forEach((elm)=> {elm.remove()});
    var errorArr = ["This is required field!!", "This is required field!!", "Please enter valid email!!"];
    var isFormValidate = false;
    document.querySelectorAll('.form-control').forEach((elm, i)=>{
        if(elm.value === null || elm.value.trim() === "" || (elm.classList.contains('isEmail') && isEmail(elm.value))){
            var span = document.createElement('span');
            span.className = "text-danger";
            span.innerHTML = `<i class="bi bi-exclamation-circle mx-2"></i>` + errorArr[i];
            elm.parentElement.appendChild(span);
            isFormValidate = false;
        }else{
            isFormValidate =  true;
        }
    })
if(document.querySelectorAll('span').length == 0 && isFormValidate){    
        var userRegistrationObject = {};
        document.querySelectorAll('.form-control').forEach((elm)=>{
            userRegistrationObject[elm.id] =  elm.value;
        })
        registerUser(userRegistrationObject);
    }
})
