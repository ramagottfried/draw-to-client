inlets = 3;
outlets = 3;

include("xml2json");

var output = new Dict();
output.name = "output";
var sg = {};
var groups = ["score"];
var groupcount = 0;
var staffBoundingInfo = [];
var staffBoundingFlag = 0;
var scoreLayout = [];
var spacing = [];
var staffSpacing = {}; 
var boundingBox = [];
var boundingBoxTop = [];
var c;
var fontMap = new Dict();
fontMap.name = "Bravura";
fontMap.pull_from_coll("MaxScoreBravuraMap");
var fontExtras = new Dict();
fontExtras.name = "Extras";
fontExtras.pull_from_coll("MaxScoreFontExtrasMap");
var textFont = "Arial";
var textFontSize = "12.";
var mgraphics = new JitterObject("jit.mgraphics", 320, 240);
var outmatrix = new JitterMatrix(4, "char", 320, 240);
var setStaffGroup = [];
var flag = 0;
var tempoflag = 0;
var oldIndex = [];
var notes = 0;
var stems = {};
var cursors = new Dict();
cursors.name = "cursors";
var cursorAttr = new Dict();
cursorAttr.name = "cursorAttr";
var dumpflag = 0;
var dump = [];
var json = {};
var tempo = 60;
var timesig = [4, 4];
var svg = new Dict();
svg.name = "svg";
var imageTable = {};



if (jsarguments.length >= 2 &&  jsarguments[1] == "@staffgroups") 
{	
	setStaffGroup = jsarguments.slice(2);
	if (setStaffGroup[0] != "score" && setStaffGroup[0] != "parts") 
		{
		fillObj(setStaffGroup);
		flag = 1;
		}
}

//if no argument is given, derive from numStaves
//if message is sent later, inroduct if statement to check for valid message in getNumStaves

function staffgroups()
{
	if (inlet == 2)
	{
	flag = 0;
	setStaffGroup = arrayfromargs(arguments);	
	if (setStaffGroup[0] != "score" && setStaffGroup[0] != "parts") 
		{
		fillObj(setStaffGroup);
		flag = 1;
		}
	}
}

function fillObj(groups)
{
	sg = {};
	if (typeof groups == "object") {
	groupcount = groups.length;
	post("fillObj", groups, groupcount, "\n");	
	for (var g = 0; g < groupcount; g++)
	{
	post("fillObj", g, groups[g], "\n");	
		if (typeof groups[g] == "number") sg[g] = groups[g];	
		else 
		{
		if (groups[g].indexOf("+") != -1) 
		{
			sg[g] = toNumber(groups[g].split("+"));
		} 
		else 
			{
			if (groups[g].indexOf("-") != -1) {
		 	var delim = groups[g].split("-");
			var voices = [];
			for (var v = delim[0]; v <= delim[1]; v++)
			{
			voices.push(parseInt(v));
			}
			}
			sg[g] = voices;
		}
		}
	}
	}
	else {
	groupcount = 1;
		if (typeof groups == "number") sg[0] = groups;	
		else 
		{
		if (groups.indexOf("+") != -1) 
		{
			sg[0] = toNumber(groups.split("+"));
		} 
		else 
			{
			if (groups.indexOf("-") != -1) {
		 	var delim = groups.split("-");
			var voices = [];
			for (var v = delim[0]; v <= delim[1]; v++)
			{
			voices.push(parseInt(v));
			}
			}
			sg[0] = voices;
		}
		}
	}
}

function getNumStaves(n)
{
	//issue when numStaves changes!!!
	if (flag == 0)
	{
	if (setStaffGroup == "parts") {
		var parts = [];
		for (var i = 0; i < n; i++) parts.push(i); 
		fillObj(parts);
		}
	else fillObj("0-" + (n - 1));
	flag = 1;	
	}
//	if (scoreLayout[1] == 0) outlet(1, "getScoreTopMarginOfFirstPage");
//	else scoreTopMarginOfFirstPage = 0.;
//	outlet(1, "getScoreTopMargin");	
	staffBoundingInfoFlag = 0;
	post("staffBoundingInfo3", staffBoundingFlag, "\n");
	for (var b = 0; b < n; b++){
		outlet(1, "getStaffSpacing", b);
		outlet(1, "getStaffBoundingInfo", 0, b);
	}
}

/*
function getNumMeasures(n)
{
	for (var i = 0; i < n; i++) outlet(1, "getMeasureInfo", i);	
}


function getScoreTopMargin(margin)
{
	scoreTopMargin = margin;
}
*/

function getStaffSpacing(staffIndex, a, b)
{
	spacing[staffIndex] = (a + b) * scoreLayout[3];
	staffSpacing[staffIndex] = [a * scoreLayout[3], b * scoreLayout[3]];
}

function getStaffBoundingInfo(measureIndex, staffIndex, x, y, width, height, marginX)
{
	post("staffBoundingInfo", staffBoundingFlag, measureIndex + "::" + staffIndex, x, y, width, height, marginX, "\n");
	//this can be potentially iffy if number of stafflines changes from measure to measure.
	if (staffBoundingFlag == 0){
	boundingBox[staffIndex] = spacing[staffIndex] + height;
	boundingBoxTop[staffIndex] = y;
	}
	else {
		staffBoundingInfo = [x, y, width, height, marginX];
	}
}

function remap(staffGroup, staffIndex, position)
{
	var dest = [];
	// get occurences of staffIndex in staffgroup #s  
	var idx = getAllIndexes(staffGroup, staffIndex);
	//post("staffgroup", staffGroup, "contains staffline from staff", staffIndex, "at position", position, "in boxes", idx, "\n");
	if (idx != -1)
	{
 	for (i = 0; i < idx.length; i++){
	// y - (top margin + sum of source boxes) 
	var sourceBoxes = 0;
	for (j = 0; j < staffIndex; j++) sourceBoxes += boundingBox[j];
//	var delta = position - (scoreTopMarginOfFirstPage + scoreTopMargin + sourceBoxes);
	var delta = position - sourceBoxes;
	// top margin + sum of destination boxes + delta
	var destinationBoxes = 0;
	for (j = 0; j < idx[i]; j++) destinationBoxes += boundingBox[staffGroup[j]];
	//dest.push(scoreTopMarginOfFirstPage + scoreTopMargin + destinationBoxes + delta);
	dest.push(destinationBoxes + delta);
	//post("dest", scoreTopMarginOfFirstPage, scoreTopMargin, destinationBoxes, delta, dest, "\n");
	}
	}
	if (dest.length != 0) return dest;
	else return idx;
}

function writeAt(s, c, f, fs, x, y, t)
{
			if (!isNaN(parseInt(t))) t = parseInt(t);
 			post("t", t, typeof t, "\n");
			var xoffset = (tempoflag == 1) ? 10. : 0.;
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "none");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-family", f);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-size", fs);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/text", x + xoffset, y, t);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [1., 0., 0., 1., 0., 0.]);	
}

function text_measure(f, fs, t)
{
			mgraphics.select_font_face(f);
			mgraphics.set_font_size(fs);
			return mgraphics.text_measure(t);
			//post("text_measure", mgraphics.text_measure("The quick brown fox jumps over the lazy dog"), "\n");
}

function writeStem()
{
			if (!isEmpty(stems)){
			var y = [];
			for (var key in stems)
			{
			y.push(stems[key][1]);
			}
			if (stems[key][8] == "STEM_UP") var xoffset	= -0.4;
			else var xoffset = 0;		
			var bottom = arrayMax(y);
			var top = arrayMin(y);
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], stems[key][5], top);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			c++;
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/rect", stems[key][0] + 7. + xoffset, dest[d] - 22, 0.75, bottom - top + 20.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.4);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [1., 0., 0., 1., 0., 0.]);
			}
		}
	}
}				
}

function anything() {
    var msg = arrayfromargs(arguments);
    switch (messagename) {
        case "scoreLayout":
			scoreLayout = msg;
            post("scoreLayout", msg, "\n");
            break;
        case "startRenderDump":
			output.clear();
   			c = 0;
            outlet(1, "getNumStaves");
            break;
        case "frgb":
            var frgb = msg;
            break;
        case "clearGraphics":
			for (var s = 0; s < groupcount; s++)
			{
            output.set("/svgdraw/" + (s + 1) + "/clear", 1);
			output.set("/svgdraw/" + (s + 1) + "/main/style/background-color", "ivory");
			}
            break;
        case "writeat":
			for (var s = 0; s < groupcount; s++)
			{
           	c++;
			writeAt(s, c, "Arial", 10., msg[0], msg[1], msg[2]);
			}
			tempoflag = 0;		
            break;
        case "StaffLine":
			//StaffLine measureIndex staffIndex staffLineIndex zoom x1 y1 x2 y2 selected
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], msg[1], msg[5]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			c++;
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", "M" + msg[4] + "," + dest[d] + " L" + msg[6] + "," + dest[d]);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.4);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [1., 0., 0., 1., 0., 0.]);
			}
			}
			}
			break;
        case "LedgerLine":
			//LedgerLine measureIndex staffIndex trackIndex noteIndex ledgerLineIndex zoom x1 y1 x2 y2
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], msg[1], msg[7]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			c++;
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", "M" + msg[6] + "," + dest[d] + " L" + msg[8] + "," + dest[d]);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.4);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [1., 0., 0., 1., 0., 0.]);
			}
			}
			}
            break;
        case "Slur":
			//Slur measureIndex1 staffIndex1 trackIndex1 noteIndex1 measureIndex2 staffIndex2 trackIndex2 noteIndex2 zoom x y width height
  			var orient = (msg[13] == "up") ? -1 : 1;
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], msg[1], msg[10]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			c++;
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.4);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", "M0,1.1l0-0.2c19.9,9.6,79.9,9.6,100,0v0.2C79.9,11.8,19.9,11.8,0,1.1");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [msg[11]/100., 0., 0., orient, msg[9], dest[d] + 7]);
			}
			}
			}
           break;
        case "Tie":
			//Tie measureIndex1 staffIndex1 trackIndex1 noteIndex1 measureIndex2 staffIndex2 trackIndex2 noteIndex2 zoom x y width height
			//Tie 0. 0. 0. 0. 0. 0. 0. 1. 0.5 94.120689 54. 60. 15. up
			//This is a svg tie scaled to 100 px: "M0,1.1l0-0.2c19.9,9.6,79.9,9.6,100,0v0.2C79.9,11.8,19.9,11.8,0,1.1"
 			var orient = (msg[13] == "up") ? -1 : 1;
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], msg[1], msg[10]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			c++;
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.4);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", "M0,1.1l0-0.2c19.9,9.6,79.9,9.6,100,0v0.2C79.9,11.8,19.9,11.8,0,1.1");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [msg[11]/100., 0., 0., orient, msg[9], dest[d] + 7.]);
			}
			}
			}
            break;
        case "TieOut":
			//TieOut measureIndex staffIndex trackIndex noteIndex zoom x y width height
  			var orient = (msg[9] == "up") ? -1 : 1;
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], msg[1], msg[6]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			c++;
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.4);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", "M0,1.1l0-0.2c19.9,9.6,79.9,9.6,100,0v0.2C79.9,11.8,19.9,11.8,0,1.1");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [msg[7]/100., 0., 0., orient, msg[5], dest[d] + 7.]);
			}
			}
			}
           break;
        case "TieIn":
			//TieIn measureIndex staffIndex trackIndex noteIndex zoom x y height
			//TieOut measureIndex staffIndex trackIndex noteIndex zoom x y width height
  			var orient = (msg[9] == "up") ? -1 : 1;
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], msg[1], msg[6]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			c++;
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.4);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", "M0,1.1l0-0.2c20,9.6,80,9.6,100,0v0.2C80,11.8,20,11.8,0,1.1");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [msg[7]/100., 0., 0., orient, msg[5], dest[d] + 7.]);
			}
			}
			}
            break;
        case "cresc":
			//cresc|decresc measureIndex1 staffIndex1 trackIndex1 noteIndex1 measureIndex2 staffIndex2 trackIndex2 noteIndex2 zoom x1 y x2 startContinued endContinued
			//cresc 0. 0. 0. 0. 0. 0. 0. 1. 0.5 89.620689 105. 157.620697 false false
			var type = 2 * JSON.parse(msg[12]) + JSON.parse(msg[13]);
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], msg[1], msg[10]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			c++;
			var path ="";
			switch (type){
			case 0 :
			path = "M0,0L100,7.5,0,15";
				break;
			case 1 :
			path = "M0,0L100,5M100,10L0,15";
				break;
			case 2 :
			path = "M0,2.5L100,7.5,0,12.5";
				break;
			case 3 :
			path = "M0,2.5L100,5M100,10L0,12.5";
				break;
			}			
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", path);
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "none");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.6);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [(msg[11]-msg[9])/-100., 0., 0., 1., msg[11], dest[d]]); //maybe +7.5
			}
			}
			}			
            break;
        case "decresc":
			//decresc 0. 0. 0. 0. 0. 0. 0. 1. 0.5 157.620697 105. 89.620689 false false
			//post("type", msg[12], msg[13], JSON.parse(msg[12]), JSON.parse(msg[13]), "\n");	
			var type = 2 * JSON.parse(msg[12]) + JSON.parse(msg[13]);
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], msg[1], msg[10]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			c++;
			var path ="";
			switch (type){
			case 0 :
			path = "M0,0L100,7.5,0,15";
				break;
			case 1 :
			path = "M0,0L100,5M100,10L0,15";
				break;
			case 2 :
			path = "M0,2.5L100,7.5,0,12.5";
				break;
			case 3 :
			path = "M0,2.5L100,5M100,10L0,12.5";
				break;
			}			
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", path);
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "none");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.6);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [(msg[9]-msg[11])/100., 0., 0., 1., msg[11], dest[d]]);
			}
			}
			}			
            break;
        case "stem":
			//stem 83.620689 67. 0.5 Note 0. 0. 0. 0. STEM_UP
			var index = [msg[4], msg[5], msg[6], msg[7], msg[8]];
			if (JSON.stringify(index) === JSON.stringify(oldIndex)) {
			notes++;
			stems[notes] = msg;
			}
			else {
			writeStem();
			stems = {};
			notes = 0;	
			stems[notes] = msg;
			}
			oldIndex = index;
            break;
        case "barline":
			//barline 0. 0.5 20. 51. 363. 1.
			//barline measureIndex zoom x barTop barBottom barThickness
			for (var s = 0; s < groupcount; s++)
			{
				if (typeof sg[s] == "number") 
				{
					var top = boundingBoxTop[0];
					var bottom = boundingBoxTop[0] + boundingBox[sg[s]] - staffSpacing[sg[s]][1] - staffSpacing[sg[s]][0];
				}
				else 
				{
				post("staffspacing", boundingBoxTop[0], boundingBox[0], staffSpacing[0][1],  "\n");
				var top = boundingBoxTop[0];
				var destinationBoxes = 0;
				for (j = 0; j < sg[s].length; j++) destinationBoxes += boundingBox[sg[s][j]];
				var bottom = boundingBoxTop[0] + destinationBoxes - staffSpacing[sg[s][j-1]][1] - staffSpacing[sg[s][0]][0];
				}
			c++;			
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/rect", msg[2], top, msg[5] - 0.4, bottom - top);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "none");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.4);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [1., 0., 0., 1., 0., 0.]);			
			}
            break;
        case "RepeatDots":
			//RepeatDots:measureIndex, staffIndex, zoom, x, y, TopLineOfStaffY
			var glyph = fontMap.get("staccato");
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], msg[1], msg[5]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			c++;
		    output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-family", glyph[3]);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-size", glyph[4] - 6);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/music", glyph[1] + msg[3] - 1.5, glyph[2] + dest[d] + 15.5, glyph[0].charCodeAt(0).toString(16));
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [1., 0., 0., 1., 0., 0.]);
			c++;
		    output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-family", glyph[3]);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-size", glyph[4] - 6);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/music", glyph[1] + msg[3] - 1.5, glyph[2] + dest[d] + 21.5, glyph[0].charCodeAt(0).toString(16));
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [1., 0., 0., 1., 0., 0.]);
			}
			}
			}
            break;
        case "Gliss":
			//Gliss, measureIndex, staffIndex, trackIndex, noteIndex, measureIndex2, staffIndex2, trackIndex2, noteIndex2, zoom, x1, y1, x2, y2
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], msg[1], msg[10]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			c++;
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", "M" + msg[9] + "," + dest[d] + " L" + msg[11] + "," + msg[12]);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.4);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [1., 0., 0., 1., 0., 0.]);
            }
			}
			}
			break;
        case "TupletBracket":
			//below: TupletBracket 0. 0. 0. 0. 0. 0. 0. 2. 0.5 80.120689 124.620689 140.620697 185.120697 90. 84. up 3.
			//above: TupletBracket 0. 0. 0. 0. 0. 0. 0. 2. 0.5 87.120689 131.620697 147.620697 192.120697 54. 60. down 3.
  			var orient = (msg[15] == "up") ? -1 : 1;
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], msg[1], msg[14]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			c++;
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "none");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.4);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", "M0,6L0,0,42,0M58,0,100,0,100,6");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [(msg[12] - msg[9])/100., 0., 0., orient, msg[9], dest[d] - orient * 6]);
			}
			}
			}
            break;
        case "printScoreTitle":
			//printScoreTitle 0.5 120. 34. JMSLMaxScore-118
			post("position", scoreLayout[4], msg[3], text_measure("Times New Roman", 26, msg[3]), "\n");	
			var x = (scoreLayout[4] - text_measure("Times New Roman", 26, msg[3])[0]) / 2;
			for (var s = 0; s < groupcount; s++)
			{
			c++;
			writeAt(s, c, "Times New Roman", 26, x, msg[2] + 15, msg[3]);
			}
            break;
        case "printScoreSubtitle":
			post("position", scoreLayout[4], msg[3], text_measure("Times New Roman", 12, msg[3]), "\n");	
			var x = (scoreLayout[4] - text_measure("Times New Roman", 12, msg[3])[0]) / 2;
			for (var s = 0; s < groupcount; s++)
 			{
			c++;
			writeAt(s, c, "Times New Roman", 12, x, msg[2] + 15, msg[3]);
			}
           break;
        case "printComposer":
			var x = scoreLayout[4] - text_measure("Times New Roman", 12, msg[3])[0] - 30;
			for (var s = 0; s < groupcount; s++)
			{
			c++;
			writeAt(s, c, "Times New Roman", 12, x, msg[2] + 15, msg[3]);
			}
            break;
        case "RenderMessage":
 			var e = new Dict();
			e.name = msg[msg.length - 1];
			var picster = e.get("picster-element");
			var keys = picster.getkeys();
			switch (msg[0]){
				case "note" :
            	var RenderMessageOffset = [msg[5], msg[6]];
				break;
				case "staff" :
            	var RenderMessageOffset = [msg[3], msg[4]];
				break;
				case "measure" :
            	var RenderMessageOffset = [msg[2], msg[3]];
				break;
			}
			//if (commands == "fill") ;
			for (var s = 0; s < groupcount; s++) {
			var dest = remap(sg[s], msg[2], RenderMessageOffset[1]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			for (var k = 0; k < keys.length; k++) {
 //           var element = keys[k].substr(0, keys[k].indexOf('_'));
            var dict = picster.get(keys[k]);
            var commands = dict.get("commands");
          var info = dict.get("info");
            var ckeys = commands.getkeys();
           var ikeys = info.getkeys();
					var path = "";
					var mode = "none";
            		c++;
                    for (var i = 0; i < ckeys.length; i++) {
                        var command = commands.get(ckeys[i]);
                      switch (command[0]) {
                            case "color":
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "rgb("+ Math.round(command[1] * 255) + "," + Math.round(command[2] * 255) + "," + Math.round(command[3] * 255) + ")");
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", command[4]);
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "none");
								var svgcolor = "rgb("+ Math.round(command[1] * 255) + "," + Math.round(command[2] * 255) + "," + Math.round(command[3] * 255) + ")";
             					var svgopacity = command[4];
                   				break;
                            case "pen_size":
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", command[1]);
                                break;
                            case "line":
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", "M" + command[1] + "," + command[2] + " L" + command[3] + "," + command[4]);
                                break;
                            case "rectangle":
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/rect", [command[1] - command[3]/2., command[2] - command[4]/2., command[3], command[4]]);
                                break;
                            case "ellipse":
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/ellipse", [command[1], command[2], command[3]/2., command[4]/2.]);
                                break;
                           case "ovalarc":
								//$5 $6 $1 $2 $3 $4
								//ovalarc(command[5], command[6], command[1], command[2], command[3], command[4]);
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", ovalarc(command[5], command[6], command[1], command[2], command[3], command[4]));
                                break;
                            case "f": //should be "fill" but this get trunkated to f as it doesn't have a value.
 							//set fill color here
 								output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", svgcolor);
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", svgopacity);
                               break;
                            case "textcolor":
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "rgb("+ Math.round(command[1] * 255) + "," + Math.round(command[2] * 255) + "," + Math.round(command[3] * 255) + ")");
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", command[4]);
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "rgb("+ Math.round(command[1] * 255) + "," + Math.round(command[2] * 255) + "," + Math.round(command[3] * 255) + ")");
                                output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", command[4]);
            					output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.);
                               break;
                            case "font":
            					output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-family", command[1]);
            					output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-size", command[2]);
								if (command.length == 3) output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-style", "normal", "normal");
								else if (command.length == 4) output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-style", command[3], "normal");
								else if (command.length == 5) output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-style", command[3], command[4]);
								mode = "Text";
                            	break;
                            case "write":
            					output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/text", moveTo[0], moveTo[1], command[1]);
 								mode = "none";
                               	break;
							//accum data and create message after switch loop
                            case "move_to":
 								if (mode == "Text") var moveTo = [command[1], command[2]];
								else {
 								if (mode != "M") path = path + "M";
								path = path + command[1] + "," + command[2];
								mode = "M";
								}
                                break;
                            case "line_to":
								if (mode != "L") path = path + "L";
								else path = path + ",";
								path = path + command[1] + "," + command[2];
								mode = "L";
                                break;
                            case "curve_to":
 								if (mode != "C") path = path + "C";
								else path = path + ",";
								path = path + command[1] + "," + command[2] + "," + command[3] + "," + command[4]+  "," + command[5] + "," + command[6];
								mode = "C";
                               break;
                            case "raster":
								//dims and path need to be written to object and retrieved when svg is written
								imageTable[command[1].split('/')[command[1].split('/').length - 1]] = [command[1].substring(command[1].indexOf(":") + 1), info.get("a")[0], info.get("b")[1]];
								output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/img", command[1].split('/')[command[1].split('/').length - 1]);
                                break;
                            case "svg":
								output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/img", command[1].split('/')[command[1].split('/').length - 1]);
                                break;
                        	}
						}
 						if (path != "") output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/path", path);
            			var origin = info.get("origin");
            			var transform = info.get("transform");
						//transform[4] + origin[1] + dest[d]
            			post("dest", dest, origin, msg[2], RenderMessageOffset[1], msg[5], msg[6], "\n");
						output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [transform[0], transform[1], transform[2], transform[3], transform[4] + origin[0] + RenderMessageOffset[0], transform[4] + origin[1] + dest[d]]);
                   }
				}
			}
			}
            break;
        case "endRenderDump":
			writeStem();
			stems = {};
            outlet(0, "dictionary", output.name);
            break;
		case "tempoqtrequals":
			for (var s = 0; s < groupcount; s++)
			{
			for (var i = 0; i < 2; i++) {
			c++;
			var glyph = fontMap.get("tempoqtrequals");
		    output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "none");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 0.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-family", glyph[i*5+3]);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-size", glyph[i*5+4]);
			output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/music", glyph[i*5+1] + msg[0], glyph[i*5+2] + msg[1], glyph[i*5+0].charCodeAt(0).toString(16));
           	output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [1., 0., 0., 1., 0., 0.]);
			}
			}
			tempoflag = 1;
            break;
		case "startdump" :
			dump = [];
			json = {};
			dumpflag = 1;
			break;
		case "enddump" :
			json = xml2json(dump.join(" "));
			tempo = json["measure"]["TEMPO"];
			timesig = json["measure"]["TIMESIG"].split(" ");
			//post("json", JSON.stringify(json), "\n");	
			dumpflag = 0;
			break;
        default:
		if (dumpflag == 1) {
			dump.push(messagename);
		}
		else {
		if (fontMap.contains(messagename)) var glyph = fontMap.get(messagename);
		else if (fontExtras.contains(messagename)) var glyph = fontExtras.get(messagename); 
		else return;
		var multiple = glyph.length / 5;
			for (var s = 0; s < groupcount; s++)
			{
			var dest = remap(sg[s], msg[5], msg[1]);
			if (dest != -1)
			{
			for (var d = 0; d < dest.length; d++) {
			for (var i = 0; i < multiple; i++) {
			c++;
		    output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill", "black");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/fill-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke", "none");
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-width", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/stroke-opacity", 1.);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-family", glyph[i*5+3]);
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/style/font-size", glyph[i*5+4]);
			if (typeof glyph[i*5+0] == "number") output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/text", glyph[i*5+1] + msg[0], glyph[i*5+2] + dest[d], glyph[i*5+0].toString());
            else output.set("/svgdraw/" + (s + 1) + "/" + c + "/draw/music", glyph[i*5+1] + msg[0], glyph[i*5+2] + dest[d], glyph[i*5+0].charCodeAt(0).toString(16));
            output.set("/svgdraw/" + (s + 1) + "/" + c + "/transform/matrix", [1., 0., 0., 1., 0., 0.]);
			}
			}
			}
		  }
       }
	}
}

function writePNG()
{
	outmatrix.dim = [scoreLayout[4], scoreLayout[5]];
	mgraphics.dim = [scoreLayout[4], scoreLayout[5]];
	post("dim", outmatrix.dim, "\n");
	mgraphics.set_source_rgba(1., 1., 0.94, 1.);
	mgraphics.paint();
 	mgraphics.identity_matrix();
	//var svg_string = "<svg><text x=\"97.6\" y=\"300.0\" font-family=\"Bravura\" font-style=\"normal\" font-weight=\"normal\" font-size=\"48.0\" fill=\"#000000\" fill-opacity=\"1.0\" transform=\"scale(0.552500,0.552500)\" xml:space=\"preserve\"></text></svg>";

	//for every line with given count #: if second to last string != draw incremental write to object with key >= 1, 
	//else write to object with key 0
	//create svg string 
	var j = 1;
	var oldID = 1;
	var keys = output.getkeys();
	for (var i = 0; i < keys.length; i++) {
	var oscAddress = keys[i].split('/');
	var id = oscAddress[3];
	if (!isNaN(parseInt(id))){
	var svgElement = oscAddress[5];
	var svgAttribute = output.get(keys[i]);
	if (id == oldID) {
	if (oscAddress[4] != "draw") {
		svg.replace(j + "::" + svgElement, svgAttribute);
		j++;
		}
	else svg.replace(0 + "::" + svgElement, svgAttribute);
	}
	else {
		if (svg.get(0).getkeys() != "img") createSVG(j);
		else {
		mgraphics.transform(svg.get(1).get(svg.get(1).getkeys()));		
		mgraphics.image_surface_draw(svg.get(0).get(svg.get(0).getkeys()));
 		mgraphics.identity_matrix();
		}
		j = 1;
		svg.clear();	
		if (oscAddress[4] != "draw") {
		svg.replace(j + "::" + svgElement, svgAttribute);
		j++;
		}
	else svg.replace(0 + "::" + svgElement, svgAttribute);
	}
	oldID = id;	 
	}
	}
	createSVG(j);
	mgraphics.matrixcalc(outmatrix, outmatrix);
	outlet(2, "jit_matrix", outmatrix.name);
	outlet(2, "exportimage", "Macintosh HD:/Users/Shared/Max 8/Library/MaxScore/node.js/draw-to-client/v3-max/public/test.png");
}

function createSVG(j) {
		var svg_string = "";
		for (var k = 0; k < j ; k++){
		var elem = svg.get(k).getkeys();
		var attr = svg.get(k).get(elem);
		post("svg", elem, attr, "\n");
		if (k == 0) {
			switch (elem){
			case "path" :
				svg_string = "<svg><path " + "d=\"" + attr + "\" ";
				break;
			case "rect" :
				svg_string = "<svg><rect x=\"" + attr[0] + "\" y=\"" + attr[1] + "\" width=\"" + attr[2] + "\" height=\"" + attr[3] + "\" ";
				break;
			case "ellipse" :
				svg_string = "<svg><ellipse cx=\"" + attr[0] + "\" cy=\"" + attr[1] + "\" rx=\"" + attr[2] + "\" ry=\"" + attr[3] + "\" ";
				break;
			case "text" :
				svg_string = "<svg><text x=\"" + attr[0] + "\" y=\"" + attr[1] + "\" ";
				break;				
			case "music" :
				svg_string = "<svg><text x=\"" + attr[0] + "\" y=\"" + attr[1] + "\" ";
				break;				
			}
		}
		else {
			if (elem == "matrix") svg_string +=  "transform=\"" + elem + "(" + attr + ")\" ";
			else svg_string += elem + "=\"" + attr + "\" ";
			}
		}
		if (svg.get(0).getkeys() == "music") svg_string += ">" + String.fromCharCode("0x" + svg.get(0).get(svg.get(0).getkeys())[2]) + "</text></svg>";
		else if (svg.get(0).getkeys() == "text") svg_string += ">" + htmlEntities(svg.get(0).get(svg.get(0).getkeys())[2]) + "</text></svg>";
		else svg_string += "/></svg>";
		post("svg", svg_string, "\n");
		mgraphics.svg_create("svg_string", svg_string);
		mgraphics.svg_render("svg_string");
}
createSVG.local = 1;

function writeSVG()
{
	f = new File("Macintosh HD:/Users/Shared/Max 8/Library/MaxScore/node.js/draw-to-client/v3-max/public/test.svg", "write");
	f.open();
	f.writeline("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
	f.writeline("<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">");
	f.writeline("<svg width=\"" + scoreLayout[4] + "px\" height=\"" + scoreLayout[5] + "px\" viewBox=\"0 0 " + scoreLayout[4] + " " + scoreLayout[5] + "\" style=\"background: ivory\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\">");
	var j = 1;
	var oldID = 1;
	var keys = output.getkeys();
	for (var i = 0; i < keys.length; i++) {
	var oscAddress = keys[i].split('/');
	var id = oscAddress[3];
	if (!isNaN(parseInt(id))){
	var svgElement = oscAddress[5];
	var svgAttribute = output.get(keys[i]);
	if (id == oldID) {
	if (oscAddress[4] != "draw") {
		svg.replace(j + "::" + svgElement, svgAttribute);
		j++;
		}
	else svg.replace(0 + "::" + svgElement, svgAttribute);
	}
	else {
	f.writeline(createSVG2(j));
		j = 1;
		svg.clear();	
		if (oscAddress[4] != "draw") {
		svg.replace(j + "::" + svgElement, svgAttribute);
		j++;
		}
	else svg.replace(0 + "::" + svgElement, svgAttribute);
	}
	oldID = id;	 
	}
	}
	f.writeline(createSVG2(j));
	f.writeline("</svg>");	
	f.close();
}

function createSVG2(j) {
		var svg_string = "";
		for (var k = 0; k < j ; k++){
		var elem = svg.get(k).getkeys();
		var attr = svg.get(k).get(elem);
		if (k == 0) {
			switch (elem){
			case "path" :
				svg_string = "<path d=\"" + attr + "\" ";
				break;
			case "rect" :
				svg_string = "<rect x=\"" + attr[0] + "\" y=\"" + attr[1] + "\" width=\"" + attr[2] + "\" height=\"" + attr[3] + "\" ";
				break;
			case "ellipse" :
				svg_string = "<ellipse cx=\"" + attr[0] + "\" cy=\"" + attr[1] + "\" rx=\"" + attr[2] + "\" ry=\"" + attr[3] + "\" ";
				break;
			case "text" :
				svg_string = "<text x=\"" + attr[0] + "\" y=\"" + attr[1] + "\" ";
				break;				
			case "music" :
				svg_string = "<text x=\"" + attr[0] + "\" y=\"" + attr[1] + "\" ";
				break;				
			//<image x="0." y="0." width="22.0" height="198.0" xlink:href="file:///Users/Shared/Max 7/Packages/MaxScore/media/Images/brace.png" preserveAspectRatio="none" transform="matrix(0.2762,0.0000,0.0000,0.1674,23.7575,49.7250)"/>
			case "img" :
				post(attr, imageTable[attr], "\n");
				svg_string = "<image x=\"" + 0. + "\" y=\"" + 0. + "\" width=\"" + imageTable[attr][1] + "\" height=\"" + imageTable[attr][2] + "\" xlink:href=\"file://" + imageTable[attr][0] + "\" ";
				break;				
			}
		}
		else {
			if (elem == "matrix") svg_string +=  "transform=\"" + elem + "(" + attr + ")\" ";
			else svg_string += elem + "=\"" + attr + "\" ";
			}
		}
		if (svg.get(0).getkeys() == "music") svg_string += ">" + String.fromCharCode("0x" + svg.get(0).get(svg.get(0).getkeys())[2]) + "</text>";
		else if (svg.get(0).getkeys() == "text") svg_string += ">" + htmlEntities(svg.get(0).get(svg.get(0).getkeys())[2]) + "</text>";
		else svg_string += "/>";
		post("svg", svg_string, "\n");
		return svg_string;
}
createSVG2.local = 1;


function htmlEntities(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;"); //"
}

function ovalarc(startangle, endangle, cx, cy, r1, r2) {
//var endangle = startangle + angle;
		startangle += Math.PI/2.;
		endangle += Math.PI/2.;
        // Compute the two points where our wedge intersects the circle.
        // These formulas are chosen so that an angle of 0 is at 12 o'clock
        // and positive angles increase clockwise.
        var x1 = cx + r1 * Math.sin(startangle);
        var y1 = cy - r2 * Math.cos(startangle);
        var x2 = cx + r1 * Math.sin(endangle);
        var y2 = cy - r2 * Math.cos(endangle);
        // This is a flag for angles larger than than a half-circle
        var big = 0;
//        if (endangle - startangle > Math.PI) big = 1;
		if (endangle - startangle < 0) endangle =+ Math.PI*2;
		if (endangle - startangle > Math.PI) big = 1;

        // This string holds the path details
        var d = "M" + cx + "," + cy + "M" + x1 + "," + y1 + "A" + r1 + "," + r2 + ",0 ," + big + ",1 " + x2 + "," + y2;           
//            + " Z\"";                       // Close path back to (cx,cy)
 		return d;
}


function cursor()
{
	var msg = arrayfromargs(arguments);
	//split message into attributes
	var id = msg[0];
	switch (msg[1]){
	case "countdown":
		
		break;
	case "start":
		var color = cursorAttr.get(id + "::@color");
		cursors.clear();
		var range = [];
		for (var j = cursorAttr.get(id + "::@begin")[0]; j <= cursorAttr.get(id + "::@end")[0]; j++) range.push(j);
		for (var s = 0; s < groupcount; s++)
		{
		if (range.indexOf(s) != -1){
        cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/style/fill", "rgb("+ Math.round(color[0] * 255) + "," + Math.round(color[1] * 255) + "," + Math.round(color[2] * 255) + ")");
        cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/style/fill-opacity", Math.round(color[3] * 255));
 		cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/style/transition", "transform " + cursorAttr.get(id + "::@trajectory::0")[2]/1000. + "s linear");
		cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/transform/translate", [cursorAttr.get(id + "::@trajectory::0")[1] - cursorAttr.get(id + "::@trajectory::0")[0], 0]);
		outlet(0, "dictionary", cursors.name);
		}
		}
		break;
	case "stop":
		var color = cursorAttr.get(id + "::@countdowncolor");
		cursors.clear();
		var range = [];
		for (var j = cursorAttr.get(id + "::@begin")[0]; j <= cursorAttr.get(id + "::@end")[0]; j++) range.push(j);
		for (var s = 0; s < groupcount; s++)
		{
		if (range.indexOf(s) != -1){
        cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/draw/rect", cursorAttr.get(id + "::@trajectory::0")[0], cursorAttr.get(id + "::@extent")[0], 2., cursorAttr.get(id + "::@extent")[1] - cursorAttr.get(id + "::@extent")[0]);
   		cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/style/transition", "transform 0s linear");
     	cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/style/fill", "rgb("+ Math.round(color[0] * 255) + "," + Math.round(color[1] * 255) + "," + Math.round(color[2] * 255) + ")");
        cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/style/fill-opacity", Math.round(color[3] * 255));
		cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/transform/translate", [0, 0]);
		outlet(0, "dictionary", cursors.name);	
		}
		}	
		break;
	case "pause":
		
		break;
	case "resume":
		
		break;
	case "blink":
		
		break;
	case "show":
		cursors.clear();
		var range = [];
		for (var j = cursorAttr.get(id + "::@begin")[0]; j <= cursorAttr.get(id + "::@end")[0]; j++) range.push(j);
		for (var s = 0; s < groupcount; s++)
		{
		if (range.indexOf(s) != -1){
        cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/style/fill-opacity", msg[2]);
		outlet(0, "dictionary", cursors.name);	
		}
		}			
		break;
	default :
	var occurence = [];
	for (var i = 1; i < msg.length; i++){
		if (msg[i].toString().indexOf("@") != -1) occurence.push(i); 
		}
	//send defaults once:
	cursorAttr.replace(id + "::@begin", [0, 0]);	
	cursorAttr.replace(id + "::@end", [0, 0]);	
	cursorAttr.replace(id + "::@passes", 1);	
	cursorAttr.replace(id + "::@timestretch", 1);	
	cursorAttr.replace(id + "::@color", [0.25, 1, 0.25, 1]);	
	cursorAttr.replace(id + "::@countdowncolor", [1, 0, 0, 1]);	
	cursorAttr.replace(id + "::@shape", "line");	
	cursorAttr.replace(id + "::@notevalue", 1.);	
	for (var i = 0; i < occurence.length; i++){
		var attribute =  msg.slice(occurence[i], occurence[i+1]);
		post("attribute", id + "::" + attribute[0], attribute.slice(1, attribute.length), "\n");
		cursorAttr.replace(id + "::" + attribute[0], attribute.slice(1, attribute.length));
		}
		var stretch = cursorAttr.get(id + "::@timestretch");
		var startStaff = cursorAttr.get(id + "::@begin")[1];
		var endStaff = cursorAttr.get(id + "::@end")[1];
//		for (var i = cursorAttr.get(id + "::@begin")[1]; i <= cursorAttr.get(id + "::@end")[1]; i++) {
			for (var j = cursorAttr.get(id + "::@begin")[0]; j <= cursorAttr.get(id + "::@end")[0]; j++){
			outlet(1, "getMeasureInfo", j);
			staffBoundingFlag = 1;
			outlet(1, "getStaffBoundingInfo", j, 0);
			staffBoundingFlag = 0;
			//x y width height marginX
			//[20,147,360,24,83]
			//calculate distance to travel 
			post("tempo/timesig", tempo, timesig, stretch, parseFloat(tempo),  parseFloat(timesig[0]), parseFloat(timesig[1]), "\n");
			post("travel from", staffBoundingInfo[4], "to", staffBoundingInfo[0] + staffBoundingInfo[2], "in", cursorAttr.get(id + "::@timestretch") * (60000 / parseFloat(tempo) * (4 * parseFloat(timesig[0]) / parseFloat(timesig[1]))), "msec \n");		
			var from = staffBoundingInfo[4];
			var to = staffBoundingInfo[0] + staffBoundingInfo[2];
			var travel = stretch * (60000 / parseFloat(tempo) * (4 * parseFloat(timesig[0]) / parseFloat(timesig[1])));
			cursorAttr.replace(id + "::@trajectory::" + j, from, to, travel);
			}			
//			}
			//calculate y position and height of cursor
			//map staves to staffgroups
			var color = cursorAttr.get(id + "::@countdowncolor");
			cursors.clear();			
			for (var s = 0; s < groupcount; s++)
			{
			var extent = cursorExtent(sg[s], startStaff, endStaff);
			if (extent != -1) {
			cursorAttr.replace(id + "::@extent", extent[0], extent[1]);
           	cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/style/fill", "rgb("+ Math.round(color[0] * 255) + "," + Math.round(color[1] * 255) + "," + Math.round(color[2] * 255) + ")");
            cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/style/fill-opacity", Math.round(color[3] * 255));
           	cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/draw/rect", cursorAttr.get(id + "::@trajectory::0")[0], extent[0], 2., extent[1] - extent[0]);
            cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/style/stroke", "none");
            cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/style/stroke-width", 0.4);
            cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/style/stroke-opacity", 0.);
            //cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/transform/matrix", [1., 0., 0., 1., 0., 0.]);
			cursors.set("/svgdraw/" + (s + 1) + "/cursor-" + id + "/transform/translate", [0, 0]);
			}		
		}				
		outlet(0, "dictionary", cursors.name);	
	}
}

function cursorExtent(staffGroup, startStaff, endStaff)
{
	//find occurence of staff in staffgroup
	var extent = [-1];
	var idx = [];
	for (var i = startStaff; i<= endStaff; i++) {
	if (typeof staffGroup == "number") {
	if (staffGroup == i) idx = [0];
	}
	else if (staffGroup.indexOf(i) != -1) idx.push(staffGroup.indexOf(i));
	}
	//calculate extent
	if (idx.length == 1) 
	{
	var top = boundingBoxTop[idx[0]];
	var bottom = boundingBoxTop[idx[0]] + boundingBox[idx[0]] - staffSpacing[idx[0]][1] - staffSpacing[idx[0]][0];
	extent = [top, bottom];
	}
	else if (idx.length > 1)
	{
	var top = boundingBoxTop[idx[0]];
	var destinationBoxes = 0;
	for (j = 0; j < idx.length; j++) destinationBoxes += boundingBox[idx[j]];
	var bottom = boundingBoxTop[idx[0]] + destinationBoxes - staffSpacing[idx[j-1]][1] - staffSpacing[idx[j-1]][0];
	extent = [top, bottom];
	}
	//post("extent", extent, "\n");
	return extent;
}

function getAllIndexes(arr, val) {
    var indexes = [-1], i;
	var c = 0;
	if (typeof arr == "number" && arr == val) indexes = [0];
    else {for(i = 0; i < arr.length; i++)
        if (arr[i] == val)
			{
            indexes[c] = i;
			c++;
			}
		}
    return indexes;
}

function arrayMin(arr) {
  var len = arr.length, min = Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
}

function arrayMax(arr) {
  var len = arr.length, max = -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
}

function toNumber(arr) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++) 
		indexes.push(Number(arr[i]));
    return indexes;	
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

