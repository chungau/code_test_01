//reference : https://mongoosejs.com/docs/queries.html
var ftp_operation_model = require('./app/models/ftp_operation.js');



module.exports = {

	insert_new_ftp_operation_record: function (date, operation_type, operation_status, operation_description) {
	    var ftp_operation_record = new ftp_operation_model();
	    ftp_operation_record.date = date;
	    ftp_operation_record.operation_type = operation_type;
	    ftp_operation_record.operation_status = operation_status;
	    ftp_operation_record.operation_description = operation_description;
	    
	    ftp_operation_record.save(function(err) {
	    console.log("insert new ftp operation record");
	      if (err){
	        console.log(err)
	      }
	   	});
	}

};