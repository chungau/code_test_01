//=====================================================================================================
//email
//=====================================================================================================
/*
https://www.npmjs.com/package/nodemailer
https://www.w3schools.com/nodejs/nodejs_email.asp
https://chunkbytes.com/2019/01/send-emails-with-nodemailer/
*/
var nodemailer = require('nodemailer');
var generl_function = require('./general.js');

//some config stuff =============
var email_address_to_be_alerted =  "auchung3000@gmail.com";


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testing2020chung@gmail.com',
    pass: 'aabbcc1122'
  }
});

function send_email(to_email, subject_text, content_text){
	var mailOptions = {
		from: 'testing2020chung@gmail.com',
		to: to_email,
		subject: subject_text,
		text: content_text
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log("failed to send email");
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}

function send_alert_email(to_email, err){
	error_content = generl_function.Now_String() + "\n" + err.code + ":" + err.message + "\n" + err.stack;
	send_email(to_email, "error occur in server", error_content);
}

//this is kind of public method
module.exports = {
	send_email : function(to_email, subject_text, content_text) {

		send_email(to_email, subject_text, content_text)
	},
	send_alert_email: function(to_email, err){
		send_alert_email(to_email, err)
	},
	send_alert_email_with_default_email : function (err){
		send_alert_email(email_address_to_be_alerted, err)
	}
}
