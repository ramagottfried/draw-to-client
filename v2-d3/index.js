/*jslint es6:true*/

// settings
const http_port = 3001;
const udp_port = 4001;
const udp_port_out = 4002;

const websocket_port = 5001;

// load libaries
const express = require('express');
const http = require('http');
const osc = require('osc');
const WebSocket = require('ws');
const url = require('url');

const app = express();

// storage for current clientOSC bundles
/*
  OSCstate["/prefix"]["/address"] = args;
*/
class OSCstate
{
  constructor() {
      this.state = [];
      this.update = this.update.bind(this);
      this.remove = this.remove.bind(this);
  }

  update(prefix, oscBundle) {
    if( typeof this.state[prefix] == "undefined" ) {

      this.state[prefix] = oscBundle;

    } else {

      for( var update_m of oscBundle.packets ) {

        // parse address to handle state storage
        const id_cmd = update_m.address.split("/").filter( function(e){ return e } );
        // the filter removes empty strings (which we get for the first '/' )


        const id = id_cmd[0];

        if( id == "clear")
        {
          this.state = this.state.filter( function(k) { return k != prefix; });
          return;
        }
        else if( id_cmd.length < 2 )
        {
          console.log("wrong address format, should be: /unique_id/drawing_command\n\t got: "+id_cmd+" size "+id_cmd.length+"\n" );
          return;
        }

        var cmd = id_cmd[1]; // position, remove, or if draw, look for drawType
        var drawType = ( id_cmd.length == 3 ) ? id_cmd[2] : "none";

        if( cmd == "remove" )
        {
          this.state[prefix].packets = this.state[prefix].packets.filter( function(m) { return !m.address.startsWith("/"+id) });
          return;
        }
        else if( cmd == "draw")
        {
          if( drawType != "none")
          {
            cmd += "/" + drawType;
          }
          else
          {
            console.log("must specifiy drawtype after /draw");
            return;
          }
        }

        var found = false;
        for( var state_m of this.state[prefix].packets ) {
            if( state_m.address == update_m.address ) {
              if( update_m.args )
                state_m.args = update_m.args;

              found = true;
              break;
            }
        }

        if( found == false ) {
          this.state[prefix].packets.push(update_m);
        }
/*
        for( var state_m of this.state[prefix].packets ) {
          console.log(state_m.address, state_m.args);
        }
*/
      }
    }
  }

  get(prefix)
  {
    if( typeof this.state[prefix] == "undefined" )
      return false;
    else
      return this.state[prefix];
  }

  remove( prefix ) {
      delete this.state[prefix];
  }
}

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

const osc_state = new OSCstate();

// setup UDP listener from Max

var udp = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: udp_port,
    remoteAddress: "127.0.0.1",
    remotePort: udp_port_out
});

udp.setMaxListeners(100);

udp.on("ready", function () {
    console.log('\x1b[33m%s\x1b[0m:', "Listening for OSC over UDP at", udp.options.localAddress );
    console.log('\x1b[33m%s\x1b[0m:', "In Port", udp.options.localPort );
    console.log('\x1b[33m%s\x1b[0m:', "Out Port", udp.options.remotePort );

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

    var socketPort = new osc.WebSocketPort({
        socket: socket
    });

    var uniqueid = req.headers['sec-websocket-key'];

    console.log("A Web Socket connection has been established! " + req.url + "("+uniqueid+")" );

    // setup relay back to Max
    socketPort.on("osc", function (osc) {
      udp.send(osc);
    });

    socketPort.on("close", function (event) {
      clients.removeClient( uniqueid );
      console.log("closed socket : "+ uniqueid+ " @ " +req.url);
    });

    socketPort.on("error", function (event) {
      clients.removeClient( uniqueid );
      console.log("error on socket : "+ uniqueid+ " @ " +req.url);
    });

    clients.saveClient( socketPort, uniqueid, req.url );

    const bundleState = osc_state.get(req.url);
    if( bundleState != false ){
      socketPort.send(bundleState);
    }


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
            var sendBundle =  {
                packets : routedMsgs,
                timeTag : osc.timeTag()
            };
            oscport.send(sendBundle);
            osc_state.update(prefix, sendBundle);
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
