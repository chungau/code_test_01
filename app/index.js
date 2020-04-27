angular.module("App",['main']);

angular.module("main",[]);

 angular.module("main").controller("mainController",function($scope, $http){
    // Controller body
    $scope.message = "helllo 2";

   $http.get('/db_api/ftp_operation')
  	.then(function(response) {
    	$scope.message = response.data[0]["operation_type"];
    	$scope.ftp_records = response.data;
  	});
});
