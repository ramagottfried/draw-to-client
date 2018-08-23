


var oscprefix = document.getElementById("OSC").getAttribute("OSCprefix");
//var oscprefix = location.pathname.slice(0, -5);

if (window.WebSocket){
     $("#error").text("");
}

var port = new osc.WebSocketPort({
    url: `ws://${location.host}${oscprefix}`
});

console.log(`ws://${location.host}${oscprefix}`);

$("#location").text('connected to '+ location.host);

function pad(num, size) {
  return ('0' + num).substr(-size);
}

var drawing = d3.select("#drawing");

//console.log(drawing);

var objectStack = [];

port.on("message", function (oscMessage) {
  // console.log("received "+ oscMessage.args + "\n");

//  var addr = oscMessage.address;
// "id" is the address prefix
// the second address level is the drawing switch

  const id_cmd = oscMessage.address.split("/").filter( function(e){ return e } );
  // the filter removes empty strings (which we get for the first '/' )

  if( id_cmd.length != 2 )
  {
    console.log("wrong address format, should be: /unique_id/drawing_command\n\t got: "+id_cmd+" size "+id_cmd.length+"\n" );
    return;
  }


  const id = id_cmd[0];
  const cmd = id_cmd[1];

  switch (cmd) {
    case "draw_path":
    if( oscMessage.args.length == 1 ) // pathstring
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = drawing.append("path")
            .attr("d", oscMessage.args[0])
            .attr("fill", "none" )
            .attr("stroke-width", 1 )
            .attr("stroke", "black" );
      }
    break;
    case "draw_stave":
      if( oscMessage.args.length == 3 ) // [ x, y, text ]
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = drawing.append("text")
            .attr("x", oscMessage.args[0] )
            .attr("y", oscMessage.args[1] )
            .html( "&#x" + oscMessage.args[2] )
            .attr("class", "bravura_text" );
      }
    case "draw_music":
      if( oscMessage.args.length == 3 ) // [ x, y, text ]
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = drawing.append("text")
            .attr("x", oscMessage.args[0] )
            .attr("y", oscMessage.args[1] )
            .html( "&#x" + oscMessage.args[2] )
            .attr("class", "bravura_text" );
      }
    break;
    case "draw_text":
      if( oscMessage.args.length == 3 ) // [ x, y, text ]
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = drawing.append("text")
            .attr("x", oscMessage.args[0] )
            .attr("y", oscMessage.args[1] )
            .html( oscMessage.args[2] )
            .attr("class", "basestyle" );
      }
    break;
    case "position":
      if( oscMessage.args.length == 2 ) // [ x, y ]
      {
          if( typeof objectStack[id] != "undefined" )
          {
            objectStack[id].attr("x", oscMessage.args[0])
              .attr("y", oscMessage.args[1] );
          }
      }
    break;
    case "remove":
      objectStack[id].remove();
      delete objectStack[id];
    break;
    /*
    case "/hr":
      $("#hr").text(pad(oscMessage.args));
    break;
    case "/min":
      $("#min").text(pad(oscMessage.args));
    break;
    case "/ms":
      $("#ms").text( Math.round(oscMessage.args*100)/100 );
    break;*/
    default:
      console.log("received unknown command: "+cmd+ "\n" );
    break;
  }
});

port.on('error', function(error){
  $("#error").text(error);
});

// this doesn't work yet
window.onbeforeunload = function() {
    port.onclose = function () {}; // disable onclose handler first
    port.close()
};

port.open();
