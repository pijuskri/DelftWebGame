//@ts-check
var express = require("express");
var http = require("http");

var indexRouter = require("./routes/index");
var messages = require("./public/javascripts/messages");
var stats = require("./public/javascripts/stats");

var websocket = require("ws");

var port = process.argv[2];
var app = express();
var Game = require("./gameStatus");

app.use(express.static(__dirname + "/public"));
//http.createServer(app).listen(port);
app.set('view engine', 'ejs')

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use("/play", function(req, res) {
  res.sendFile("public/game.html", {root: "./"});
});

app.use('/*', (req, res) => {
  //stats.peopleOnline++;
  //res.clearCookie('user');
  if(!req.cookies.user)
  {
    res.cookie("user", 0);
  }
  else 
  {
    res.cookie("user", parseFloat(req.cookies.user)+0.5);
  }
  
  console.log(req.cookies.user);
  //res.send(req.cookies);
  res.render('splash.ejs', { gamesNumber: stats.numberOfGames-1,
     gamesCompleted: stats.closedGames, peopleOnline: stats.peopleOnline, timesLogin: req.cookies.user-0.5 });
})

/*app.use("/", function(req, res) {
  res.sendFile("public/splash.html", {root: "./"});
});
*/


var server = http.createServer(app);
const wss = new websocket.Server({ server });

var websockets = {}; //property: websocket, value: game
var currentGame = new Game(stats.numberOfGames++);
var connectionID = 0; //each websocket receives a unique ID

wss.on("connection", function connection(ws) {

  let con = ws;
  con.id = connectionID++;
  let playerType = currentGame.addPlayer(con);
  websockets[con.id] = currentGame;
  stats.peopleOnline++;
  console.log(stats.peopleOnline);
  
  var outgoingMsg = messages.PlayerAss_o;
  outgoingMsg.data = new Object();
  outgoingMsg.data.player = playerType;
  outgoingMsg.data.id = currentGame.id;
  con.send(JSON.stringify(outgoingMsg));

  outgoingMsg = messages.UpdateLocal_o;
  outgoingMsg.data = currentGame.board;
  con.send(JSON.stringify(outgoingMsg));

  if(currentGame.player1&&currentGame.player2)
  {
        outgoingMsg = messages.GameStart_o;
        outgoingMsg.data = true;
        currentGame.player1.send(JSON.stringify(outgoingMsg));
        currentGame.player1.send(messages.Turn_j);
        currentGame.player2.send(JSON.stringify(outgoingMsg));
        currentGame = new Game(stats.numberOfGames++);
  }
  
  con.on("message", function incoming(message) {
      //console.log("[LOG] " + message);
      var incomingMsg = JSON.parse(message.toString());
      let gameObj = websockets[con.id];
      console.log(incomingMsg.type);
      if(incomingMsg.type == messages.UpdateServer_s)
      {
        gameObj.board = incomingMsg.data.board;
        var player = incomingMsg.data.player;
        outgoingMsg = messages.UpdateLocal_o;
        outgoingMsg.data = gameObj.board;
        gameObj.player1.send(JSON.stringify(outgoingMsg));
        if(gameObj.player2) gameObj.player2.send(JSON.stringify(outgoingMsg));
        if(player==1 && gameObj.player2) gameObj.player2.send(messages.Turn_j);
        else gameObj.player1.send(messages.Turn_j);
       
      }
      if(incomingMsg.type == messages.GameEnd_s)
      {
        console.log("Player "+incomingMsg.data+" has won!");
        var outgoingMsg = messages.GameEnd_o;
        outgoingMsg.data = incomingMsg.data;
        gameObj.player1.send(JSON.stringify(outgoingMsg));
        gameObj.player2.send(JSON.stringify(outgoingMsg));
        stats.closedGames++;
      }
  });
  con.on("close", function(code) {
    /*
     * code 1001 means almost always closing initiated by the client;
     * source: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
     */
    console.log(con.id + " disconnected ...");

    if (code == "1001") {
      /*
       * if possible, abort the game; if not, the game is already completed
       */
      let gameObj = websockets[con.id];
      var outgoingMsg = messages.GameEnd_o;
      outgoingMsg.data = 1;
      gameObj.player1.send(JSON.stringify(outgoingMsg));
      if(gameObj.player2)gameObj.player2.send(JSON.stringify(outgoingMsg));
      gameObj.player1.close();
      gameObj.player1 = null;
      if(gameObj.player2)gameObj.player2.close();
      gameObj.player2 = null;
      //stats.closedGames++;
      stats.peopleOnline-=2;
      stats.numberOfGames--;
    }
  });
});

server.listen(port);

//app.get("/play", indexRouter);



/*
app.get('/', function (req, res) {
  res.sendFile("game.html", { root: "./public" });
})
*/

