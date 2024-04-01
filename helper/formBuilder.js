export const formBuilder = {
    // console.log(formBuilder.make({control:"input",type:"text", class:"form-control"}));
    // console.log(formBuilder.make({control:"input",type:"text", class:"form-control", inputLabel:"FirstName", labelClasses:"text-success", parentClasses:"col-2", value:"Hello"}));

    inputBox: function (formObj) {
        var parentClasses = formObj.parentClasses;
        delete formObj['parentClasses'];
        var error = formObj.error;
        delete formObj['error'];
        var str = `<div class="form-group ${(typeof parentClasses !== 'undefined' ? parentClasses : '')}"> ${(typeof formObj.inputLabel !== 'undefined') ? `<label for="" class="form-label ${(typeof formObj.labelClasses !== 'undefined' ? formObj.labelClasses : '')}">${formObj.inputLabel}</label>` : '' }<input `;
        delete formObj['inputLabel'];
        Object.entries(formObj).forEach(([key, value]) => {
            str +=  `${key}="${value}"`;
        });
        str += `></div>`;
        return str;
    },
// console.log(formBuilder.make({control:"textarea" ,parentClasses:"col-2", class:"form-control", id:"", name:"", placeholder:"Enter Address..", style:"", inputLabel : "FirstName", value:"Limbdi"}));
// console.log(formBuilder.make({control:"textarea" ,parentClasses:"col-2", class:"form-control", inputLabel : "FirstName", value:"Limbdi"}));
    textarea: function (formObj) {
        var parentClasses = formObj.parentClasses;
        delete formObj['parentClasses'];
        var str = `<div class="form-group ${(typeof parentClasses !== 'undefined' ? parentClasses : '')}"> ${(typeof formObj.inputLabel !== 'undefined') ? `<label for="" class="form-label ${(typeof formObj.labelClasses !== 'undefined' ? formObj.labelClasses : '')}">${formObj.inputLabel}</label>` : '' }<textarea `;
        delete formObj['inputLabel'];
        Object.entries(formObj).forEach(([key, value]) => {
            str += ` ${key}="${value}"`;
        });
        str += `>${typeof formObj.value !== 'undefined' ? formObj.value : ''}</textarea></div>`;
        return str;
    },
    // console.log(formBuilder.make({control:"combobox",parentClasses:"col-2", options: {1:"BCA", 2:"MCA", 3:"BTECH"}}));
    // console.log(formBuilder.make({control:"combobox",parentClasses:"col-2", options: {1:"BCA", 2:"MCA", 3:"BTECH"}, style: "", id:"", class:"rounded-5", labelClasses: "text-primary", inputLabel:"Courses"}));
    // console.log(formBuilder.make({control:"combobox",parentClasses:"col-2", options: {1:"BCA", 2:"MCA", 3:"BTECH"}, style: "", id:"", class:"rounded-5", labelClasses: "text-primary", inputLabel:"Courses", selectedKey:2}));

    comboBox: function (formObj) {
        var parentClasses = formObj.parentClasses;
        delete formObj['parentClasses'];
        var str = `<div class="form-group ${(typeof parentClasses !== 'undefined' ? parentClasses : '')}"> ${(typeof formObj.inputLabel !== 'undefined') ? `<label for="" class="form-label ${(typeof formObj.labelClasses !== 'undefined' ? formObj.labelClasses : '')}">${formObj.inputLabel}</label>` : '' }<select class="form-select ${(typeof formObj.class !== 'undefined' ? formObj.class : '')}" id=" ${(typeof formObj.id !== 'undefined' ? formObj.id : '')}" name=" ${(typeof formObj.name !== 'undefined' ? formObj.name : '')}">`;
        (typeof formObj.options !== 'undefined') ? Object.entries(formObj.options).forEach(([key, value]) => {
            str += `<option value="${key}"`;
            if(typeof formObj.selectedKey !== 'undefined' && formObj.selectedKey.toString() === key){str += " selected "}
            str += `>${value}</option>`;
        }) : '';
        str += "</select></div>";
        return str;
    },
    // { control: "input", type: 'radio',buttons: {names: [], ids:[], values:[], checked:[]}, parentClasses: "", class: "", id: "", name: "", placeholder: "", style: ""}
    // console.log(formBuilder.make({ control: "input", type: 'radio',name: "gender",buttons: {ids:["male", "female", "othres"], values:["Male", "Female", "Others"], checked:["Male"]}, parentClasses: "form-check-inline", inputLabel: "Gender"}));
    // console.log(formBuilder.make({ control: "input", type: 'checkbox',buttons: {ids:["male", "female", "othres"], values:["Male", "Female", "Others"], checked:['Others', "Male"]}, parentClasses: "form-check-inline", inputLabel:"Gebnder"}));

    checkAndRadio : function (formObj){
        var parentClasses = formObj.parentClasses;
        delete formObj['parentClasses'];
        var str = "";
        (typeof formObj.buttons !== 'undefined') ? formObj.buttons.values.forEach((value, i)=>{
            str += `<div class="form-check ${(typeof parentClasses !== 'undefined' ? parentClasses : '')}"><input type="${formObj.type}" class="form-check-input ${(typeof formObj.class !== 'undefined' ? formObj.class : '')}" id=" ${(typeof formObj.buttons.ids[i] !== 'undefined' ? formObj.buttons.ids[i] : '')}" name=" ${(typeof formObj.name !== 'undefined' ? formObj.name : '')}"`;
            if(formObj.type === "radio" && typeof formObj.buttons.checked !== 'undefined' && formObj.buttons.checked.includes(value)){
                str += " checked ";
            }else if(formObj.type === "checkbox" && typeof formObj.buttons.checked !== 'undefined' && formObj.buttons.checked.includes(value)){
                str += " checked ";
            }
            str += `><label class="form-check-label" for="">${value}</label></div>`;
        }) : '';
        return `${(typeof formObj.inputLabel !== 'undefined') ? `<div><label for="" class="form-label ${(typeof formObj.labelClasses !== 'undefined' ? formObj.labelClasses : '')}">${formObj.inputLabel}</label> ${str}` : str}`;
    },
    // { control: "input", type: `button`, parentClasses: "form-check-inline", class: "", id: "", name: "", placeholder: "", style: "", value:"Submit" }
    buttons : function (formObj){
        var parentClasses = formObj.parentClasses;
        delete formObj['parentClasses'];
        var str = `<div class="${(typeof parentClasses !== 'undefined' ? parentClasses : '')}"><input `;
        Object.entries(formObj).forEach(([key, value]) => {
            str +=` ${key}="${value}"`;
        });
        str += "></div>";
        return str;
    },
    inRow: function (formCols) {
        return `<div class='row'>${formCols}</div>`;
    },
    make: function (formObj) {
        var control = formObj.control;
        delete formObj['control'];
        if (control === "input") {
            if(formObj.type === "button" || formObj.type === "submit"){
                return this.buttons(formObj);
            }else if(formObj.type === "radio" || formObj.type === "checkbox"){
                return (typeof formObj.label !== "undefined") ? this.label(this.checkAndRadio(formObj), formObj.label) :this.checkAndRadio(formObj);
            }else{
                return (typeof formObj.label !== "undefined") ? this.label(this.inputBox(formObj), formObj.label) :this.inputBox(formObj);
            }
        } else if (control === "combobox") {
            return (typeof formObj.label !== "undefined") ? this.label(this.comboBox(formObj), formObj.label) :this.comboBox(formObj);
        } else if (control === "textarea") {
            return (typeof formObj.label !== "undefined") ? this.label(this.textarea(formObj), formObj.label) :this.textarea(formObj);
        } else {
            return { status: false, error: "Please provide require pramas!!" };
        }
    }
}

// textbox
// console.log(formBuilder.make({control:"input",type:"text", class:"form-control", inputLabel:"FirstName", labelClasses:"text-success", parentClasses:"col-2", value:"Hello"}));


// console.log(formBuilder.make({control:"textarea" ,parentClasses:"col-2", class:"form-control", inputLabel : "FirstName", value:"Limbdi"}));

// select Box
// console.log(formBuilder.make({control:"combobox",parentClasses:"col-2", options: {1:"BCA", 2:"MCA", 3:"BTECH"}, style: "", id:"", class:"rounded-5", labelClasses: "text-primary", inputLabel:"Courses", selectedKey:2}));



// console.log(formBuilder.make({control:"input",type:"submit" ,parentClasses:"btn btn-primary", class:"", id:"", name:"", placeholder:"", style:"", inputLabel : "FirstName"}));
// console.log(formBuilder.make({control:"input",type:"button" ,parentClasses:"btn btn-primary", class:"", id:"", name:"", placeholder:"", style:"", inputLabel : "FirstName"}));
// console.log(formBuilder.make({control: "text", }));


// console.log(formBuilder.make({ control: "input", type: 'radio',name: "gender",buttons: {ids:["male", "female", "othres"], values:["Male", "Female", "Others"], checked:["Male"]}, parentClasses: "form-check-inline", inputLabel: "Gender"}));

// console.log(formBuilder.make({ control: "input", type: 'radio',name: "gender1",buttons: {ids:["male", "female", "othres"], values:["Male", "Female", "Others"], checked:["Female"]}}));
// console.log(formBuilder.make({ control: "input", type: 'radio',name: "gender2",buttons: {ids:["male", "female", "othres"], values:["Male", "Female", "Others"], checked:[]}, parentClasses: "form-check-inline"}));
// console.log(formBuilder.make({ control: "input", type: 'radio',name: "gender3",buttons: {ids:["male", "female", "othres"], values:["Male", "Female", "Others"], checked:[]}, parentClasses: ""}));

// console.log(formBuilder.make({ control: "input", type: 'checkbox',buttons: {ids:["male", "female", "othres"], values:["Male", "Female", "Others"]}}));
// console.log(formBuilder.make({ control: "input", type: 'checkbox',buttons: {ids:["male", "female", "othres"], values:["Male", "Female", "Others"]}}));
// console.log(formBuilder.make({ control: "input", type: 'checkbox',buttons: {ids:["male", "female", "othres"], values:["Male", "Female", "Others"], checked:['Others', "Male"]}, parentClasses: "form-check-inline", inputLabel:"Gebnder"}));
// console.log(formBuilder.make({ control: "input", type: 'checkbox'}));

// console.log(formBuilder.make({ control: "input", type:"button", class:"btn btn-primary", value:"hero" ,parentClasses:"float-end"}));
// console.log(formBuilder.make({ control: "input", type:"submit", class:"btn btn-primary"}));