// const validator = require('validator');

function generateSelectBox(name = "", selectLabel = '', optionKey = [], optionValue = [], multiple = false, style = '', parentStyle = '', classes ='', parentClasses ='') {
    var selectBoxStr = `<div class=${parentClasses} style=${parentStyle}><label>${selectLabel}</label><select class="form-select ${(classes !== '') ? ` ${classes}` : ''}" name="${name}" id="" ${(multiple) ? 'multiple' : ''} style='${style}'>`;
    for (let i = 0; i < optionValue.length; i++) {
        selectBoxStr += `<option value="${optionKey[i]}">${optionValue[i]}</option>`;
    }
    selectBoxStr += '</select></div>';
    return selectBoxStr;
}
// console.log(generateSelectBox('car', true, [1, 2, 3, 4], ['BMW', 'AUDI', 'MECLERAN', 'ALTO']));

function generateRadioGroup(radioName = '', radioLable = '', radioButtons = [], checked = '', style = '', parentStyle = '') {
    // var radioGroupStr = `<div style=${parentStyle}><label>${radioLable}</label>`;
    // for(let i = 0; i < radioButtons.length; i++){
    //     radioGroupStr += `<input type="radio" name="${radioName}" id="" ${(style !== '') ? `style=${style}`: ''} ${(checked == radioButtons[i] && checked != '') ? 'checked' :''}>
    //     <label for="">${radioButtons[i]}</label>`;
    // }
    // radioGroupStr += '</div>';


    var radioGroupStr = `<label>${radioLable}</label>`;
    for (let i = 0; i < radioButtons.length; i++) {
        radioGroupStr += `<div class="form-check"><input class="form-check-input ${(style !== '') ? ` ${style}` : ''}" type="radio" name="${radioName}" id="" ${(checked == radioButtons[i] && checked != '') ? 'checked' : ''}>
        <label class="form-check-label" for="flexCheckDefault">${radioButtons[i]}</label></div>`;
    }
    return radioGroupStr;
}
// console.log(generateRadioGroup('gender', ['Male', 'Female', 'Others'], 'Female'));

function generateCheckboxGroup(checkboxName = '', checkboxLable = '', checkboxs = [], checked = [], style = '', parentStyle = '') {
    // var checkboxGroupStr = `<div style=${parentStyle}><label>${checkboxLable}</label>`;
    // for(let i = 0; i < checkboxs.length; i++){
    //     checkboxGroupStr += `<input type="checkbox" name="${checkboxName}" id="" ${(style !== '') ? `style=${style}`: ''} ${(checked.includes(checkboxs[i]) && checked != '') ? 'checked' :''}>
    //     <label for="">${checkboxs[i]}</label>`;
    // }
    // checkboxGroupStr += '</div>';

    var checkboxGroupStr = `<label>${checkboxLable}</label>`;
    for (let i = 0; i < checkboxs.length; i++) {
        checkboxGroupStr += `<div class="form-check"><input class="form-check-input ${(style !== '') ? ` ${style}` : ''}" type="checkbox" name="${checkboxName}" id="" ${(checked.includes(checkboxs[i]) && checked != '') ? 'checked' :''}>
        <label class="form-check-label" for="flexCheckDefault">${checkboxs[i]}</label></div>`;
    }
    return checkboxGroupStr;
}
// console.log(generateCheckboxGroup('hobby[]', 'Hobbies',['Dancing', 'Playing', 'Singing', 'Outing'],['Singing', 'Outing']));

module.exports = { generateCheckboxGroup, generateRadioGroup, generateSelectBox };