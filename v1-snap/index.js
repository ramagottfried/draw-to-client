/*jslint es6:true*/

// settings
const http_port = 3001;
const udp_port = 4001;
const websocket_port = 5001;

// load libaries
const express = require('express');
const http = require('http');
const osc = require('osc');
const WebSocket = require('ws');
const url = require('url');

const app = express();

// client storage
class Clients {
    constructor() {
        this.clientList = {};
        this.saveClient = this.saveClient.bind(this);
    }

    saveClient(client, uniqueid, prefix) {
        this.clientList[uniqueid] = { port : client, oscprefix : prefix };
    }

    removeClient( uniqueid ) {
        delete this.clientList[uniqueid];
    }
}

const clients = new Clients();


// setup UDP listener from Max

var udp = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: udp_port,
    remoteAddress: "127.0.0.1",
    remotePort: 7500
});

udp.setMaxListeners(100);

udp.on("ready", function () {
    console.log('\x1b[33m%s\x1b[0m:', "Listening for OSC over UDP at", udp.options.localAddress );
    console.log('\x1b[33m%s\x1b[0m:', "Port", udp.options.localPort );
});

udp.open();

// setup http server
app.use( express.static('public') );
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.get('/', (req, res) => {
  console.log('express connection ' + req + ' ' + res );
});

const server = http.createServer(app);

// setup sockets
const wss = new WebSocket.Server({
  server : server
});

wss.setMaxListeners(144);

// create OSC websockets from vanilla websockts, and add to clients list
wss.on("connection", function (socket, req) {

    console.log("A Web Socket connection has been established! " + req.url );

    var socketPort = new osc.WebSocketPort({
        socket: socket
    });

    clients.saveClient( socketPort, req.headers['sec-websocket-key'], req.url );

});


// Listen for incoming OSC bundles. ... should sort here to send to the right places
udp.on("bundle", function (oscBundle, timeTag, info)
{
    if( !osc.isValidBundle(oscBundle) )
    {
        console.log( "not sure what this is " + oscBundle );
        return;
    }

    for( var id in clients.clientList )
    {
        var oscport = clients.clientList[id].port;
        var prefix = clients.clientList[id].oscprefix;
        //console.log(prefix + " -- " + id ); // uniqueid
        //console.log("OSC Bundle msg count " + oscBundle.packets.length );

        if( oscport.socket.readyState === WebSocket.OPEN )
        {   // collects messages for this osc client based on the first /prefix of address
            var routedMsgs = [];

            for( const packet of oscBundle.packets )
            {
                //console.log( "checking " + packet.address );
                if( packet.address.startsWith(prefix+"/") )
                {
                    // note: had to make the new object here to avoid slicing the original data! tricky
                    routedMsgs.push({
                        address : packet.address.slice(prefix.length),
                        args : packet.args
                    });
                }
                else if( packet.address.startsWith("/*/") )
                {
                    routedMsgs.push({
                        address : packet.address.slice(2),
                        args : packet.args
                    });
                }
            }
//            console.log("sending " + routedMsgs );
            oscport.send({
                packets : routedMsgs,
                timeTag : osc.timeTag()
            });
        }
        else if ( oscport.socket.readyState > 1 )
        {
            oscport.close();
            clients.removeClient( id );
        }

    }

});

// helper func
var getIPAddresses = function () {
    var os = require("os"),
    interfaces = os.networkInterfaces(),
    ipAddresses = [];

    for (var deviceName in interfaces){
        var addresses = interfaces[deviceName];

        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];

            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }

    return ipAddresses;
};


// start server
server.listen(http_port, () => {
  console.error('\x1b[36m%s\x1b[0m', 'load webpage at', 'http://localhost:' + http_port);
  console.error('\x1b[36m%s\x1b[0m', 'or', 'http://'+getIPAddresses()+':'+http_port);
});
