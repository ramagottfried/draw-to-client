
setup instructions:


1) install node.js and npm, when you have it installed you should be able to open the Terminal app and type: “which node” (without the quotes) and then the terminal should print a folder location, then type “which npm” and it should print another folder location.

2) once node is installed, navigate to the clock-sender folder. For example if it’s in your documents folder you would type: “cd ~/Documents/clock-sender”, then type “ls” and you should see a list of the files in the folder.

3) run “npm install” from within this directory — you need to be connected to the internet for this step. This will install the necessary files that the script uses. (you only need to do this step once)

3) once that’s finished, you can type “node .” (with the period) and this should start up the clock sender server — it will say something like: “Listening for OSC over UDP at: 127.0.0.1 …” and then “load webpage at http://localhost:3001 or http://…… “ this second address is the address that people can use to log in to your server.

4) open a webbrowser and type in the address above, you should see a blue webpage with a message that says “connected to …”

5) download the odot Max library located here: https://github.com/CNMAT/CNMAT-odot/releases and put the folder in your ~/Max/Packages folder. (you may have to restart Max if it’s already running when you add the folder)

6) start up Max and open the patch in the clock-sender/max folder, click the toggle button to start the clock, you should see the time changing in the web-browser. You can set a new start time by setting the time in the textedit object in the patch.

7) if you use this for a performance, you’ll want to make sure that the WIFI router is not connected to the internet which will slow down the connection a lot.