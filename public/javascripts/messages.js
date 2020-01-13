(function(exports) {
 
  exports.UpdateLocal_s = "Update board";
  exports.UpdateLocal_o = {
    type: exports.UpdateLocal_s,
    data: null
  };
  exports.UpdateLocal_j = JSON.stringify(exports.UpdateLocal_o);

  exports.UpdateServer_s = "Update board";
  exports.UpdateServer_o = {
    type: exports.UpdateServer_s,
    data: {
      baord:null,
      id:null,
      player:null,
    }
  };
  exports.UpdateServer_j = JSON.stringify(exports.UpdateServer_o);

  exports.Player_s = "Set player";
  exports.Player_o = {
    type: exports.Player_s,
    data: null
  };
  exports.Player_j = JSON.stringify(exports.Player_o);

  exports.PlayerAss_s = "Set player number";
  exports.PlayerAss_o = {
    type: exports.PlayerAss_s,
    data: null
  };
  exports.PlayerAss_j = JSON.stringify(exports.PlayerAss_o);

  exports.GameStart_s = "Game started";
  exports.GameStart_o = {
    type: exports.GameStart_s,
    data: null
  };
  exports.GameStart_j = JSON.stringify(exports.GameStart_o);

  exports.Turn_s = "It is your turn";
  exports.Turn_o = {
    type: exports.Turn_s,
    data: null
  };
  exports.Turn_j = JSON.stringify(exports.Turn_o);

  exports.GameEnd_s = "The game has ended";
  exports.GameEnd_o = {
    type: exports.GameEnd_s,
    data: null
  };
  exports.GameEnd_j = JSON.stringify(exports.GameEnd_o);

  
})(typeof exports === "undefined" ? (this.Messages = {}) : exports);
//if exports is undefined, we are on the client; else the server