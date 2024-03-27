const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const todo = require('./todo/BACKEND/router/routes');
const dynamic_table = require('./Dynamic Table Component/router/routes');
const delimiter_search = require('./delimiter search/router/routes');

const app = express();
app.set('view engine', 'ejs');
const path = require('path');

// console.log(path.join(__dirname+'/views/'));
app.set('views', path.join(__dirname+'/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.use(cors());
// console.log(todo);
// app.use('/', router);
app.use('/', todo);
app.use('/', delimiter_search);
app.use('/', dynamic_table);

app.listen(process.env.PORT, () =>{
    console.log(`server listning at http://localhost:${process.env.PORT}`);
})