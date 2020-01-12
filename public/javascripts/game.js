

var game = {
    // r-rook,kn-knight,b-bishop,q-queen,k-king,b-bishop,kn-knight,r-rook,p-pawns
    gameID:null,
    player:null,
    board:null,
    selected:null,
    gameStarted:true,
    yourTurn:true,
    movePiece : function (from, to)
    {
        //console.log(to.charCodeAt(0)-65);
        this.board[to.row][to.col] = this.board[from.row][from.col];
        this.board[from.row][from.col] = null;
    },
    select : function(input)
    {
        var adress = this.convN( input.parent().attr("id")+input.attr("class"));
        //console.log(this.getAt(adress));
        if(this.selected==undefined && this.getAt(adress) && this.getAt(adress).player==this.player)
        {
            //console.log("selected");
            input.css("background-color", "#c9c9e2");
            this.selected = new Object();
            this.selected.adress=adress;
            this.selected.html=input;
        }
        else if(this.selected && this.canMove(this.selected.adress,adress))
        {
            //console.log(input);
            this.movePiece(this.selected.adress,adress);
            $("td").loadBoard().css("background-color", "white");
            this.selected.html.css("background-color", "white");
            this.selected = null;
            sendMove();
            //this.yourTurn = false;
        }
        else if(this.selected && this.selected.adress.row==adress.row && this.selected.adress.col==adress.col)
        {
            this.selected.html.css("background-color", "white");
            this.selected = null;
        }
        else
        {
            input.css({"background-color":'red'});
        }
        //input.addClass("click");
        
        input.animate({backgroundColor: 'red'}, 400)
            .delay(400)
            .animate({backgroundColor: 'red'}, 1000);
        
        //if(this.selected)console.log( this.selected.adress. adress);
    },
    getAt : function(adress)
    {
        return this.board[adress.row][adress.col];
    },
    canMove : function(from,to)
    {
        var you = this.getAt(from);
        var enemy = this.getAt(to);
        if(from.row==to.row && from.col==to.col) return false;
        if(enemy && you.player==enemy.player)return false;
        //if(enemy && enemy.name=="king")return false;
        var dx = to.col-from.col;
        var dy = to.row - from.row;
        if(you.name=="pawn")
        {
            if(this.player==1)
            {
                if(Math.abs(dy)<=2 && to.row<from.row && to.col==from.col)
                {
                    if(Math.abs(dy)==2)
                    {
                        if(!this.board[to.row+1][to.col])return true;
                    }
                    else return true;
                }
                else if(Math.abs(dy)==1 && to.row<from.row && Math.abs(dy)<=1 && enemy) return true;
            }
            else
            {
                if(Math.abs(dy)<=2 && to.row>from.row && to.col==from.col)
                {
                    if(Math.abs(dy)==2)
                    {
                        if(!this.board[to.row-1][to.col])return true;
                    }
                    else return true;
                }
                else if(Math.abs(dy)==1 && to.row>from.row && Math.abs(dy)<=1 && enemy) return true;
            }
            
            return false;
        }
        if(you.name=="knight")
        {
            var x = Math.abs(from.col - to.col); 
            var y = Math.abs(from.row - to.row); 
            return x * y == 2; 
        }
        if(you.name=="rook")
        {
            if(this.rookCheck(from,to))return true;
        }
        if(you.name=="bishop")
        {
            if(this.bishopCheck(from,to))return true;
        }
        if(you.name=="queen")
        {
            if(this.rookCheck(from,to) || this.bishopCheck(from,to))return true;
        }
        if(you.name=="king")
        {
            if(Math.abs(dx)<=1 && Math.abs(dy)<=1 && !this.canBeAttacked(to)) return true;
        }
        return false;
    },
    bishopCheck : function(from,to)
    {
        var dx = to.col-from.col;
        var dy = to.row - from.row;
        var free=true;
        if(Math.abs(dx)==Math.abs(dy))
        {
            var d = from.col;
            var i = from.row;
            while ((dy>0? i<to.row : i>to.row) && (dx>0? d<to.col : d>to.col))
            {
                if(dy>0)i++;
                else i--;
                if(dx>0)d++;
                else d--;
                if(this.board[i][d] && (dy>0? i<to.row : i>to.row) && (dx>0? d<to.col : d>to.col))free=false;
            }
        }
        else free = false;
        return free;
    },
    rookCheck : function(from,to)
    {
        var dx = to.col-from.col;
        var dy = to.row - from.row;
        var free=true;
        if(dx==0)
        {
            for(var i = from.row;i!=to.row;){
                if(dy>0) i++;
                else i--;
                if(this.board[i][from.col] && i!=to.row)free=false;
            }
        }
        else if(dy==0)
        {
            for(var i = from.col;i!=to.col;){
                if(dx>0) i++;
                else i--;
                if(this.board[from.row][i] && i!=to.col)free=false;
            }
        }
        else free=false;
        return free;
    },
    kingCheck : function( )
    {
        var safe = true;
        var found;
        for(var i = 0; i < this.board.length; i++) {
            for(var j = 0; j < this.board[i].length; j++) {
                if(this.board[i][j] && this.board[i][j].player==this.player && this.board[i][j].name=="king")found = {row:i,col:j};
            }
        }
        
        if(this.canBeAttacked(found)) console.log("king"+this.player+" is not safe");
    },
    canBeAttacked : function(place)
    {
        for(var i = 0; i < this.board.length; i++) {
            for(var j = 0; j < this.board[i].length; j++) {
                if(this.board[i][j] && this.board[i][j].player!=this.player && this.canMove({row:i,col:j},place)) return true;
            }
        }
        return false;
    },
    convN : function(adress)
    {
        var cor = Object();
        cor.row = adress.charCodeAt(0)-65;
        cor.col = adress.charAt(1)-1;
        return cor;
    }
    //$("td").loadBoard();
}


