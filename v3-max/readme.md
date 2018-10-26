
# Setup instructions

1. Launch the maxserver-basic.maxpat Max patch.

2. When running the first time: click on the [script npm install] message to load the required packages and libraries.
Click on the [script start] message to start the Node process running.


# API

## Addressing the Webpage

The `max-svgdraw-client.js` script is used on each client browser page to process the incoming commands from the server. On connection each client script sends a message to the server, providing an identifier OSC prefix that can be used to address messages to a specific client page.

The identifier is set in the webpage, set by the `OSCprefix` attribute, which is parsed by `max-svgdraw-client.js` on load. For example, here is a line from `svgdraw-1.html`:

```
<script src="max-svgdraw-client.js" id="OSC" OSCprefix="/svgdraw/1"></script>
```

Each command sent from Max, needs to be prefixed with the appropriate OSC prefix. For example, to clear the window on `/svgdraw/1` you would send the message `/svgdraw/1/clear` to the node.script object in Max.

* /clear -- clears the page

## Drawing and Styling

### Unique ID
Each drawn object needs to have a unique name to identify the object. The name can be any combination of numbers and letters, but needs to be unique. This id can be used to identify the object in situations where you want to change the color, position or other attributes.

The unique id follows the OSC prefix, and sits before the command message.

For example, the `/draw/rect` message expects a list of 4 numbers to specify the x/y position, width and hight.

So, to draw a rectangle on `/svgdraw/1` named `foo` at XY position {10, 10} with a width of 100, and a height of 50, you could use the command:

`/svgdraw/1/foo/draw/rect : [10, 10, 100, 50]`

If you wanted the rectangle to be red you could then set `foo` to be red using the `fill` SVG style property:

`/svgdraw/1/foo/style/fill : "red"`


### Object Methods

The following list of methods need to follow the `OSC prefix` and `object id` (e.g. the address for `/draw/rect`, on `/svgdraw/1`,using the id `foo`: `/svgdraw/1/foo/draw/rect`).


#### Creation Methods

* /draw/path : "SVG path string", see also [SVG Path](https://www.w3.org/TR/SVG11/paths.html#PathData).

* /draw/rect : [ x, y, width, height ] , see also [SVG Basic Shapes](https://www.w3.org/TR/SVG11/shapes.html).

* /draw/ellipse : [ center x, center y, radius x, radius y ] , see also [SVG Basic Shapes](https://www.w3.org/TR/SVG11/shapes.html).

* /draw/circle : [ center x, center y, radius] , see also [SVG Basic Shapes](https://www.w3.org/TR/SVG11/shapes.html).

* /draw/line : [ x1, y1, x2, y2 ] , see also [SVG Basic Shapes](https://www.w3.org/TR/SVG11/shapes.html).

* /draw/polygon : [ x1, y1, x2, y2, ... xn, yn ] , see also [SVG Basic Shapes](https://www.w3.org/TR/SVG11/shapes.html).

* /draw/polyline : [ x1, y1, x2, y2, ... xn, yn ] , see also [SVG Basic Shapes](https://www.w3.org/TR/SVG11/shapes.html).

* /draw/text : [ x, y, "text string" ]

* /draw/music : [ x, y, "music text string" ], using the Bravura font.

* /draw/img : "path to image, relative to the /public folder"

* /pdf/load : "path to PDF file, relative to the /public folder"

* /pdf/page : number - sets page number of PDF to display

* /sample/load : "path to sound file, relative to the /public folder"

* /sample/play : 1/0 to play or stop sample

* /form/input : "display text for input field"

#### Edit Methods

The following methods require an additional command name following them to define the parameter to set. For example, to set the fill color for a an object named `foo` on `/svgdraw/1` to be red, you would send the message: `/svgdraw/1/foo/style/fill : "red"`.

* /style -- a CSS style commands. Some common SVG style commands are:
  * /fill : "color string", sets the fill color
  * /stroke-width : number
  * /stroke : "color string", sets the stroke color

* /transform -- CSS transform commands. Some common transform commands are:
  * /translate : [x, y], moves the object from its current location by the xy values
  * /rotate : degrees, rotates the object
  * /scale : [x, y], stretches the object in the xy axis as specified.

* /attr -- sets an attribute of an HTML node. For example you could use this to set a custom mouse event handler, or other HTML or SVG attributes that can't be accessed via CSS.

#### Delete Method

* /remove -- removes the object with the preceding unique id.

### Special Functions

* `processCmdObj(obj)` -- The main parsing function in the `max-svgdraw-client.js` is called `processCmdObj` which processes a Javscript object containing one or more method messages. This function can be accessed also from event handlers set by the `/attr` method. For example: `/foo/attr/onclick : "processCmdObj({ '/foo/style/fill' : 'red' })"`
