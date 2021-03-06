// to do: option to add user messages back to server
// for d3.js we can use:
//          .on("click", function(){ console.log("hello!"); } );

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

// low-level object reference array
var objectStack = [];
// css array
var objectStyle = [];
// transform array
var objectTransform = [];

var ongoingTouches = [];

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
      if( objectStack[key].context == "canvas" )
      {
        console.log("clearing canvas");
        pdfcontext.clearRect(0, 0, pdfcanvas.width, pdfcanvas.height);
      }

      objectStack[key].remove();
      delete objectStack[key];
    }

    objectStack = []; // clear everything and return

    ongoingTouches = [];

    return;
  }
  else if( id == "multitouch" && oscMessage.args.length == 1 )
  {
    ongoingTouches = [];

    log(oscMessage.args[0]);
    if( oscMessage.args[0] > 0 )
      enableMultitouch();
    else
      disableMultitouch();

    return;

  }
  else if( id_cmd.length < 2 )
  {
    senderror("wrong address format, should be: /unique_id/drawing_command\n\t got: "+id_cmd+" size "+id_cmd.length+"\n");
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
      senderror("wrong address format, should be: /unique_id/drawing_command\n\t got: "+id_cmd+" size "+id_cmd.length+"\n");

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

      if( objectStack[id].context == "canvas" && cmdtype == "translate" && oscMessage.args.length == 2 )
        objectTransform[id][cmdtype] = [oscMessage.args[0]+"px", oscMessage.args[1]+"px"];
      else
        objectTransform[id][cmdtype] = oscMessage.args;

        // NOTE: SVG rotates from the top left corner
        //  if we want to rotate from the center we'll need the object bounds, and use rotate(deg, cx, cy)


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

        objectStack[id] = drawing.append("path")
          .attr("id", id)
          .attr("d", oscMessage.args[0]);

      }
    break;
    case "draw/ellipse":
      if( oscMessage.args.length == 4 ) // cx="200" cy="80" rx="100" ry="50"
      {
        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = drawing.append("ellipse")
          .attr("id", id)
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
          .attr("id", id)
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
          .attr("id", id)
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
          .attr("id", id)
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

           // add image to svg now so that drawing order is correct,
           // then update the width and height after the images has loaded and we can query the image object
           objectStack[id] = drawing.append("svg:image")
              .attr("id", id)
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
    case "pdf":
      if( oscMessage.args.length == 1 ) // url
      {

        if( typeof objectStack[id] != "undefined" )
          objectStack[id].remove();

        objectStack[id] = { context: "canvas" };

        setPDFref(oscMessage.args[0]);

      }
    break;

    case "remove":
      objectStack[id].remove();
      delete objectStack[id];

      if( objectStack[key].context == "canvas" )
        pdfcontext.clearRect(0, 0, canvas.width, canvas.height);

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
    if( objectStack[id].context == "canvas" )
    {
      var style;
      if( typeof objectStyle[id] != "undefined" )
        style = objectStyle[id];

      if( typeof objectTransform[id] != "undefined" )
      {
        if( typeof style == "undefined")
        {
          pdfcanvas.setAttribute("style", "transform:"+getTransformString(objectTransform[id]) );
        }
        else
        {
          style.transform = getTransformString(objectTransform[id]);
          pdfcanvas.setAttribute("style", getStyleString(style) );
        }
      }


    }
    else
    {
      if( typeof objectStyle[id] != "undefined" )
        objectStack[id].attr("style", getStyleString(objectStyle[id]) );

      if( typeof objectTransform[id] != "undefined" )
          objectStack[id].attr("transform", getTransformString(objectTransform[id]) );
    }


  }

});

function posterror(str)
{
  $("#log").text(str);
}

function senderror(err)
{
  port.send({
        address: oscprefix+"/error",
        args: err
    });
}

port.on('error', function(error) {
  posterror(error);
  senderror(error);
});

port.open();



/**
*   mouse handling
*/

function emptybundle(){
  return {
    timeTag : osc.timeTag(),
    packets : []
  }
};

function enableMultitouch() {
  document.body.addEventListener("touchstart", handleStart, false);
  document.body.addEventListener("touchend", handleEnd, false);
  document.body.addEventListener("touchcancel", handleCancel, false);
  document.body.addEventListener("touchleave", handleEnd, false);
  document.body.addEventListener("touchmove", handleMove, false);
  log("initialized multitouch");
}

function disableMultitouch() {
  document.body.removeEventListener("touchstart", handleStart);
  document.body.removeEventListener("touchend", handleEnd);
  document.body.removeEventListener("touchcancel", handleCancel);
  document.body.removeEventListener("touchleave", handleEnd);
  document.body.removeEventListener("touchmove", handleMove);
  log("disabled multitouch");

}

function handleStart(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  var bndl = emptybundle();
  for (var i = 0; i < touches.length; i++) {
    ongoingTouches.push(copyTouch(touches[i]));
    var idx = ongoingTouchIndexById(touches[i].identifier);
    bndl.packets.push({
      address: oscprefix+"/"+evt.target.id+"/finger/"+idx+"/start/xy",
      args: [touches[i].clientX, touches[i].clientY]
    });
  }
  port.send(bndl);
}

function handleMove(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  var bndl = emptybundle();
  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
    bndl.packets.push({
      address: oscprefix+"/"+evt.target.id+"/finger/"+idx+"/move/xy",
      args: [touches[i].clientX, touches[i].clientY]
    });
  }
  port.send(bndl);
}

function handleEnd(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  var bndl = emptybundle();
  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(i, 1); // remove it; we're done
    bndl.packets.push({
      address: oscprefix+"/"+evt.target.id+"/finger/"+idx+"/end/xy",
      args: [touches[i].clientX, touches[i].clientY]
    });
  }
  port.send(bndl);
}

function handleCancel(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  var bndl = emptybundle();
  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(i, 1); // remove it; we're done
    bndl.packets.push({
      address: oscprefix+"/"+evt.target.id+"/finger/"+idx+"/cancel/xy",
      args: [touches[i].clientX, touches[i].clientY]
    });
  }
  port.send(bndl);
}

function copyTouch(touch) {
  return { identifier: touch.identifier, clientX: touch.clientX, clientY: touch.clientY };
}

function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1; // not found
}

function log(msg) {
  var p = document.getElementById('log');
  p.innerHTML = msg;
}

function findPos (obj) {
    var curleft = 0,
        curtop = 0;

    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);

        return { x: curleft-document.body.scrollLeft, y: curtop-document.body.scrollTop };
    }
}


document.body.addEventListener("mousemove", function(event)
{
  port.send({
        address: oscprefix+"/"+event.target.id+"/mouse/xy",
        args: [ event.clientX, event.clientY ]
    });

    //posterror(event.clientX + " " + event.clientY);
});

document.body.addEventListener("mousedown", function(event)
{
  port.send({
        address: oscprefix+"/"+event.target.id+"/mouse/state",
        args: 1
    });

    //posterror(event.clientX + " " + event.clientY);
});

document.body.addEventListener("mouseup", function(event)
{
  port.send({
        address: oscprefix+"/"+event.target.id+"/mouse/state",
        args: 0
    });

    //posterror(event.clientX + " " + event.clientY);
});
/**
* Main window setup
*
*/

window.onload = function() {
  log("loade");
  enableMultitouch();
}

// this doesn't work yet
window.onbeforeunload = function() {
    port.onclose = function () {}; // disable onclose handler first
    port.close()
};
