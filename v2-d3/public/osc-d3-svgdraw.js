


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
  switch (oscMessage.address){
    case "/draw/path":
      if( oscMessage.args.length == 2 ) // [ id, pathstring ]
      {
        const objname = oscMessage.args[0];
        if( typeof objectStack[objname] != "undefined" )
          objectStack[objname].remove();

        objectStack[objname] = drawing.append("path")
            .attr("d", oscMessage.args[1])
            .attr("fill", "none" )
            .attr("stroke-width", 6 )
            .attr("stroke", "black" );
      }
    break;
    case "/draw/brav":
      if( oscMessage.args.length == 4 ) // [ id, x, y, text ]
      {
        const objname = oscMessage.args[0];
        if( typeof objectStack[objname] != "undefined" )
          objectStack[objname].remove();

        objectStack[objname] = drawing.append("text")
            .attr("x", oscMessage.args[1] )
            .attr("y", oscMessage.args[2] )
            .html( "&#x" + oscMessage.args[3] )
            .attr("class", "bravura_text" );
      }
    break;
    case "/position":
      if( oscMessage.args.length == 3 ) // [ id, x, y ]
      {
          const objname = oscMessage.args[0];
          if( typeof objectStack[objname] != "undefined" )
          {
            objectStack[objname].attr("x", oscMessage.args[1])
              .attr("y", oscMessage.args[2] );
          }


      }
    break;
    case "/remove":
      if( oscMessage.args.length == 1 ) // [ id ]
      {
        objectStack[oscMessage.args[0]].remove();
        delete objectStack[oscMessage.args[0]];
      }
    break;
    case "/hr":
      $("#hr").text(pad(oscMessage.args));
    break;
    case "/min":
      $("#min").text(pad(oscMessage.args));
    break;
    case "/ms":
      $("#ms").text( Math.round(oscMessage.args*100)/100 );
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
