var myCrudApp = angular.module('signupapp', []).controller('SignupController', function ($scope, $window) {

    var db = new PouchDB('products');

    $scope.jumptosignin = function () {
        $window.location.href = '/signin/signin.html';
    }

    $scope.saveCredentials = function () {


        if ($scope.signupObj) {
            if ($scope.signupObj._id == null) {
                if ($scope.signupObj.hasOwnProperty("username") && $scope.signupObj.hasOwnProperty("password")) {
                    if ($scope.signupObj.username !== "" && $scope.signupObj.password !== "") {

                        var id = Math.random().toString(36).substr(2, 9);
                        $scope.signupObj._id = id;
                        $scope.signupObj.key = "signup"
                        //Inserting Document
                        db.put($scope.signupObj, function (err, response) {

                            if (err) {
                                alert("Error occurred");
                                return console.log(err);
                            } else {
                                $window.location.href = '/signin/signin.html';
                                alert("Credentials Saved!!");
                            }
                        });
                    }
                } else {
                    alert("Please fill all details!")
                }

            }
        } else {
            alert("Please fill all details!")
        }
        delete $scope.signupObj
    }

});