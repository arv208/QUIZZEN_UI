theApp.controller('logInCtrlr', function($scope,$http){
	$scope.logIn = function(){
		//parse the data as json
		var sendData = JSON.stringify({"sent_username" : $scope.angUsername , "sent_password" : $scope.angPassword});
		var link = "http://localhost/xampp/restAPI/api/Hosts/login_hosts.php";
		//post function provided by $http
		$http.post(link,sendData).then(function(response){
			if(response.data.message == "Host Login Success."){
				alert("GAGANA BA");
			}else{
				$scope.reply = response.data;
			}
		}).catch(function(response) {
		  alert("Error:" + response.status + " " + response);
		});

	}
});

