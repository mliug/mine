(function(){
angular.module("mineApp").controller("MainCtrl", MainCtrl);
function MainCtrl($scope, MineService) {
    $scope.test = "a Test string";
    var map = MineService.buildMap(16, 16, 40);
    console.log(map);
}
})();
