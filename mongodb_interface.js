var express = require('./node_modules/express/lib/express');
var mongoose = require('./node_modules/mongoose');
var router = express.Router();
var email_wrapper = require('./email_wrapper.js');


/*
reference :
https://mongoosejs.com/docs/
*/

var mongoose = require('mongoose');
console.log('mongodb://localhost/test');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});


var db = mongoose.connection;
db.on('error', function(err){
  console.error.bind(console, 'connection error:');
  email_wrapper.send_alert_email_with_default_email(err);
});
db.once('open', function() {
  // we're connected!
  console.log("connected mongodb without problems");
});

// config files
// var db = require('./db');
// console.log("connecting--",db);
// mongoose.connect(db.url); //Mongoose connection created
var ftp_operation_model = require('./app/models/ftp_operation.js');

//https://mongoosejs.com/docs/api.html#model_Model.findById
router.get("/ftp_operation/id/:id", (request, response) => {
    ftp_operation_model.findById( request.params.id, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


router.get("/ftp_operation/operation_type/:cvalue", (request, response) => {
    ftp_operation_model.findOne( { operation_type : request.params.cvalue } , (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

router.get("/ftp_operation/operation_status/:cvalue", (request, response) => {
    ftp_operation_model.findOne( { operation_status : request.params.cvalue } , (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

router.get("/ftp_operation/operation_description/:cvalue", (request, response) => {
    ftp_operation_model.findOne( { operation_description : request.params.cvalue } , (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

router.get('/ftp_operation', function(req, res) {
  // console.log('someone come to /api/ftp_operation');
   // use mongoose to get all students in the database
   ftp_operation_model.find(function(err, ftp_operation) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
         res.send(err);
      res.json(ftp_operation); // return all students in JSON format
   });
});

// router.get('/ftp_operation/:limit', function(req, res) {
//   // console.log('someone come to /api/ftp_operation');
//    // use mongoose to get all students in the database
//    ftp_operation_model.find(null, null, {batchSize :  request.params.limit}, function(err, ftp_operation) {
//       // if there is an error retrieving, send the error.
//       // nothing after res.send(err) will execute
//       if (err)
//          res.send(err);
//       res.json(ftp_operation); // return all students in JSON format
//    });
// });




// router.post('/ftp_operation_model/send', function (req, res) {
// 	console.log('someone come to /api/ftp_operation_model/send');
//   insert_new_ftp_operation_record(date, operation_type, operation_description)
// 	// console.log(req)
// 	// console.log(req.body)
//  //   var student = new Student(); // create a new instance of the student model


//  //   student.name = req.body.name; // set the student name (comes from the request)
//  //   student.save(function(err) {
//  //      if (err)
//  //         res.send(err);
//  //         res.json({ message: 'student created!' });
//  //   });
// });

//export this router to use in our index.js
module.exports = router;