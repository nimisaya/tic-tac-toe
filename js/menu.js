const config = {
  player: {
    one: '',
    two: '',
  }, // config.player

  gameMode: '',  {

  grid: {
    size: null,

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
      };
    }
  }, // config.grid

  createGame: function(){
    // Hide menu
    $('.menu').toggle();
    // Show game
    $('#game').toggle();
    // Set game variables
    game.startGame(this.player.one, this.gameMode, this.grid.size);
    // Display game board
    ui.setup(grid.size);
  }, // config.createGame()
}; // config

$('document').ready(function(){
  const menuButton = $('.menuButton');

  menuButton.on('click', function(){
    const buttonID = this.id;

    switch (buttonID) {
      // Token
      case '.cross':
        config.player.one = 'cross';
        $('#selectToken').toggle();
        break;
      case '.nought':
        config.player.one = 'nought';
        $('#selectToken').toggle();
        break;
      // Game mode
      case '.computer':
        config.gameMode = 'computer';
        $('#selectGamemode').toggle();
        $('.gridOptions').toggle();
        break;
      case '.human':
        config.gameMode = 'human';
        $('#selectGamemode').toggle();
        $('.gridOptions').toggle();
        break;
      // Grid settings
      case '#gridThree':
        config.grid.setSize('three');
        config.createGame();
        break;
      case '#gridFour':
        config.grid.setSize('four');
        config.createGame();
        break;
      case '#gridFive':
        config.grid.setSize('five');
        config.createGame();
        break;
      case '#gridSix':
        config.grid.setSize('six');
        config.createGame();
        break;

      default:
        console.log('Error: Please set up game.');
    } // switch
  }); // menu button click event
}); // document.ready()
