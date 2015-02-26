
var dashboardApp = angular.module('dashboardApp', ['ngRoute', 'XMPP']);

dashboardApp.run(function($rootScope, $http) {

//    FixMe: collect all end points in one place
    $http.get("/xmpp/domain")
        .success(function(response) {
            $rootScope.xmppDomain = response;
        })
});

dashboardApp.controller('globalMenuController', ['$rootScope', '$scope', '$location', 'xmpp',
    function($rootScope, $scope, $location, xmpp) {
        $rootScope.user = {};

        try {
            $rootScope.userJID = $rootScope.userEmail.replace('@', '\\40') + "@" + $rootScope.xmppDomain;
        } catch(e) {
            $location.path('/login');
        }

        $scope.$on('XMPPStatusChanged', function(event, args) {
            if ($scope.user.connectionStatus === 'Connected') {
                console.log("globalMenuController::XMPPStatusChanged:", $scope.user.connectionStatus);
                xmpp.getRoster();
            }
        });

        window.addEventListener('beforeunload', function(){
            xmpp.disconnect();
        });
}]);


dashboardApp.controller('globalMenuSwitcherController', ['$rootScope', '$scope', '$location', 'xmpp', '$filter',
    function($rootScope, $scope, $location, xmpp, $filter) {

        $rootScope.$on('XMPPContacts', function(event, args) {
            $scope.$apply($rootScope.user.contacts = args.contacts);
            // Must be after that when contacts is received, for successfully push of new offline's messages
            xmpp.broadcastImPresent();
        });

        $rootScope.$on('XMPPNewMessage', function(event, args) {
            var messageSender = $filter('filter')($rootScope.user.contacts, {jid:args.from})[0];
            if (!messageSender.history)
                messageSender.history = [];
            $scope.$apply(messageSender.history.push({
                time : new Date(),
                direction : 'from',
                viewed : $scope.currentUser != messageSender ? false : true,
                message : args.message
            }));
        });

        $scope.chatSelected = function() {

            if ($scope.lastSelected) {
                $scope.lastSelected.isActive = '';
            }
            this.isActive = 'active';
            $scope.lastSelected = this;
        };

}]);