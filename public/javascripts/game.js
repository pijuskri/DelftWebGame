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
        if(you.name=="pawn")
        {
            if(this.player==1)
            {
                if(Math.abs(to.row-from.row)<=2 && to.row>from.row && to.col==from.col) return true;
                else if(Math.abs(to.row-from.row)==1 && to.col>from.col && Math.abs(to.row-from.row)<=1 && enemy) return true;
            }
            else
            {
                if(Math.abs(to.row-from.row)<=2 && to.row<from.row && to.col==from.col) return true;
                else if(Math.abs(to.row-from.row)==1 && Math.abs(to.row-from.row)<=1 && enemy) return true;
            }
            
            //areturn false;
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


