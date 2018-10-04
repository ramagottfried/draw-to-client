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
      this.state = {};
      this.update = this.update.bind(this);
      this.remove = this.remove.bind(this);
  }

  update(prefix, obj) {
    if( typeof this.state[prefix] == "undefined" ) {

      this.state[prefix] = obj;

    } else {

      for( var key in obj ) {

        // parse address to handle state storage
        const id_cmd = key.split("/").filter( function(e){ return e } );
        // the filter removes empty strings (which we get for the first '/' )

        const id = id_cmd[0];

        if( id == "clear")
        {
          this.state[prefix] = {};
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
          for( var k in this.state[prefix] )
          {
            if( k.startsWith("/"+id) )
              delete this.state[prefix][k];
          }
          //this.state[prefix].packets = this.state[prefix].packets.filter( function(m) { return !m.address.startsWith("/"+id) });
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
        for( var addr in this.state[prefix] ) {
            if( addr == key ) {
              if( typeof obj[key] != "undefined" )
                this.state[prefix] = obj[key];

              found = true;
              break;
            }
        }

        if( found == false ) {
    //      this.state[prefix][key] = obj[key];
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
        this.prefixList = [];
        this.saveClient = this.saveClient.bind(this);
        this.removeClient = this.removeClient.bind(this);

    }

    saveClient(client, uniqueid, prefix) {
      this.clientList[uniqueid] = { socket : client, oscprefix : prefix };

      if( !this.prefixList.includes(prefix) )
      {
        this.prefixList.push(prefix);
      }

    }

    removeClient( uniqueid ) {
      if(typeof this.clientList[uniqueid] === "undefined" )
        return;

      var prefix = this.clientList[uniqueid].oscprefix;
      this.prefixList = this.prefixList.filter(function(item) { return item !==  prefix});
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

wss.setMaxListeners(200);

// create OSC websockets from vanilla websockts, and add to clients list
wss.on("connection", function (socket, req) {

    var uniqueid = req.headers['sec-websocket-key'];

    Max.post("A Web Socket connection has been established! " + req.url + " ("+uniqueid+") "+ req.connection.remoteAddress );

    // setup relay back to Max
    socket.on("message", function (msg) {

      try {
        Max.outlet( JSON.parse(msg) );
      } catch(e){
        Max.post("json failed to parse " + e);
      }

    });

    socket.on("close", function (event) {
      Max.post("closed socket : "+ uniqueid+ " @ " +req.url);
      clients.removeClient( uniqueid );
      socket.terminate();
    });

    socket.on("error", function (event) {
      Max.post("error on socket : "+ uniqueid+ " @ " +req.url);
      clients.removeClient( uniqueid );
      Max.post( event );
    });

    clients.saveClient( socket, uniqueid, req.url );

    const bundleState = osc_state.get(req.url);
    if( bundleState != false ){
      socket.send( JSON.stringify(bundleState) );
    }


});



Max.addHandler(Max.MESSAGE_TYPES.DICT, (dict) => {
  // Max.post("parsing :" + Object.keys(dict))

  var broadcast;
  var target = {};

  for( const key in dict )
  {

    const addr = key[0] != "/" ? "/" + key : key; //annoying that o.dict strips leading / !
    const value = dict[key];
//    Max.post( "checking " + addr);

    if(addr.startsWith("/*/") )
    {
//      Max.post( "broadcast " + addr);

      if( typeof broadcast == "undefined" )
        broadcast = {};

      broadcast[addr.slice(2)] = value;
    }
    else
    {

      for( const pref of clients.prefixList )
      {
//        Max.post("testing "+pref);

        if( addr.startsWith(pref+"/") )
        {
          if( typeof target[pref] == "undefined" )
            target[pref] = {};

          target[pref][addr.slice(pref.length)] = value;
        }
      }

    }
  }

  var sendObj = {};
  sendObj["*"] = JSON.stringify(broadcast);
//  Max.post("sendObj[\"*\"] " + sendObj["*"] );

  for( var t in target )
  {
    osc_state.update(t, target[t]);
    sendObj[t] = JSON.stringify(target[t]);
  }

  for( var id in clients.clientList )
  {
      var socket = clients.clientList[id].socket;
      var prefix = clients.clientList[id].oscprefix;
//      var prefix = url_id.slice(0);

       // Max.post(prefix + " -- " + id ); // uniqueid
      //console.log("OSC Bundle msg count " + oscBundle.packets.length );

      if( socket.readyState === WebSocket.OPEN )
      {

        if( typeof sendObj["*"] != "undefined" )
        {
          socket.send( sendObj["*"] );

        }


        if( typeof sendObj[prefix] != "undefined" ){
//          Max.post("sending "+sendObj[prefix]);
          socket.send( sendObj[prefix] );
        }


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
