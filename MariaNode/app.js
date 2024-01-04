const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const fs = require('fs')


main();
//global setting


const mariadbConn = require(__dirname+'/dataaccess/mariadbConn');
//database connection
app.use('/',express.static(__dirname+'/public'));
//html,css,js file read
app.set('views', __dirname + '/views');
//view page

app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
//ejs setting

const server = app.listen(3000, function(){
    console.log('web server started 3000 port');
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));


// main 함수
async function main() {
	// global 변수 셋팅
	set_app_global_var();
}

// 글로벌 변수 셋팅
function set_app_global_var() {
	global.__BASE = __dirname + "/";
	global.__LOGGER = require(__BASE + "config/logger");
}

var testRouter = require('./routes/testRouter')(app, fs);