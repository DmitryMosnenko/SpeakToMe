var signInApp = angular.module('dashboardApp');

signInApp.config(function($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl : '/static/html/index/signin.html',
        controller  : 'signInController'
    });
});

signInApp.controller('signInController', ['$rootScope', '$scope', '$http', '$interval', '$location', 'xmpp',
    function($rootScope, $scope, $http, $interval, $location, xmpp) {

//    FixMe: check this on values is correct
    $scope.tryLogin = function() {
        console.log("signInController::tryLogin: domain is", $rootScope.xmppDomain);
        $rootScope.userJID = $scope.userEmail.replace('@', '\\40') + "@" + $rootScope.xmppDomain;
        xmpp.connect($rootScope.userJID, $scope.userPass)
    };

    $scope.$on('XMPPStatusChanged', function(event, args) {
        $scope.user.connectionStatus = args.status.toString();
        if ($scope.user.connectionStatus === 'Connected') {
            console.log("globalMenuController::XMPPStatusChanged:", $scope.user.connectionStatus);
            xmpp.getRoster();
            $location.path("/dashboard");
        }
    });
}]);


// Helpers...
// FixMe: unused
var guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};