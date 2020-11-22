$(document).ready(function(){

  // UI
  const ui = {

    player: {
      one: '',
      two: '',
    }, // player

    gameMode: '',
    gridSize: null,

    // Game menu
    menu: {
      setPlayerTokens: function(playerOne, playerTwo){
        this.player.one = playerOne;
        this.player.two = playerTwo;
      }, // setPlayerTokens()

        setSize: function(rowSize){
          switch (rowSize){
            case 'four':
            this.size = 4;
            break;
            case 'five':
            this.size = 5;
            break;
            case 'six':
            this.size = 6;
            break;
            default:
            this.size = 3;
          } // switch
        }, // setSize()
      }, // grid



    }, // menu

    game: {
      createGame: function(){
        // Hide menu
        $('#menu').toggle();
        // Show game
        $('#game').toggle();
        // Set game variables
        game.startGame(this.player.one, this.gameMode, this.menu.settings.grid.size);
        // Display game board
        this.setup(grid.size);
      }, // createGame()

    }, // gameInterface

  }; // ui

  // Event Listeners


});
