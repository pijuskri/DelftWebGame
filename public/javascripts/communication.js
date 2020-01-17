var socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function(event){
  var incomingMsg = JSON.parse(event.data);
  console.log(incomingMsg.type);
  if(incomingMsg.type == Messages.UpdateLocal_s)
  {
    game.board = incomingMsg.data;
    $("td").loadBoard(); 
    if(game.gameStarted && game.board)game.kingCheck();
    var audio = new Audio('../sound.wav');
    audio.volume = 0.2;
    audio.play();
    game.movesMade++;
    $(".movesMade").text("Moves made: "+game.movesMade);
    $(".points").text(game.calcPoints(1));
    //console.log("loaded"+game.board );
  }
  if(incomingMsg.type == Messages.PlayerAss_s)
  {
    game.player = incomingMsg.data.player;
    game.gameID = incomingMsg.data.id;
    if(game.player==1)alert("Waiting for other player to join...");
  }
  if(incomingMsg.type == Messages.GameStart_s)
  {
    game.gameStarted=true;
    if(game.player==1)alert("Player 2 joined and the game has started!");
    else alert("Game has started!");
  }
  if(incomingMsg.type == Messages.Turn_s)
  {
    game.yourTurn=true;
    $(".turn").text("It is your turn");
    game.time = 60;
    //alert("game has started");
  }
  if(incomingMsg.type == Messages.GameEnd_s)
  {
    console.log(incomingMsg.data);
    if(incomingMsg.data.type=="Closed")
    {
      alert("Other player has quit, game has ended");
    }
    else
    {
      if(incomingMsg.data.player==game.player) alert("You won!");
      else alert("You lost..");
    }
    game.gameEnd = true;
  }
}
socket.onopen = function(){
    //socket.send("Hello from the client!");
    //document.getElementById("hello").innerHTML = "Sending a first message to the server ...";
};
function sendMove()
{
  var outgoingMsg = Messages.UpdateServer_o;
  outgoingMsg.data.board = game.board;
  outgoingMsg.data.id = game.gameID;
  outgoingMsg.data.player = game.player;
  socket.send(JSON.stringify(outgoingMsg));
}
function sendEnd()
{
  var outgoingMsg = Messages.GameEnd_o;
  outgoingMsg.data = (game.player+1)%2;
  socket.send(JSON.stringify(outgoingMsg));
}
