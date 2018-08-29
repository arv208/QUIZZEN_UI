var theApp = angular.module('theApp',['ngRoute']);

theApp.config(['$routeProvider', function($routeProvider) {
    
	$routeProvider
		.when('/home' , {
			resolve:{
				"check": function ($location,sessionService){
					if(sessionService.get('user_id')){
						$location.path('/myquizzen');
					}
				}
			},
			templateUrl: 'login.html',
            controller: 'logInCtrlr'
		})
        .when('/myquizzen' , {
        	resolve:{
				"check": function ($location,sessionService){
					if(!sessionService.get('user_id')){
						$location.path('/home');
					}
				}
			},
			templateUrl: 'howm.html',
            controller: 'viewQuizzesCtrlr'
		})
        .when('/signup', {
        	resolve:{
				"check": function ($location,sessionService){
					if(sessionService.get('user_id')){
						$location.path('/myquizzen');
					}
				}
			},
            templateUrl: 'signup.html',
            controller: 'registerCtrlr'
        })
        
        .otherwise({
			redirectTo: '/home'
		})
}]);


theApp.controller('logInCtrlr', function($scope,$http,sessionService){
	$scope.logIn = function(){
		//parse the data as json
		 sendData = JSON.stringify({"sent_username" : $scope.angUsername , "sent_password" : $scope.angPassword});

		 link = "/restAPI/api/Hosts/login_hosts.php";
		//post function provided by $http

		$http.post(link,sendData).then(function(response){
			if(response.data.success){
				sessionService.set('user_id',response.data.session); 
                window.location = "#!/myquizzen";
			}else{
				$scope.error = response.data;
			}
		}).catch(function(response) {
		  	console.log(response);
		});

	};
});

theApp.controller('registerCtrlr', function($scope,$http,$location){
	$scope.signUp = function(){
		sendData = JSON.stringify({"fname" : $scope.firstname , "mname" : $scope.middlename , "lname" : $scope.lastname  , "password" : $scope.password1 ,  "username" : $scope.username ,  "confirm_pw" : $scope.password2 });

		link = "/restAPI/api/Hosts/register_hosts.php";

		$http.post(link,sendData).then(function(response){
			if(response.data.success){
				alert("yes!");
				$location.path('/login');
			}else{
				$scope.error = response.data;
			}
		}).catch(function(response){
			console.log(response);
		});
	};

});

theApp.controller('addSectionCtrlr',function($scope,$http){

	$scope.courseId= "1";
	//get courses
	getLink = '/restAPI/api/Hosts/list_courses.php';
	$http.get(getLink).then(function(response){
		$scope.reply = response.data.courses;
	}).catch(function(response){
		console.log(response);
	});


	//post data
	$scope.addSection = function(){
		sendData = JSON.stringify({"course" : $scope.courseId , "section" : $scope.section});
		link = '/restAPI/api/Hosts/Sections/add_section.php'
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
	getLink = '/restAPI/api/Hosts/list_courses.php'

	$http.get(getLink).then(function(response){
		$scope.replySections = response.data.sections;
		$scope.replyCourses = response.data.courses;
		
	}).catch(function(response){
		console.log(response);
	});
	
	//POST DATA
	$scope.addStudent = function(){
		postLink = "/restAPI/api/Hosts/manageStudent/upload_student.php";
		sendData = JSON.stringify({"student_id" : $scope.studid , "section_id" : $scope.sectionId , "course_id" : $scope.courseId  , "fname" : $scope.fname ,  "mname" : $scope.mname ,  "lname" : $scope.lname });

		$http.post(postLink,sendData).then(function(response){
			if(response.data.success){
				alert("yipeeeee");
			}else{
				$scope.error = response.data;			
			}
		}).catch(function(response){
			console.log(response);
		});
	}

});

theApp.controller('listCtrlr', function($scope,$http){

	getLink = '/restAPI/api/Hosts/list_courses.php';

	$http.get(getLink).then(function(response){
		$scope.students = response.data.names.students;
	}).catch(function(response){
		console.log(response);
	});

});

theApp.controller('listSecCtrlr', function($scope,$http){
    //GETTING SECTIONS ONLY TO REST
	getLink = '/restAPI/api/Hosts/list_courses.php';
  $http.get(getLink).then(function(response){
    $scope.sections = response.data.sections;
  }).catch(function(response){
    console.log(response);
  });
});
  


theApp.controller('viewQuizzesCtrlr', function($scope, $http , sessionService , $location){
   getLink = "http://localhost/restAPI/api/quizzes/read_quiz.php?admin_id="+ sessionService.get('user_id');; 
   $http.get(getLink).then(function(response){
//    $scope.titles = response.data;
       console.log(response.data);
      $scope.quizInfo = response.data;
  }).catch(function(response){
    console.log(response);
  });    


  $scope.signOut = function(){
  	sessionService.destroy('user_id');
  	$location.path('/home');
  }

});

});