function Now_String(){
    //reference : https://tecadmin.net/get-current-date-time-javascript/
    var now_time = new Date();
    return now_time.getFullYear() + '-'+(now_time.getMonth()+1) + '-' + now_time.getDate() + " " +
      now_time.getHours() + ":" + now_time.getMinutes() + ":" + now_time.getSeconds();
}

module.exports = {
  //=====================================================================================================
//general function 
//=====================================================================================================
  Now_String : function() {
    return Now_String();
  },

  Now_String_without_special_character: function () {
    //reference : https://tecadmin.net/get-current-date-time-javascript/
    var now_time = new Date();
    return now_time.getFullYear() + '_'+(now_time.getMonth()+1) + '_' + now_time.getDate() + "_" +
      now_time.getHours() + "_" + now_time.getMinutes() + "_" + now_time.getSeconds();
  },

  pretty_print_err: function (err){
      console.log("\n" + Now_String() + " error: "+ err);
      console.log(err.code + ":"+ err.message);
      console.log(err.stack);
  }

}