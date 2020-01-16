$(document).ready(function(){
  $("td").click(function(){
      if(game.gameStarted && game.yourTurn && !game.gameEnd) game.select($(this));
      //alert(GameState.selected);
  });
  $("#play").click(function(){
    
    //alert(GameState.selected);
  });
  var timer = setInterval(() => {
    if(game.time>0) game.time--;
    else game.makeMove();
    $("#Timer").text(game.time);
  }, 1000);
  //$("td").loadBoard(); 
});
$.fn.loadBoard = function()
{
  return this.each(function() {
      var temp = game.getAt(game.convN($(this).parent().attr("id")+$(this).attr("class")));
      if(temp) $(this).text(" "+temp.name+temp.player);
      else $(this).text("");
  });
  
}
