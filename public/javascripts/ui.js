$(document).ready(function(){
  $("td").click(function(){
      if(game.gameStarted && game.yourTurn && !game.gameEnd) game.select($(this));
      //alert(GameState.selected);
  });
  var timer = setInterval(() => {
    if(game.time>0) game.time--;
    else if(game.yourTurn) game.makeMove();
    $(".time").text(game.time);
  }, 1000);
  //$("td").loadBoard(); 
});
$.fn.loadBoard = function()
{
  return this.each(function() {
      var temp = game.getAt(game.convN($(this).parent().attr("id")+$(this).attr("class")));
      if(temp)
      {
        if(temp.name=="pawn");
      }
      // $(this).text(" "+temp.name+temp.player);
      else $(this).text("");
  });
  
}
