var socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function(event){
  var incomingMsg = JSON.parse(event.data);
  //console.log(incomingMsg.type);
  if(incomingMsg.type == Messages.UpdateLocal_s)
  {
    //console.log(incomingMsg.data);
    game.board = incomingMsg.data.board;
    var player = incomingMsg.data.player;
    $("td").loadBoard(); 
    if(game.gameStarted && game.board)game.kingCheck();
    var audio = new Audio('../sound.wav');
    audio.volume = 0.2;
    audio.play();
    if(player==1) game.movesMade1++;
    else game.movesMade2++
    //$(".gameBannerUser2Info .movesMade:first-child").text("Moves made: "+game.movesMade);
    $(".gameBannerUser1Info").children(".movesMade").text("Moves made: "+game.movesMade1);
    $(".gameBannerUser2Info").children(".movesMade").text("Moves made: "+game.movesMade2);
    
    $(".gameBannerUser1Info").children(".points").text(game.calcPoints(1));
    $(".gameBannerUser2Info").children(".points").text(game.calcPoints(2));
    //console.log("loaded"+game.board );
  }
  if(incomingMsg.type == Messages.PlayerAss_s)
  {
    game.player = incomingMsg.data.player;
    game.gameID = incomingMsg.data.id;
    if(game.player==1)alert("You are white\nWaiting for other player to join...");
  }
  if(incomingMsg.type == Messages.GameStart_s)
  {
    game.gameStarted=true;
    if(game.player==1)alert("Player 2 joined and the game has started!");
    else alert("You are black\nGame has started!");
  }
  if(incomingMsg.type == Messages.Turn_s)
  {
    game.yourTurn=true;
    $(".turn").text("Your turn");
    game.time = 60;
    //alert("game has started");
  }
  if(incomingMsg.type == Messages.GameEnd_s)
  {
    //console.log(incomingMsg.data);
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
