const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const con = require('./config/dbConnection');

const router = require('./router/routes');

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

app.use('/', router);

app.listen(process.env.PORT, () =>{
    console.log(`server listning at http://localhost:${process.env.PORT}`);
})