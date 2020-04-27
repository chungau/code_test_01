The original requirement:

"""
Create a dummy text file, the context doesn’t matter.

Write a software with the following features. You can use any technology which you are familiar with.

A backend server will FTP the file to the FTP server at 5:00 PM every Monday to Friday. You can use a free FTP server for this test purpose, e.g. https://dlptest.com/ftp-test/

Send an alert email if there is any kind of failure.

The backend server will provide web API so that a front end webpage (dashboard) can query the status of FTP operation.

Prepare a dashboard that can show the history of the status of FTP operations.
"""

//=====================================================================================================================

Since its code test and i would like to explain what i have did and some assumption on it step by step.

My technical Spec:
  Mongodb
  Express.js
  Angular.js
  Node.js
  
 Assumption on this code test
 1. i assume that the cocurrent peak user is not high (below 20)
 2. i assume that the security requirement is not high
 3. The purpose of this project is to better understand each other.
 4. since it store ftp operation record, i assume that no delete, update operation to database, but insert and query or read only
 
 //=====================================================================================================================
 
 About the project structure:
 app
    index.html    :    frontend static file using angular.js
    index.js      :    the frontend controller using angular.js
    models
        ftp_operation.js   :   its data model and define the schema of database
 email_wrapper.js  :   its the file that wrap the ftp related function or script
 file_to_be_sent
      test_chung_file.txt   :   this is the demo_file to be sent to the FTP server 5:00pm every working days
 ftp_wrapper.js   :   its the file that wrap the ftp related function or script
 general.js   :   some general functions are called everywhere
 mongodb_function.js    :   this is some function related to Mongodb (insert or other operation)
 mongodb_interface.js   :   this is the Restful API related to Database Mongodb (query)
 node_modules  :  this is package management folder, (use npm to install the module)
    ...
 server.js  :   this is the main server file that run by node.js (can run by command "forever start server.js")
 
 //=====================================================================================================================
 
 About what i have done:
 1. the server send the demo_file"test_chung_file.txt" to the FTP server "https://dlptest.com/ftp-test/" at 5:00 PM every Monday to Friday
    Feel free to have a look at files
      "server.js", "ftp_wrapper.js"
 2. it will send an alert email if there is any kind of failure.
     and i try to cover all failure based on my assumption on the use case of this project
     For all uncaughtException, i will send email to my current email address
     "server.js", "email_wrapper.js"
 3. the database will store all ftp operation record inculde the connection status and send operation
      server.js", "ftp_wrapper.js", "mongodb_function.js "
 4. it provide a simple Web API for query.
    "server.js", "mongodb_interface.js"
 5. A simplest dashboard that display the history of the status of FTP operations.
    "server.js", "index.html", "index.js"
  
//=====================================================================================================================

Guide to install
1. need to install node.js and npm 
https://nodejs.org/en/
2. need to install monogdb
https://www.mongodb.com/
3. run "npm install"
so it will install all modules listed as dependencies in "package.json"
4. install forever
https://www.npmjs.com/package/forever

Guide to run
1. run "forever start server.js"



