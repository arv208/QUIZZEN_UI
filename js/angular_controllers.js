theApp.controller('logInCtrlr', function($scope,$http){
	$scope.logIn = function(){
		//parse the data as json
		 sendData = JSON.stringify({"sent_username" : $scope.angUsername , "sent_password" : $scope.angPassword});
		 link = "http://localhost/restAPI/api/Hosts/login_hosts.php";
		//post function provided by $http
		$http.post(link,sendData).then(function(response){
			if(response.data.success){
				alert("yes!");
			}else{
				$scope.error = response.data;
			}
		}).catch(function(response) {
		  	console.log(response);
		});

	};
});

theApp.controller('registerCtrlr', function($scope,$http){
	$scope.signUp = function(){
		sendData = JSON.stringify({"fname" : $scope.firstname , "mname" : $scope.middlename , "lname" : $scope.lastname  , "password" : $scope.password1 ,  "username" : $scope.username ,  "confirm_pw" : $scope.password2 });

		link = "http://localhost/restAPI/api/Hosts/register_hosts.php";

		$http.post(link,sendData).then(function(response){
			if(response.data.success){
				alert("yes!");
			}else{
				$scope.error = response.data;
			}
		}).catch(function(response){
			console.log(response);
		});
	};

});


theApp.controller('addSectionCtrlr',function($scope,$http){

	//get courses
	getLink = 'http://localhost/restAPI/api/Hosts/list_courses.php'
	$http.get(getLink).then(function(response){
		$scope.reply = response.data.courses;
	}).catch(function(response){
		console.log(response);
	});

	//post data
	$scope.addSection = function(){
		sendData = JSON.stringify({"course" : $scope.courseId , "section" : $scope.section});
		link = 'http://localhost/restAPI/api/Hosts/Sections/add_section.php'
		$http.post(link,sendData).then(function(response){
			if(response.data.message =="Section successfully added."){
				alert("boom nag post ano na next ");
			}else{
				$scope.error = response.data;
			}
		}).catch(function(response){
			console.log(response);
		});

	}
});

theApp.controller('addStudentCtrlr',  function($scope,$http){

	//GET COURSES  AND SECTIONS
	getLink = 'http://localhost/restAPI/api/Hosts/list_courses.php'
	$http.get(getLink).then(function(response){
		$scope.replyCourses = response.data.courses;
		$scope.replySections = response.data.sections;
	}).catch(function(response){
		console.log(response);
	});
	
	//POST DATA
	$scope.addStudent = function(){
		postLink = "http://localhost/restAPI/api/Hosts/manageStudent/upload_student.php";
		sendData = JSON.stringify({"student_id" : $scope.studid , "section_id" : $scope.sectionId , "course_id" : $scope.courseId  , "fname" : $scope.fname ,  "mname" : $scope.mname ,  "lname" : $scope.lname });

		$http.post(postLink,sendData).then(function(response){
			alert("success");
		}).catch(function(response){
			console.log(response);
		});
	}

});