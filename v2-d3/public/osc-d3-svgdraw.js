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

// low-level object reference array
var objectStack = [];

// css array
var objectStyle = [];

// transform array
var objectTransform = [];

function getTransformString(transform)
{
  var str = "";
  for( var key in transform )
  {
    str += key + "(" + transform[key] + ") ";
  }
  return str;
}

function getStyleString(style)
{
  var str = "";
  for( var key in style )
  {
    str += key + ":" + style[key] + "; ";
  }
  return str;
}

port.on("message", function (oscMessage) {
   console.log("received "+ oscMessage.address + " " + oscMessage.args + "\n");

//  var addr = oscMessage.address;
// "id" is the address prefix
// the second address level is the drawing switch

  const id_cmd = oscMessage.address.split("/").filter( function(e){ return e } );
  // the filter removes empty strings (which we get for the first '/' )

  const id = id_cmd[0];

  if( id == "clear")
  {

    for( var key in objectStack)
    {
      objectStack[key].remove();
      delete objectStack[key];
    }

    objectStack = []; // clear everything and return
    return;
  }
  else if( id_cmd.length < 2 )
  {
    console.log("wrong address format, should be: /unique_id/drawing_command\n\t got: "+id_cmd+" size "+id_cmd.length+"\n" );
    return;
  }



  var cmd = id_cmd[1]; // position, remove, or if draw, look for drawType
  var cmdtype = ( id_cmd.length == 3 ) ? id_cmd[2] : "none";

  if( cmd == "draw" )
  {
    if( cmdtype != "none")
    {
      cmd += "/" + cmdtype;
    }
    else
    {
      console.log("must specifiy drawtype after /draw");
      return;
    }
  }


  switch (cmd)
  {
    case "style" :
      if( typeof objectStyle[id] == "undefined" )
        objectStyle[id] = {};

      objectStyle[id][cmdtype] = oscMessage.args;

      /*
      if( typeof objectStack[id] != "undefined" )
      {
        objectStack[id].attr("style", getStyleString(objectStyle[id]) );
      }
*/
    break;

    case "transform" :
      if( typeof objectTransform[id] == "undefined" )
        objectTransform[id] = {};

      objectTransform[id][cmdtype] = oscMessage.args;

      /*
      if( cmdtype == transform && typeof objectStack[id] != "undefined" && objectStack[id].objecttype == "img" )
      {
        objectStack[id].attr("transform", getTransformString(objectTransform[id]) );
      }
      */

    break;

    case "draw/path":
      if( oscMessage.args.length == 1 ) // pathstring
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = drawing.append("path").attr("d", oscMessage.args[0]);

      }
    break;
    case "draw/ellipse":
      if( oscMessage.args.length == 4 ) // cx="200" cy="80" rx="100" ry="50"
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = drawing.append("ellipse")
          .attr("cx", oscMessage.args[0])
          .attr("cy", oscMessage.args[1])
          .attr("rx", oscMessage.args[2])
          .attr("ry", oscMessage.args[3]);


      }
    break;
    case "draw/rect":
      if( oscMessage.args.length == 4 ) // x="50" y="20" width="150" height="150"
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = drawing.append("rect")
          .attr("x", oscMessage.args[0])
          .attr("y", oscMessage.args[1])
          .attr("width", oscMessage.args[2])
          .attr("height", oscMessage.args[3]);

      }
    break;
    case "draw/circle":
      if( oscMessage.args.length == 3 ) // cx="50" cy="50" r="40"
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = drawing.append("circle")
          .attr("cx", oscMessage.args[0])
          .attr("cy", oscMessage.args[1])
          .attr("r", oscMessage.args[2]);

      }
    break;
    case "draw/line":
      if( oscMessage.args.length == 4 ) // x1="0" y1="0" x2="200" y2="200"
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = drawing.append("line")
          .attr("x1", oscMessage.args[0])
          .attr("y1", oscMessage.args[1])
          .attr("x2", oscMessage.args[2])
          .attr("y2", oscMessage.args[3]);

      }
    break;
    case "draw/polygon":
      if( oscMessage.args.length == 1 ) // points="220,10 300,210 170,250 123,234"
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = drawing.append("polygon").attr("points", oscMessage.args[0]);
      }
    break;
    case "draw/polyline":
      if( oscMessage.args.length == 1 ) // points="220,10 300,210 170,250 123,234"
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = drawing.append("polyline").attr("points", oscMessage.args[0]);
      }
    break;

    case "draw/stave":
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
    case "draw/music":
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
    case "draw/text":
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
    case "position": // this needs to be used as transform, since paths don't have x/y attributes
      if( oscMessage.args.length == 2 ) // [ x, y ]
      {
          if( typeof objectStack[id] != "undefined" )
          {
            objectStack[id].attr("transform", "translate("+ oscMessage.args[0]+","+ oscMessage.args[1] + ")" );
          }
      }
    break;

    case "draw/img":
      if( oscMessage.args.length == 1 ) // url
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();
/*
          objectStack[id] = $('<img />', {
              src: oscMessage.args[0]
          }).appendTo($('#images').empty());

          objectStack[id].objecttype = "img";

           */
           objectStack[id] = drawing.append("svg:image")
            .attr('x', 0)
            .attr('y', 0)
            .attr("xlink:href", oscMessage.args[0]);

           var image = new Image();

           image.addEventListener('load', function() {
            objectStack[id].attr('width', this.naturalWidth)
             .attr('height', this.naturalHeight);
           });

           image.src = oscMessage.args[0];

      }
    break;
    case "pdf/load":
      if( oscMessage.args.length == 1 ) // url
      {
        setPDFref(oscMessage.args[0]);

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

  if( typeof objectStack[id] != "undefined" )
  {

    if( typeof objectTransform[id] != "undefined" )
        objectStack[id].attr("transform", getTransformString(objectTransform[id]) );

    if( typeof objectStyle[id] != "undefined" )
      objectStack[id].attr("style", getStyleString(objectStyle[id]) );
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
