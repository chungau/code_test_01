//=====================================================================================================
//ftp file
//=====================================================================================================
/*
reference : 
https://www.npmjs.com/package/ftp
https://peihsinsu.gitbooks.io/node-js-500-samples/content/mdfiles/ftp.html
https://www.example-code.com/nodejs/ftp.asp

test server
https://dlptest.com/ftp-test/

refer to https://www.npmjs.com/package/ftp
// greeting(< string >msg) - Emitted after connection. msg is the text the server sent upon connection.
// ready() - Emitted when connection and authentication were sucessful.
// close(< boolean >hadErr) - Emitted when the connection has fully closed.
// end() - Emitted when the connection has ended.
// error(< Error >err) - Emitted when an error occurs. In case of protocol-level errors, err contains a 'code' property that references the related 3-digit FTP response code.
*/
var generl_function = require('./general.js');
var mongodb_function = require('./mongodb_function.js');
var Client = require('ftp');

function send_file_to_ftp_server_and_disconnect(ftp_client, source_filepath, destination_filename){
    // var destination_filename = "test_chung_file" + "_" + generl_function.Now_String_without_special_character() + ".txt";
    ftp_client.put(source_filepath, destination_filename, function(err) {
      if (err) {
        console.log("cannot sent file: " + destination_filename);
        mongodb_function.insert_new_ftp_operation_record( Date.now(), "put", "error" , err.message);
        throw err;
      };
      mongodb_function.insert_new_ftp_operation_record( Date.now(), "put", "completion", "sent file: " + destination_filename);
      // console.log("sent file: " + destination_filename);
      ftp_client.end();
      console.log("disconnect ftp server" + generl_function.Now_String());
    });
}

function add_listener_to_error_occur_in_ftp_connection(ftp_client){
    ftp_client.on('error', function(err){
      mongodb_function.insert_new_ftp_operation_record( Date.now(), "any", "error", err.message);
      generl_function.pretty_print_err(err);
    });
}

function add_listener_to_ready_status_once_connected_to_ftp(ftp_client){
    //reference : https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
    ftp_client.on('ready', function() {
      mongodb_function.insert_new_ftp_operation_record( Date.now(), "connection", "ready", "connection and authentication were sucessful");
      console.log("connected the ftp " + generl_function.Now_String());
      var destination_filename = "test_chung_file" + "_" + generl_function.Now_String_without_special_character() + ".txt";
      send_file_to_ftp_server_and_disconnect(ftp_client, './file_to_be_sent/test_chung_file.txt', destination_filename);
    });
}

function add_listener_to_other_status(ftp_client){
    //reference : https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
    ftp_client.on('greeting', function(msg) {
      mongodb_function.insert_new_ftp_operation_record( Date.now(), "connection", 'greeting', "connection has sucessful");
    });
    ftp_client.on('close', function(msg) {
      mongodb_function.insert_new_ftp_operation_record( Date.now(), "connection", 'close', "connection has fully closed");
    });
    ftp_client.on('end', function(msg) {
      mongodb_function.insert_new_ftp_operation_record( Date.now(), "connection", 'end', "connection has ended");
    });
}


module.exports = {
  connect_and_send_file: function () {
    var c = new Client();
    // var connectionProperties = {host: "ftp.dlptest.com", user:"dlpuser@dlptest.com", password: "SzMf7rTE4pCrf9dV286GuNe4N"};
    var connectionProperties = {host: "ftp.dlptest.com", user:"dlpuser@dlptest.com", password: "SzMf7rTE4pCrf9dV286GuNe4N"};

    add_listener_to_ready_status_once_connected_to_ftp(c);
    add_listener_to_error_occur_in_ftp_connection(c);
    add_listener_to_other_status(c);

    c.connect(connectionProperties);

    console.log("try to connect to ftp server!!")
    console.log(connectionProperties)

  }

}
