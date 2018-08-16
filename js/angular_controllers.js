theApp.controller('logInCtrlr', function($scope,$http){
	$scope.logIn = function(){
		//parse the data as json
		 sendData = JSON.stringify({"sent_username" : $scope.angUsername , "sent_password" : $scope.angPassword});
		 link = "http://localhost/xampp/restAPI/api/Hosts/login_hosts.php";
		//post function provided by $http
		$http.post(link,sendData).then(function(response){
			if(response.data.message == "Host Login Success."){
				alert("Dito yung function na mag dadala sayo sa home at gagawa ng session");
			}else{
				$scope.reply = response.data;
			}
		}).catch(function(response) {
		  	console.log(response);
		});

	};
});

theApp.controller('registerCtrlr', function($scope,$http){
	$scope.signUp = function(){
		sendData = JSON.stringify({"fname" : $scope.firstname , "mname" : $scope.middlename , "lname" : $scope.lastname  , "password" : $scope.password1 ,  "username" : $scope.username ,  "confirm_pw" : $scope.password2 });

		link = "http://localhost/xampp/restAPI/api/Hosts/register_hosts.php";

		$http.post(link,sendData).then(function(response){
			if(response.data.message == "Host Registration Success."){
				alert("Dito yung function na mag dadala sayo sa home at gagawa ng session");
			}else{
				$scope.reply = response.data;
			}
		}).catch(function(response){
			console.log(response);
		});
	};

	$scope.checkFields = function(){
		if($scope.middlename == null || $scope.firstname == null || $scope.lastname == null || $scope.username == null || $scope.password1 == null || $scope.password2 == null)
			return true
		else
			return false
	};
});