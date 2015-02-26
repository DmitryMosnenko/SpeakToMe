var app = angular.module('XMPP', []);

app.service('xmpp', function($rootScope, $http) {

    var connection = null;

//    FixMe: collect all end points in one place
    $http.get("/xmpp/host")
        .success(function(response) {
            $rootScope.xmppServer = response;
            connection = new Strophe.Connection($rootScope.xmppServer, {sync:false});
        });

    this.connect = function(jid, pass) {
        connection.connect(jid, pass, this.onConnect);
    };

    this.onConnect = function(status) {
        console.log('echoBotController::onConnect: status:', status);

        if (status == Strophe.Status.CONNECTING) {
            this.connectionStatus = 'Connecting';
            console.log('Connecting.');
        } else if (status == Strophe.Status.CONNFAIL) {
            this.connectionStatus = 'Connection failed';
            console.log('Failed to connect.');
        } else if (status == Strophe.Status.DISCONNECTING) {
            this.connectionStatus = 'Disconnecting';
            console.log('Disconnecting.');
        } else if (status == Strophe.Status.DISCONNECTED) {
            this.connectionStatus = 'Disconnected';
            console.log('Disconnected.');
        } else if (status == Strophe.Status.CONNECTED) {
            this.connectionStatus = 'Connected';
//            connection.send($pres());
//                var status = $pres().c('show').t('away');
//                $scope.connection.send(status);
                connection.addHandler(onMessage, null, 'message', 'chat');

//                $location.path("/dashboard");

            console.log('Is connected - 2.');

            Strophe.addConnectionPlugin('roster');
        }

        console.log("xmpp::onConnect: ", this.connectionStatus);

        $rootScope.$broadcast('XMPPStatusChanged', {status : this.connectionStatus});

        return true;
    };

    this.broadcastImPresent = function() {
        connection.send($pres());
    };

    this.disconnect = function() {
        connection.disconnect();
    };

    this.sendMessage = function(recipient, msgText) {
        var msg = $msg({to: recipient, from: connection.jid, type: 'chat'}).c('body').t(msgText);
        connection.send(msg);
    };

    this.onPresence = function(presence) {
        console.log("on_presence: ", presence);
        return true;
    };

    onMessage = function(msg) {
        console.log("on_message: ", msg);

        var to = msg.getAttribute('to');
        var from = msg.getAttribute('from');
        var type = msg.getAttribute('type');
        var elems = msg.getElementsByTagName('body');
        var subject = msg.getElementsByTagName('subject');

        if (type == "chat" && elems.length > 0)
            var body = elems[0];

        $rootScope.$broadcast('XMPPNewMessage', {from : from.split('/')[0], message : Strophe.getText(body)});

        return true;
    };

    this.getRoster = function() {
//        var iq = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
//        connection.sendIQ(iq, this.onRoster);

//        connection.addHandler(this.onRoster, "jabber:iq:roster", "iq", "set");

        connection.roster.get(this.onRoster);

        return true;
    };

    this.onRoster = function(roster) {
        console.log("xmpp::onRoster:", roster);

        $rootScope.$broadcast('XMPPContacts', {contacts : roster});

        return true;
    };


    $rootScope.$on('$destroy', function () {
        console.log("xmpp::page destroying");
        this.disconnect();
    });

});