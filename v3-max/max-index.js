/*jslint es6:true*/

// settings
const http_port = 3002;
const udp_port = 4001;
const udp_port_out = 4002;

const websocket_port = 5001;

// load libaries
const express = require('express');
const http = require('http');
//const osc = require('osc');
const WebSocket = require('ws');
const url = require('url');
const app = express();

const Max = require('max-api');
Max.post("started up");

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
        this.clientList[uniqueid] = { socket : client, oscprefix : prefix };
    }

    removeClient( uniqueid ) {
        delete this.clientList[uniqueid];
    }
}

const clients = new Clients();

const osc_state = new OSCstate();

// setup UDP listener from Max

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

    var uniqueid = req.headers['sec-websocket-key'];

    console.log("A Web Socket connection has been established! " + req.url + " ("+uniqueid+")" );

    // setup relay back to Max
    socket.on("message", function (msg) {
      Max.outlet( JSON.parse(msg) );
    });

    socket.on("close", function (event) {
      clients.removeClient( uniqueid );
      console.log("closed socket : "+ uniqueid+ " @ " +req.url);
    });

    socket.on("error", function (event) {
      clients.removeClient( uniqueid );
      console.log("error on socket : "+ uniqueid+ " @ " +req.url);
    });

    clients.saveClient( socket, uniqueid, req.url );

    const bundleState = osc_state.get(req.url);
    if( bundleState != false ){
      socket.send(bundleState);
    }


});


// Use the 'outlet' function to send messages out of node.script's outlet
Max.addHandler(Max.MESSAGE_TYPES.DICT, (dict) => {

  for( var id in clients.clientList )
  {
      var socket = clients.clientList[id].socket;
      var url_id = clients.clientList[id].oscprefix;
      var prefix = url_id.slice(1);

      // Max.post(prefix + " -- " + id ); // uniqueid
      //console.log("OSC Bundle msg count " + oscBundle.packets.length );

      if( socket.readyState === WebSocket.OPEN )
      {   // collects messages for this osc client based on the first /prefix of address
          var sendObj = {};

          for( const key in dict )
          {
              const value = dict[key];
          //    Max.post( "checking " + key+ " for " + prefix+"/" );
              if( key.startsWith(prefix+"/") )
              {
                  sendObj[key.slice(prefix.length)] = value;
              }
              else if( key.startsWith("/*/") )
              {
                sendObj[key.slice(2)] = value;

              }
          }

          socket.send(JSON.stringify(sendObj));
          osc_state.update(prefix, sendObj);

      }
      else if ( socket.readyState > 1 )
      {
          //oscport.close();
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
  Max.post('load webpage at', 'http://localhost:' + http_port);
  Max.post('or', 'http://'+getIPAddresses()+':'+http_port);
});
