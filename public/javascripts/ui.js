$(document).ready(function(){
  $("td").click(function(){
      if(game.gameStarted && game.yourTurn && !game.gameEnd) game.select($(this));
      else 
      {
        var tempColor = $(this).css("background-color");
        $(this).css({"background-color":'red'});
            setTimeout(() => {
              $(this).css({"background-color":tempColor});
            }, 2000);
      }
      //alert(GameState.selected);
  });
  var timer = setInterval(() => {
    if(game.time>0) game.time--;
    else if(game.yourTurn) game.makeMove();
    updateTimer();
  }, 1000);
  //$("td").loadBoard(); 
});
function updateTimer()
{
  var time = 0;
  if((game.player==1 && game.yourTurn)||(game.player==2 && !game.yourTurn)) time = game.time;
  $(".gameBannerUser1Info").children(".time").text(time);
  if((game.player==1 && !game.yourTurn)||(game.player==2 && game.yourTurn)) time = game.time;
  else time = 0;
  $(".gameBannerUser2Info").children(".time").text(time);
}
$.fn.loadBoard = function()
{
  return this.each(function() {
      var temp = game.getAt(game.convN($(this).parent().attr("id")+$(this).attr("class")));
      if(temp)
      {
        if(temp.name=="pawn")
        {
          if(temp.player==1)$(this).html('<img src="./stylesheets/pawnW.png" alt="pawnW"/>');
          else $(this).html('<img src="./stylesheets/pawnB.png" alt="pawnB" />');
        }
        if(temp.name=="rook")
        {
          if(temp.player==1)$(this).html('<img src="./stylesheets/rookW.png" alt="rookW"/>');
          else $(this).html('<img src="./stylesheets/rookB.png" alt="rookB" />');
        }
        if(temp.name=="knight")
        {
          if(temp.player==1)$(this).html('<img src="./stylesheets/horseW.png" alt="horseW"/>');
          else $(this).html('<img src="./stylesheets/horseB.png" alt="horseB" />');
        }
        if(temp.name=="bishop")
        {
          if(temp.player==1)$(this).html('<img src="./stylesheets/bishopW.png" alt="bishopW"/>');
          else $(this).html('<img src="./stylesheets/bishopB.png" alt="bishopB" />');
        }
        if(temp.name=="queen")
        {
          if(temp.player==1)$(this).html('<img src="./stylesheets/queenW.png" alt="queenW"/>');
          else $(this).html('<img src="./stylesheets/queenB.png" alt="queenB" />');
        }
        if(temp.name=="king")
        {
          if(temp.player==1)$(this).html('<img src="./stylesheets/kingW.png" alt="kingW"/>');
          else $(this).html('<img src="./stylesheets/kingB.png" alt="kingB" />');
        }
      }
      // $(this).text(" "+temp.name+temp.player);
      else $(this).text("");
  });
  
}
