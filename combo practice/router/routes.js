const app = require('express');
const router = app.Router();
const getComboBoxes = require('../controllers/comboController');
const {generateCheckboxGroup, generateRadioGroup, generateSelectBox} = require('../helper/comboBoxGenerate');

router.all('/combo', async (req, res) => {
    var components = ['ComboBox', 'Radio', 'CheckBox'];
    var output = '';
    var arr = [];
    var selects = await getComboBoxes('select unique_name from select_master;', 'job_application');
    if(typeof req.body.type !== 'undefined' && typeof req.body.field !== 'undefined'){
        var result = await getComboBoxes(`select option_value from select_master, option_master where id = sid and unique_name = '${req.body.field}'`, 'job_application');
        console.log(result.result.data);
        result.result.data.forEach((val) =>{
            arr.push(val[result.result.colsName[0]]);
        });
        if(req.body.type == 'ComboBox'){
            output = generateSelectBox(req.body.field, req.body.field, arr, arr, false, '', 'col-md-2');
        }else if(req.body.type == 'Radio'){
            output = generateRadioGroup(req.body.field, req.body.field, arr);
        }else if(req.body.type == 'CheckBox'){
            output = generateCheckboxGroup(req.body.field, req.body.field, arr);
        }
        console.log(output);
        res.render('combo practice/dynamiccombobox', { components, result: selects.result, output});
    }else{
        res.render('combo practice/dynamiccombobox', { components, result: selects.result });
    }
});

module.exports = router;