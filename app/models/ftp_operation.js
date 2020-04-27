// var mongoose = require('mongoose');
var mongoose = require('../../node_modules/mongoose');

/*
operation_type
	put
	connection
operation_status
	error
	compeletion
	greeting
	end
	close
	ready

operation_description
*/

// define our students model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('ftp_operation', {
   date: { type: Date, default: Date.now },
   operation_type : {type : String, default: ''},
   operation_status : {type : String, default: ''},
   operation_description : {type : String, default: ''}
});