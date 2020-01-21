var gameStatus = function(id)
{
    this.id = id;
}
    gameStatus.prototype.player1 = null;
    gameStatus.prototype.player2 = null;
    gameStatus.prototype.board = [
        [{name:"rook", player:2},{name:"knight", player:2},{name:"bishop", player:2},{name:"queen", player:2},{name:"king", player:2},{name:"bishop", player:2},{name:"knight", player:2},{name:"rook", player:2}],
        [{name:"pawn", player:2},{name:"pawn", player:2},{name:"pawn", player:2},{name:"pawn", player:2},{name:"pawn", player:2},{name:"pawn", player:2},{name:"pawn", player:2},{name:"pawn", player:2}],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [{name:"pawn", player:1},{name:"pawn", player:1},{name:"pawn", player:1},{name:"pawn", player:1},{name:"pawn", player:1},{name:"pawn", player:1},{name:"pawn", player:1},{name:"pawn", player:1}],
        [{name:"rook", player:1},{name:"knight", player:1},{name:"bishop", player:1},{name:"queen", player:1},{name:"king", player:1},{name:"bishop", player:1},{name:"knight", player:1},{name:"rook", player:1}],
    ];
    gameStatus.prototype.addPlayer = function(player) //get a websocket
    {
        if(!this.player1) {this.player1 = player;return 1;}
        else {this.player2 = player;return 2;}
    }
module.exports = gameStatus;