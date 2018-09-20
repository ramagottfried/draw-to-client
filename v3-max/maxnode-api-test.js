// settings
const http_port = 3001;
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


const path = require('path');
const Max = require('max-api');

// This will be printed directly to the Max console
Max.post(`Loaded the ${path.basename(__filename)} script`);

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

  update(prefix, dict) {
    if( typeof this.state[prefix] == "undefined" ) {

      this.state[prefix] = dict;

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


// Use the 'outlet' function to send messages out of node.script's outlet
Max.addHandler(Max.MESSAGE_TYPES.DICT, (msg) => {
  Max.post( typeof(msg) );
  for( var k in msg )
  {
    Max.post(k + ": "+msg[k]);
  }
});
