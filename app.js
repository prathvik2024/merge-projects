const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const con = require('./config/dbConnection');
const todo = require('./todo/BACKEND/router/routes');
const dynamic_table = require('./Dynamic Table Component/router/routes');
const delimiter_search = require('./delimiter search/router/routes');
const combo_practice = require('./combo practice/router/routes');
const queryExecuter = require('./Dynamic Query Component/router/routes');
const filterSearching = require('./Filter Searching Project/router/routes');
const studentManagement = require('./Student Management/routes/routes');

const app = express();
app.set('view engine', 'ejs');
const path = require('path');

// console.log(path.join(__dirname+'/views/'));
app.set('views', path.join(__dirname+'/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.use(cors());
app.use('/', todo);
app.use('/', delimiter_search);
app.use('/', dynamic_table);
app.use('/', combo_practice);
app.use('/', queryExecuter);
app.use('/', filterSearching);
app.use('/', studentManagement);

app.listen(process.env.PORT, () =>{
    console.log(`server listning at http://localhost:${process.env.PORT}`);
})