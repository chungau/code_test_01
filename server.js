/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/*
reference:
https://www.tutorialspoint.com/meanjs/meanjs_building_static_route_node_express.htm

once respond, then all ended

node schedule
in-process scheduling : its means the scheduled jobs will only fire as long as your script is running

*/


//=====================================================================================================
//import exeternal stuff
//=====================================================================================================
var generl_function = require('./general.js');
var email_wrapper = require('./email_wrapper.js');
var express = require('./node_modules/express/lib/express');

//=====================================================================================================
//Web API 
//=====================================================================================================
'use strict';
module.exports = express;
// var mongoose = require('./node_modules/mongoose');


// modules =================================================
// const express = require('express');
const app = module.exports();
const path = require('path');
// const app = require('./node_modules/express/lib/express');
// set our port
const port = 3000;

//middleware body parser
//it need to handle the post record
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })) //To parse URL encoded data
app.use(bodyParser.json()) //To parse json data

//=====================================================================================================
//web frontent
//=====================================================================================================
app.get('/',function(req,res) {
	res.sendFile(__dirname + '/app/index.html');
});

app.get("/angular.js", function(req, res){
  res.sendFile( path.join(__dirname, "./node_modules/angular/angular.js"));
}); 

app.get("/index.js", function(req, res){
  res.sendFile(path.join(__dirname, '/app/index.js'));
}); 


//=====================================================================================================
//Restful API to call
//=====================================================================================================
// var express_mongodb_sample = require('./express_mongodb_sample.js');
// app.use('/api', express_mongodb_sample);
var db = require('./mongodb_interface.js');
app.use('/db_api', db);


// startup our app at http://localhost:3000

app.listen(port, function () { 
	console.log(`Example app listening on port ${port}!`);
	console.log("end of listening function " + generl_function.Now_String());
});

//=====================================================================================================
//schedule send file to ftp test server at 5:00 every monday to sunday
//=====================================================================================================
//reference: https://www.npmjs.com/package/node-schedule
//this is designed for in process schedule
var schedule = require('./node_modules/node-schedule');
var j = schedule.scheduleJob({hour: 17, minute: 0, dayOfWeek: [new schedule.Range(1, 5)]}, function(){
  // console.log('hi job schedule ' +  Now_String());
  	var ftp_wrapper = require('./ftp_wrapper.js');
	ftp_wrapper.connect_and_send_file();
});

//=====================================================================================================
//send email if any kind of error
//=====================================================================================================
/*reference :
https://nodejs.org/api/errors.html#errors_class_error
https://blog.heroku.com/best-practices-nodejs-errors
*/
process.on('uncaughtException', (err, origin) => {
	email_wrapper.send_alert_email_with_default_email(err);
});
