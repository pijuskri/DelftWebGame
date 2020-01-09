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

app.use("/", function(req, res) {
  res.sendFile("public/game.html", {root: "./"});
});
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
  
  var outgoingMsg = messages.PlayerAss_o;
  outgoingMsg.data = new Object();
  outgoingMsg.data.player = playerType;
  outgoingMsg.data.id = currentGame.id;
  con.send(JSON.stringify(outgoingMsg));

  outgoingMsg = messages.UpdateLocal_o;
  outgoingMsg.data = currentGame.board;
  con.send(JSON.stringify(outgoingMsg));
  //let's slow down the server response time a bit to make the change visible on the client side

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
        gameObj.player2.send(JSON.stringify(outgoingMsg));
        if(player==1) gameObj.player2.send(messages.Turn_j);
        else gameObj.player1.send(messages.Turn_j);
        wss.clients.forEach(function each(client) {
        });
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

