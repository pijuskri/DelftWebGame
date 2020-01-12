var socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function(event){
  var incomingMsg = JSON.parse(event.data);
  console.log(incomingMsg.type);
  if(incomingMsg.type == Messages.UpdateLocal_s)
  {
    game.board = incomingMsg.data;
    $("td").loadBoard(); 
    game.kingCheck();
    //console.log("loaded"+game.board );
  }
  if(incomingMsg.type == Messages.PlayerAss_s)
  {
    game.player = incomingMsg.data.player;
    game.gameID = incomingMsg.data.id;
    //alert(game.player);
  }
  if(incomingMsg.type == Messages.GameStart_s)
  {
    game.gameStarted=true;
    //alert("game has started");
  }
  if(incomingMsg.type == Messages.Turn_s)
  {
    game.yourTurn=true;
    //alert("game has started");
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
