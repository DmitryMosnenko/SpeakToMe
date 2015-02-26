var app = angular.module('dashboardApp');

app.config(function($routeProvider) {
    $routeProvider

        .when('/chat/:userId', {
            templateUrl : '/static/html/dashboard/chat.html',
            controller  : 'chatController'
        })
});

app.controller('chatController', ['$rootScope', '$scope', '$location', 'xmpp', '$routeParams', '$filter',
    function($rootScope, $scope, $location, xmpp, $routeParams, $filter) {
        try {
            $rootScope.currentUser = $filter('filter')($rootScope.user.contacts, {jid: $routeParams.userId})[0];
        }
        catch (e) {
            console.log("No User selected, redirect me to dashboard");
            $location.path("/");
            return;
        }
        $scope.currentMessage = '';
        $scope.divHistory = document.getElementsByClassName("panel-body")[0];

        if ( !$rootScope.currentUser.history )
            $rootScope.currentUser.history = [];

        $scope.$on('$destroy', function () { $rootScope.currentUser = ''; });

        $scope.$watch('divHistory.scrollHeight', function() {
            $scope.divHistory.scrollTop = $scope.divHistory.scrollHeight;
        });

        angular.forEach($rootScope.currentUser.history, function(item) {
            item.viewed = true;
        });

        $scope.sendMessage = function() {
            $rootScope.currentUser.history.push({time : new Date(), direction : 'to', message : $scope.currentMessage});
            xmpp.sendMessage($rootScope.currentUser.jid, $scope.currentMessage);
            $scope.currentMessage = '';
        };

        $rootScope.$on('XMPPNewMessage', function(event, args) {
        });

}]);