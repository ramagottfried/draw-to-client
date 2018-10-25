{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 2,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 44.0, 112.0, 1532.0, 776.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-46",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 81.0, 129.0, 32.0, 22.0 ],
					"text" : "print"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-45",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 433.1666259765625, 188.33331298828125, 146.0, 22.0 ],
					"presentation_linecount" : 2,
					"text" : "staffgroups 0+1 2-3 3 1+3"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 178.0, 300.0, 452.0, 20.0 ],
					"text" : "I need to be able to query URL of server to properly serve images over the network.",
					"textcolor" : [ 0.929411768913269, 0.341176480054855, 0.270588248968124, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-36",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 785.0, 157.66668701171875, 51.0, 22.0 ],
					"presentation_linecount" : 2,
					"text" : "test.png"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-37",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 0,
							"revision" : 2,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 266.0, 79.0, 453.0, 379.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"boxes" : [ 							{
								"box" : 								{
									"id" : "obj-38",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "dictionary" ],
									"patching_rect" : [ 50.0, 126.0, 148.0, 22.0 ],
									"text" : "dict.pack picster-element :"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-12",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 50.0, 258.0, 288.0, 22.0 ],
									"text" : "prepend addRenderedMessageToSelectedNotes 0 0"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-10",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 50.0, 224.0, 57.0, 22.0 ],
									"text" : "tosymbol"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-9",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 50.0, 193.0, 140.0, 22.0 ],
									"text" : "prepend rendered test[0]"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-7",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 50.0, 158.0, 152.0, 22.0 ],
									"text" : "dict.serialize @compress 1"
								}

							}
, 							{
								"box" : 								{
									"data" : 									{
										"text_2" : 										{
											"commands" : 											{
												"0" : [ "textcolor", 0.501961, 0.501961, 0.0, 1.0 ],
												"1" : [ "font", "Arial", 30 ],
												"2" : [ "move_to", 205.0, 346.0 ],
												"3" : [ "write", "text" ]
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 205.0, 346.0, 4.0, "yes", 0 ]
											}

										}
,
										"framerect_2" : 										{
											"commands" : 											{
												"0" : [ "pen_size", 2 ],
												"1" : [ "color", 1.0, 0.980392, 0.160784, 0.784314 ],
												"2" : [ "rectangle", 96.0, 162.5, 64.0, 45.0 ]
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 96.0, 162.5, 4.0, "yes", 0 ]
											}

										}
,
										"paintrect_2" : 										{
											"commands" : 											{
												"0" : [ "color", 0.039216, 0.039216, 0.003922, 0.572549 ],
												"1" : [ "rectangle", 89.0, 211.5, 34.0, 25.0 ],
												"2" : "fill"
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 89.0, 211.5, 4.0, "yes", 0 ]
											}

										}
,
										"frameoval_2" : 										{
											"commands" : 											{
												"0" : [ "pen_size", 2 ],
												"1" : [ "color", 0.47451, 0.890196, 1.0, 0.815686 ],
												"2" : [ "ellipse", 109.5, 100.0, 45.0, 42.0 ]
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 109.5, 100.0, 4.0, "yes", 0 ]
											}

										}
,
										"paintoval_2" : 										{
											"commands" : 											{
												"0" : [ "color", 0.172549, 0.082353, 1.0, 0.301961 ],
												"1" : [ "ellipse", 133.5, 83.5, 39.0, 39.0 ],
												"2" : "fill"
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 133.5, 83.5, 4.0, "yes", 0 ]
											}

										}
,
										"frameroundrect_2" : 										{
											"commands" : 											{
												"0" : [ "pen_size", 2 ],
												"1" : [ "color", 0.811765, 0.360784, 0.462745, 0.662745 ],
												"2" : [ "move_to", 114.0, 278.0 ],
												"3" : [ "line_to", 114.0, 300.0 ],
												"4" : [ "curve_to", 114.0, 310.0, 114.0, 310.0, 124.0, 310.0 ],
												"5" : [ "line_to", 145.0, 310.0 ],
												"6" : [ "curve_to", 155.0, 310.0, 155.0, 310.0, 155.0, 300.0 ],
												"7" : [ "line_to", 155.0, 278.0 ],
												"8" : [ "curve_to", 155.0, 268.0, 155.0, 268.0, 145.0, 268.0 ],
												"9" : [ "line_to", 124.0, 268.0 ],
												"10" : [ "curve_to", 114.0, 268.0, 114.0, 268.0, 114.0, 278.0 ]
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 134.5, 289.0, 4.0, "yes", 0 ]
											}

										}
,
										"paintroundrect_2" : 										{
											"commands" : 											{
												"0" : [ "color", 0.635294, 0.498039, 0.368627, 0.360784 ],
												"1" : [ "move_to", 228.0, 328.0 ],
												"2" : [ "line_to", 228.0, 347.0 ],
												"3" : [ "curve_to", 228.0, 357.0, 228.0, 357.0, 238.0, 357.0 ],
												"4" : [ "line_to", 261.0, 357.0 ],
												"5" : [ "curve_to", 271.0, 357.0, 271.0, 357.0, 271.0, 347.0 ],
												"6" : [ "line_to", 271.0, 328.0 ],
												"7" : [ "curve_to", 271.0, 318.0, 271.0, 318.0, 261.0, 318.0 ],
												"8" : [ "line_to", 238.0, 318.0 ],
												"9" : [ "curve_to", 228.0, 318.0, 228.0, 318.0, 228.0, 328.0 ],
												"10" : "fill"
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 249.5, 337.5, 4.0, "yes", 0 ]
											}

										}
,
										"framearc_2" : 										{
											"commands" : 											{
												"0" : [ "pen_size", 2 ],
												"1" : [ "color", 0.164706, 0.431373, 0.047059, 0.603922 ],
												"2" : [ "ovalarc", 79.5, 256.0, 17.5, 18.0, -1.57, 3.14 ]
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 79.5, 256.0, 4.0, "yes", 0 ]
											}

										}
,
										"picture_2" : 										{
											"commands" : 											{
												"0" : [ "raster", "Macintosh HD:/Users/Shared/Max 7/Packages/MaxScore/patchers/Picster/icons/imageresize.png" ]
											}
,
											"info" : 											{
												"origin" : [ 197.0, 86.0 ],
												"a" : [ 50.0, 0.0, 5.0, "auto", 0, 40.0 ],
												"b" : [ 0.0, 45.0, 5.0, "auto", 0, 40.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.25, 0.0, 0.0, 1.125, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 20.0, 20.0, 5.0, "yes", 0 ]
											}

										}
,
										"paintarc_2" : 										{
											"commands" : 											{
												"0" : [ "color", 1.0, 0.0, 0.501961, 0.482353 ],
												"1" : [ "ovalarc", 48.0, 324.0, 20.0, 9.0, 0.959444, 3.837778 ],
												"2" : "fill"
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 48.0, 324.0, 4.0, "yes", 0 ]
											}

										}
,
										"freehand_1" : 										{
											"commands" : 											{
												"0" : [ "pen_size", 2 ],
												"1" : [ "color", 0.501961, 0.501961, 0.0, 1.0 ],
												"2" : [ "move_to", 123, 220 ],
												"3" : [ "line_to", 123.0, 220.0 ],
												"4" : [ "line_to", 123.0, 219.0 ],
												"5" : [ "line_to", 123.0, 218.0 ],
												"6" : [ "line_to", 123.0, 216.0 ],
												"7" : [ "line_to", 124.0, 216.0 ],
												"8" : [ "line_to", 126.0, 216.0 ],
												"9" : [ "line_to", 127.0, 216.0 ],
												"10" : [ "line_to", 129.0, 216.0 ],
												"11" : [ "line_to", 130.0, 216.0 ],
												"12" : [ "line_to", 132.0, 216.0 ],
												"13" : [ "line_to", 134.0, 216.0 ],
												"14" : [ "line_to", 136.0, 216.0 ],
												"15" : [ "line_to", 139.0, 216.0 ],
												"16" : [ "line_to", 140.0, 218.0 ],
												"17" : [ "line_to", 143.0, 220.0 ],
												"18" : [ "line_to", 146.0, 222.0 ],
												"19" : [ "line_to", 148.0, 224.0 ],
												"20" : [ "line_to", 151.0, 226.0 ],
												"21" : [ "line_to", 153.0, 227.0 ],
												"22" : [ "line_to", 156.0, 227.0 ],
												"23" : [ "line_to", 158.0, 227.0 ],
												"24" : [ "line_to", 160.0, 225.0 ],
												"25" : [ "line_to", 163.0, 221.0 ],
												"26" : [ "line_to", 165.0, 216.0 ],
												"27" : [ "line_to", 168.0, 210.0 ],
												"28" : [ "line_to", 171.0, 205.0 ],
												"29" : [ "line_to", 174.0, 202.0 ],
												"30" : [ "line_to", 178.0, 200.0 ],
												"31" : [ "line_to", 183.0, 198.0 ],
												"32" : [ "line_to", 186.0, 198.0 ],
												"33" : [ "line_to", 189.0, 198.0 ],
												"34" : [ "line_to", 191.0, 198.0 ],
												"35" : [ "line_to", 194.0, 198.0 ],
												"36" : [ "line_to", 195.0, 198.0 ],
												"37" : [ "line_to", 196.0, 197.0 ],
												"38" : [ "line_to", 197.0, 196.0 ],
												"39" : [ "line_to", 199.0, 194.0 ],
												"40" : [ "line_to", 200.0, 193.0 ],
												"41" : [ "line_to", 200.0, 193.0 ],
												"42" : "stroke"
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 123.0, 220.0, 4.0, "yes", 0 ]
											}

										}
,
										"linesegment_3" : 										{
											"commands" : 											{
												"0" : [ "pen_size", 2 ],
												"1" : [ "color", 0.431373, 1.0, 0.317647, 0.482353 ],
												"2" : [ "line", 122, 369, 235, 267 ]
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 178.5, 318.0, 4.0, "yes", 0 ]
											}

										}
,
										"paintpoly_2" : 										{
											"commands" : 											{
												"0" : [ "color", 0.501961, 0.501961, 0.0, 0.572549 ],
												"1" : [ "move_to", 221.0, 216.0 ],
												"2" : [ "line_to", 283.0, 242.0 ],
												"3" : [ "line_to", 264.0, 255.0 ],
												"4" : [ "line_to", 203.0, 229.0 ],
												"5" : [ "line_to", 221.0, 216.0 ],
												"6" : "fill"
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 221.0, 216.0, 4.0, "yes", 0 ]
											}

										}
,
										"framepoly_2" : 										{
											"commands" : 											{
												"0" : [ "pen_size", 3 ],
												"1" : [ "color", 0.0, 0.0, 0.501961, 0.45098 ],
												"2" : [ "move_to", 216.0, 175.0 ],
												"3" : [ "line_to", 259.0, 148.0 ],
												"4" : [ "line_to", 260.0, 196.0 ],
												"5" : [ "line_to", 216.0, 175.0 ],
												"6" : "stroke"
											}
,
											"info" : 											{
												"origin" : [ 0.0, 0.0 ],
												"a" : [ 1.0, 0.0, 0.0, "no", 0, 1.0 ],
												"b" : [ 0.0, 1.0, 0.0, "no", 0, 1.0 ],
												"hide" : 0,
												"transform_mode" : 0,
												"draw_axes" : 0,
												"transform" : [ 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 ]
											}
,
											"anchors" : 											{
												"0" : [ 216.0, 175.0, 4.0, "yes", 0 ]
											}

										}

									}
,
									"id" : "obj-2",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 4,
									"outlettype" : [ "dictionary", "", "", "" ],
									"patching_rect" : [ 50.0, 89.0, 89.0, 22.0 ],
									"saved_object_attributes" : 									{
										"embed" : 1,
										"parameter_enable" : 0,
										"parameter_mappable" : 0
									}
,
									"text" : "dict @embed 1"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-32",
									"index" : 1,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 50.0, 40.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-36",
									"index" : 1,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 50.0, 296.0, 30.0, 30.0 ]
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-12", 0 ],
									"source" : [ "obj-10", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-36", 0 ],
									"source" : [ "obj-12", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-38", 0 ],
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-2", 0 ],
									"source" : [ "obj-32", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"source" : [ "obj-38", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-9", 0 ],
									"source" : [ "obj-7", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-10", 0 ],
									"source" : [ "obj-9", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 153.0, 67.5, 119.0, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p addPicsterElement"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-33",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 194.0, 35.5, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-17",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 153.0, 35.5, 33.0, 22.0 ],
					"text" : "read"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-30",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1.0, 126.0, 59.0, 22.0 ],
					"text" : "writeSVG"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-29",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 932.0, 137.0, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-24",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 932.0, 163.66668701171875, 32.0, 22.0 ],
					"text" : "$1 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-26",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "dictionary" ],
					"patching_rect" : [ 932.0, 192.66668701171875, 248.0, 22.0 ],
					"text" : "dict.pack /svgdraw/1/bar/transform/translate :"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-23",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 733.0, 157.66668701171875, 50.0, 22.0 ],
					"presentation_linecount" : 3,
					"text" : "test.svg"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-22",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "dictionary" ],
					"patching_rect" : [ 733.0, 192.66668701171875, 198.0, 22.0 ],
					"text" : "dict.pack /svgdraw/1/svg/draw/img :"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-27",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 573.5, 157.66668701171875, 29.5, 22.0 ],
					"text" : "1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-25",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "dictionary" ],
					"patching_rect" : [ 573.5, 192.66668701171875, 153.0, 22.0 ],
					"text" : "dict.pack /svgdraw/1/clear :"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "dictionary", "", "", "" ],
					"patching_rect" : [ 900.0, 110.0, 50.5, 22.0 ],
					"saved_object_attributes" : 					{
						"embed" : 0,
						"parameter_enable" : 0,
						"parameter_mappable" : 0
					}
,
					"text" : "dict svg"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-20",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1.0, 153.0, 60.0, 22.0 ],
					"text" : "writePNG"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "dictionary", "", "", "" ],
					"patching_rect" : [ 900.0, 82.0, 64.0, 22.0 ],
					"saved_object_attributes" : 					{
						"embed" : 0,
						"parameter_enable" : 0,
						"parameter_mappable" : 0
					}
,
					"text" : "dict output"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-18",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 392.0, 72.0, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 392.0, 100.0, 100.0, 22.0 ],
					"presentation_linecount" : 2,
					"text" : "cursor 0 show $1"
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-15",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 629.0, 43.5, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 629.0, 74.0, 32.0, 22.0 ],
					"text" : "$1 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "dictionary" ],
					"patching_rect" : [ 629.0, 107.0, 257.0, 22.0 ],
					"text" : "dict.pack /svgdraw/1/main/transform/translate :"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "dictionary", "", "", "" ],
					"patching_rect" : [ 900.0, 53.0, 83.0, 22.0 ],
					"saved_object_attributes" : 					{
						"embed" : 0,
						"parameter_enable" : 0,
						"parameter_mappable" : 0
					}
,
					"text" : "dict cursorAttr"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 1000.0, 53.0, 165.0, 22.0 ],
					"saved_object_attributes" : 					{
						"embed" : 0
					}
,
					"text" : "coll MaxScoreFontExtrasMap"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 1000.0, 22.0, 149.0, 22.0 ],
					"saved_object_attributes" : 					{
						"embed" : 0
					}
,
					"text" : "coll MaxScoreBravuraMap"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "dictionary", "", "", "" ],
					"patching_rect" : [ 900.0, 22.0, 70.0, 22.0 ],
					"saved_object_attributes" : 					{
						"embed" : 0,
						"parameter_enable" : 0,
						"parameter_mappable" : 0
					}
,
					"text" : "dict cursors"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-102",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 263.1666259765625, 243.0, 192.0, 22.0 ],
					"text" : "jit.matrix 4 char 320 240 @adapt 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1110.0, 257.0, 187.0, 22.0 ],
					"text" : "url localhost:3002/svgdraw-2.html"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-41",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 688.0, 263.0, 187.0, 22.0 ],
					"text" : "url localhost:3002/svgdraw-1.html"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-74",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 52.0, 38.5, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-71",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 52.0, 67.5, 99.0, 22.0 ],
					"text" : "setTitleVisible $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-44",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 63.0, 270.0, 47.0, 22.0 ],
					"text" : "dict.iter"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-43",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 117.0, 270.0, 141.0, 35.0 ],
					"text" : "/svgdraw/1/touchdiv/mouse/xy 19 4"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-50",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 307.3333740234375, 100.0, 78.0, 22.0 ],
					"text" : "cursor 0 stop"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-31",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 295.3333740234375, 72.0, 79.0, 22.0 ],
					"text" : "cursor 0 start"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-54",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 280.5, 43.5, 330.0, 22.0 ],
					"text" : "cursor 0 @begin 0 1 @end 3 3 @passes 2 @timestretch 20."
				}

			}
, 			{
				"box" : 				{
					"color" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"id" : "obj-2",
					"maxclass" : "jweb",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1110.0, 300.0, 418.0, 448.0 ],
					"rendermode" : 1,
					"url" : "http://localhost:3002/svgdraw-2.html"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 356.5, 192.66668701171875, 63.0, 22.0 ],
					"text" : "script stop"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 288.5, 192.66668701171875, 64.0, 22.0 ],
					"text" : "script start"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-103",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 198.1666259765625, 146.33331298828125, 98.0, 22.0 ],
					"text" : "staffgroups parts"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-48",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 298.1666259765625, 146.33331298828125, 100.0, 22.0 ],
					"text" : "staffgroups score"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-13",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 37.0, 8.0, 269.0, 23.0 ],
					"text" : "newScore 4 500 430, setTimeSignature 0 1 4"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-111",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 0,
							"revision" : 2,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 59.0, 104.0, 256.0, 300.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"boxes" : [ 							{
								"box" : 								{
									"id" : "obj-106",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 50.0, 183.5, 93.0, 22.0 ],
									"text" : "join"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-107",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "dictionary" ],
									"patching_rect" : [ 124.0, 155.5, 88.0, 22.0 ],
									"text" : "dict.deserialize"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-10",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 50.0, 127.0, 93.0, 22.0 ],
									"text" : "zl.ecils 1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-2",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 50.0, 91.0, 153.0, 22.0 ],
									"text" : "routepass RenderMessage"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-109",
									"index" : 1,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 50.0, 40.0, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-110",
									"index" : 1,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 50.0, 232.5, 30.0, 30.0 ]
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-106", 0 ],
									"source" : [ "obj-10", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-107", 0 ],
									"source" : [ "obj-10", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-110", 0 ],
									"source" : [ "obj-106", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-106", 1 ],
									"source" : [ "obj-107", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-2", 0 ],
									"source" : [ "obj-109", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-10", 0 ],
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-110", 0 ],
									"source" : [ "obj-2", 1 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 63.0, 153.0, 76.0, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p deserialize"
				}

			}
, 			{
				"box" : 				{
					"color" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0 ],
					"id" : "obj-38",
					"maxclass" : "jweb",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 688.0, 300.0, 418.0, 448.0 ],
					"rendermode" : 1,
					"url" : "http://localhost:3002/svgdraw-1.html"
				}

			}
, 			{
				"box" : 				{
					"color" : [ 0.611765, 0.701961, 1.0, 1.0 ],
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-34",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 5,
					"outlettype" : [ "", "", "", "", "" ],
					"patching_rect" : [ 37.0, 94.0, 235.0, 23.0 ],
					"text" : "mxj com.algomusic.max.MaxScore"
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 1,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-35",
					"lockeddragscroll" : 1,
					"maxclass" : "bpatcher",
					"name" : "maxscore.bcanvas.maxpat",
					"numinlets" : 2,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "", "bang" ],
					"patching_rect" : [ 37.0, 323.0, 500.0, 430.0 ],
					"prototypename" : "bcanvas",
					"varname" : "bcanvas",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 63.0, 243.0, 195.0, 22.0 ],
					"saved_object_attributes" : 					{
						"autostart" : 0,
						"defer" : 0,
						"node" : "",
						"npm" : "install",
						"watch" : 1
					}
,
					"text" : "node.script max-index.js @watch 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-108",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 63.0, 192.66668701171875, 219.1666259765625, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "render2Browser.js",
						"parameter_enable" : 0
					}
,
					"text" : "js render2Browser @staffgroups score"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 2 ],
					"source" : [ "obj-103", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-108", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-102", 0 ],
					"source" : [ "obj-108", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"midpoints" : [ 172.58331298828125, 223.66668701171875, 12.0, 223.66668701171875, 12.0, 90.0, 46.5, 90.0 ],
					"source" : [ "obj-108", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 0 ],
					"source" : [ "obj-111", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 0 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 0 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 0 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"source" : [ "obj-24", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 0 ],
					"source" : [ "obj-30", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 0 ],
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 0 ],
					"source" : [ "obj-33", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 1 ],
					"midpoints" : [ 100.5, 141.833343505859375, 172.58331298828125, 141.833343505859375 ],
					"order" : 1,
					"source" : [ "obj-34", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-111", 0 ],
					"midpoints" : [ 46.5, 147.0, 72.5, 147.0 ],
					"order" : 1,
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 1 ],
					"midpoints" : [ 100.5, 141.5, 527.5, 141.5 ],
					"order" : 0,
					"source" : [ "obj-34", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 0 ],
					"order" : 2,
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-46", 0 ],
					"order" : 0,
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"midpoints" : [ 46.5, 758.666667819023132, 12.5, 758.666667819023132, 12.5, 90.0, 46.5, 90.0 ],
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-38", 0 ],
					"source" : [ "obj-41", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 1 ],
					"source" : [ "obj-44", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 2 ],
					"source" : [ "obj-45", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 2 ],
					"source" : [ "obj-48", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 0 ],
					"source" : [ "obj-50", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 0 ],
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-71", 0 ],
					"source" : [ "obj-74", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-35::obj-18::obj-11.17::obj-81" : [ "toggle[16]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.5::obj-81" : [ "toggle[4]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.11::obj-81" : [ "toggle[10]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.16::obj-81" : [ "toggle[15]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.6::obj-81" : [ "toggle[5]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.10::obj-81" : [ "toggle[9]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.4::obj-81" : [ "toggle[3]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.15::obj-81" : [ "toggle[14]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.20::obj-81" : [ "toggle[19]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.9::obj-81" : [ "toggle[8]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.2::obj-81" : [ "toggle[1]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.14::obj-81" : [ "toggle[13]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.7::obj-81" : [ "toggle[6]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.19::obj-81" : [ "toggle[18]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.8::obj-81" : [ "toggle[7]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.3::obj-81" : [ "toggle[2]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.13::obj-81" : [ "toggle[12]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.18::obj-81" : [ "toggle[17]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.12::obj-81" : [ "toggle[11]", "toggle[3]", 0 ],
			"obj-35::obj-18::obj-11.1::obj-81" : [ "toggle[21]", "toggle[3]", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "render2Browser.js",
				"bootpath" : "/Users/Shared/Max 8/Library/MaxScore/node.js/draw-to-client/v3-max/max",
				"patcherrelativepath" : "./max",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "maxscore.bcanvas.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/abstractions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/abstractions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "maxscore.lcd.js",
				"bootpath" : "/Users/Shared/Max 8/Library/MaxScore/node.js/draw-to-client/v2-d3",
				"patcherrelativepath" : "../v2-d3",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "maxscore.render2canvas.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "decodeURI.js",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/javascript",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/javascript",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "MaxScoreKeyMap.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "packback.maxpat",
				"bootpath" : "/Users/Shared/Max 7/Packages/Quintet.net/patchers/Library/Abstractions/utilities",
				"patcherrelativepath" : "../../../../../Packages/Quintet.net/patchers/Library/Abstractions/utilities",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "text_measure.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "maxscore.sax.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "font-mapping.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "MaxScoreOpusMap.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/Font Mappings",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/Font Mappings",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "MaxScoreMaestroMap.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/Font Mappings",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/Font Mappings",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "MaxScoreJazzWindowsMap.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/Font Mappings",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/Font Mappings",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "MaxScoreJazzMap.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/Font Mappings",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/Font Mappings",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "MaxScoreAloisenNewMap.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/Font Mappings",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/Font Mappings",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "MaxScoreFontExtrasMap.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "MaxScoreBravuraMap.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/Font Mappings",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/Font Mappings",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "platform.js",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/javascript",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/javascript",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "micromaps.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "mM-Wysch.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "mM-Stahnke.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "mM-SIMS.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "mM-sagittal.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "mM-nTET.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "nTET.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps/resources",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps/resources",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "filter-repeated-accidentals.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "48TETz.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps/resources",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps/resources",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "72Stahnkez.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps/resources",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps/resources",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "96TETz.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps/resources",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps/resources",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "72SIMSz.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps/resources",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps/resources",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "72Wyschz.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps/resources",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps/resources",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "mM-none.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "mM-JI.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "ratio-finder.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "cent2ratio-8.txt",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps/resources",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps/resources",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "mM-eighth-tones.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "mM-BP.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/maps/microMaps",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/maps/microMaps",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "maxfolder.js",
				"bootpath" : "/Users/Shared/Max 7/Packages/Quintet.net/javascript",
				"patcherrelativepath" : "../../../../../Packages/Quintet.net/javascript",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "scriptMaps.js",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/javascript",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/javascript",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "utf-82unicode.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "unicode2utf-8.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "strlen.js",
				"bootpath" : "/Users/Shared/Max 7/Packages/Quintet.net/javascript",
				"patcherrelativepath" : "../../../../../Packages/Quintet.net/javascript",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "svg-pie.js",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/Picster",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/Picster",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "sadam.canvas.reformat.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "sadam.canvas2svg.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "first-int.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "sadam.canvas2mgraphics.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "my-LtoColl.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "my-ltocoll.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "divmod.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "maxscore.cursors.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "polycursors.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "gh.split@.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/abstractions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/abstractions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "selectInterval.maxpat",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/patchers/extensions",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/patchers/extensions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "boxSize.js",
				"bootpath" : "/Users/Shared/Max 8/Packages/MaxScore/javascript",
				"patcherrelativepath" : "../../../../../Packages/MaxScore/javascript",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "sadam.rapidXML.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "sadam.split.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "sadam.empty.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "sadam.base64.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "sadam.lzo.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "list-interpolate.mxo",
				"type" : "iLaX"
			}
 ],
		"autosave" : 0,
		"styles" : [ 			{
				"name" : "black on white",
				"number" : 				{
					"textcolor_inverse" : [ 0.239216, 0.254902, 0.278431, 1.0 ],
					"fontname" : [ "Arial" ],
					"fontsize" : [ 12.0 ]
				}
,
				"umenu" : 				{
					"textcolor_inverse" : [ 0.239216, 0.254902, 0.278431, 1.0 ],
					"bgfillcolor" : 					{
						"type" : "color",
						"color1" : [ 0.862745, 0.870588, 0.878431, 1.0 ],
						"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"color" : [ 1.0, 1.0, 1.0, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.39,
						"autogradient" : 0
					}

				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ]
	}

}
