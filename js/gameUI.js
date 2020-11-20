const $grid = $('#grid');
const $resetButton = $('#reset');
const $endGameMessage = $('#gameOverMessage');

const ui = {
  // player: null,
  squareID: '',

  setup: function(size){
    const $square = [];

    $grid.css({'grid-template-columns': `repeat(${size}, 1fr)`, 'grid-template-rows': `repeat(${size}, 1fr)`});

    // Create array of gridSquares
    for (let i = 0; i < size; i++){
      for (let j = 0; j < size; j++){
        $square.push($(`<button class="gridSquare" id="square${i}_${j}" aria-label="Game square"></button>`));
      } // for ()
    } // for()

    // Add them all to the grid
    for (let i = 0; i < (Math.pow(size, 2)); i++){
        $grid.append($square[i]);
    } // for
  }, // ui.setup()

  reset: function(){
    $resetButton.toggle();
    $endGameMessage.text('');
    $grid.children().remove();
    game.reset();
  }, // ui.reset()

  getPlayerToken: function(){
    if (game.player.one.turn){
      player = game.player.one.token;
    } else {
      player = game.player.two.token;
    }
    return player;
  }, // ui.getPlayerToken()

  getPosition: function(index){
    const rowPosition = Math.floor(index / gridSize);
    const columnPosition = index % gridSize;

    return {row: rowPosition, column: columnPosition};
  }, // getSquarePosition()

  updateState: function(){
    if (game.state.win){
      if (player === 'cross'){
        $endGameMessage.text('Chicken wins!');
        $resetButton.toggle();
      } else {
        $endGameMessage.text('Egg wins!');
        $resetButton.toggle();
      }
      this.reset();
    } else if (game.state.draw){
      $endGameMessage.text(`It's a draw!`);
      $resetButton.toggle();
      this.reset();
    } else if (game.state.invalid){
      console.log('Invalid state ya drongo');
    } else {
      // continue game
    }
  }, // ui.updateState()

  showMove: function(){
    const player = this.getPlayerToken();

    if (game.player.two.computerMode && !game.player.one.turn) {
      this.squareID = $(`#square${computer.position.row}_${computer.position.column}`);
      validMove = game.addMove(player);
    } else {
      const position = this.getPosition($(this).index());
      this.squareID = $(this);
      validMove = game.addMove(player, position.row, position.column);
    }

    if (validMove){
      const $token = $(`<div class="gameToken ${player}" aria-label="${player} token"></div>`);
      squareID.append($token);
    }

    this.updateState();
  }, // ui.showMove()
}; // ui

$('document').ready(function(){

  // User hovers over game squares
  $grid.on('mouseenter', 'div', function(event){
    const squareID = `#${this.id}`;
    // squareID = squareID.replace(/\[/g, "\\[");
    // squareID = squareID.replace(/\]/g, "\\]");

    if ((squareID !== '#') && (game.state.continue)){
      if(player === 'cross'){
        $(squareID).addClass('chicken');
      } else {
        $(squareID).addClass('egg');
      }
    }
  }); // .gridSquare hover

  $grid.on('mouseleave', 'div', function(event){
    const squareID = `#${this.id}`;
    // squareID = squareID.replace(/\[/g, "\\[");
    // squareID = squareID.replace(/\]/g, "\\]");

    if ((squareID !== '#') && (game.state.continue)){
      if(player === 'cross'){
        $(squareID).removeClass('chicken');
      } else {
        $(squareID).removeClass('egg');
      }
    }
  }); // .gridSquare leave

  // User makes move
  $grid.on('click', 'div', updateGame); // .grid clicked

  // Play again with same game settings
  $('#resetButton').on('click', reset);
}); // document.ready()
