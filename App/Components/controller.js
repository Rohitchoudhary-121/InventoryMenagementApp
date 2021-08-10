var myCrudApp = angular.module('myApp', []).controller('HomeController', function ($scope, $window) {

    var db = new PouchDB('products');
    $scope.products = [];
    $scope.user = "";

    var init = function () {
        $scope.products = [];
        $scope.user = localStorage.getItem("user")

        if ($scope.user !== null) {

            db.allDocs({
                include_docs: true
            }).then(function (result) {
                $scope.$apply(function () {
                    $scope.products = result.rows.filter(function (row) {
                        if (row.doc.key == "product") {
                            row.doc.storage = row.doc.ram + " /" + row.doc.rom;
                            return row.doc;
                        }
                    });
                    $scope.products = $scope.products.map(function (row) { return row.doc });
                });

                console.log("List==>", $scope.products);
            }).catch(function (err) {
                console.log(err);
            });
        } else {
            $window.location.href = 'signin/signin.html';
        }
    };
    init();

    $scope.logout = function () {
        localStorage.removeItem("user");
        init();
    };

    $scope.saveRecord = function () {

        if ($scope.product) {
            if ($scope.product._id == null) {
                var id = Math.random().toString(36).substr(2, 9);
                $scope.product._id = id;
                $scope.product.key = "product";
                //Inserting Document
                db.put($scope.product, function (err, response) {

                    if (err) {
                        return console.log(err);
                    } else {
                        init();
                        alert("Product created Successfully");
                    }
                });

            }
        }
        delete $scope.product
    }

    $scope.edit = function (id) {

        for (i in $scope.products) {
            if ($scope.products[i]._id == id) {
                $scope.oldProduct = angular.copy($scope.products[i]);
            }
        }
    }
    $scope.updateRecord = function () {

        db.put($scope.oldProduct);
        alert("Product Updated Successfully");
        delete $scope.oldProduct
        init();
    }

    $scope.delete = function (id, revId) {

        db.remove(id, revId);
        init();
        alert("Product Deleted Successfully");
    }

});