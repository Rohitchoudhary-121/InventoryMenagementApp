var myCrudApp = angular.module('signinapp', []).controller('SigninController', function ($scope, $window) {

    var db = new PouchDB('products');

    $scope.credentials = [];

    var init = function () {

        db.allDocs({
            include_docs: true
        }).then(function (result) {
            $scope.$apply(function () {
                $scope.credentials = result.rows.filter(function (row) {
                    if (row.doc.key == "signup") {
                        return row.doc;
                    }
                });
                $scope.credentials = $scope.credentials.map(function (row) { return row.doc });
            });

            console.log("List==>", $scope.credentials);
        }).catch(function (err) {
            console.log(err);
        });
    };
    init();

    $scope.jumptosignup = function () {
        $window.location.href = '/signup/signup.html';
    }


    $scope.login = function () {

        if ($scope.loginObj) {
            if ($scope.loginObj._id == null) {
                if ($scope.loginObj.hasOwnProperty("username") && $scope.loginObj.hasOwnProperty("password")) {
                    if ($scope.loginObj.username !== "" && $scope.loginObj.password !== "") {
                        if ($scope.credentials && $scope.credentials.length === 0) {
                            alert("Pleae SignUp First!!")
                            $window.location.href = '/signup/signup.html';
                        }

                        var credData = $scope.credentials.filter(function (row) {
                            if (row.username === $scope.loginObj.username && row.password === $scope.loginObj.password) {
                                localStorage.setItem("user", row.username);
                                return row;
                            }
                        })

                        if (credData && credData.length > 0) {
                            alert("LogIn Successfull!")
                            $window.location.href = '/home.html';
                            return
                        } else {
                            alert("Wrong Credentials!!");
                        }

                    }
                } else {
                    alert("Please Enter Credentials!!");
                }

            }
        }
        delete $scope.loginObj
    }

});