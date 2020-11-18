let player;
let playerTwoType; // Computer or human
// let turn = 0;

let gridSize;

// GAME
// Retrieve grid
const $grid = $('#grid');
let $square;

// Display gameBoard
const showGameBoard = function(size){
  $grid.css({'grid-template-columns': `repeat(${size}, 1fr)`, 'grid-template-rows': `repeat(${size}, 1fr)` });

  for (let i = 0; i < (Math.pow(size, 2)); i++){
    $square = $(`<div class="gridSquare" id="square${[i]}"></div>`);
    // Add within grid
    $grid.append($square);
  } // for
}; // showGameBoard()


// MENU
const showMenu = function(){
  $('#menu').css('display', 'block');
}; // displayGamePieceOptions()

const showSecondPlayerOptions = function(){
  $('#playerTwoSelection').css('display', 'block');
  $('#menuQuestion').text('Are you playing a human or computer?');
}; // showSecondPlayerOptions()

const showGridOptions = function(){
  $('.gridButton').css('display', 'inline-block');
    $('#menuQuestion').text('What size grid?');
}

const hideGamePieceOptions = function(){
  console.log('Hide game pieces');
  $('#pieceSelection').css('display', 'none');
}; // displayGamePieceOptions()

const hideSecondPlayerOptions = function(){
  $('#playerTwoSelection').css('display', 'none');
}; // displayGamePieceOptions()

const showGame = function(){
    $('#game').css('display', 'flex');
}; // showGame()

const startGame = function(size){
  $('#menu').css('display', 'none');
  showGame();
  game.start(size, player, playerTwoType);
  showGameBoard(size);
}; // startGame()

// Assign game pieces, set player 2 type and set grid size
$('.menuButton').on('click', function(){
  console.log(this.id);
  if (this.id === 'chickenButton'){
    player = 'X';
    console.log(player);
    hideGamePieceOptions();
    showSecondPlayerOptions();
  } else if (this.id === 'eggButton'){
    player = 'O'
    console.log(player);
    hideGamePieceOptions();
    showSecondPlayerOptions();
  } else if (this.id === 'humanButton'){
    // set player 2 as human
    playerTwoType = 'human';
    console.log(`Player 2 is human`);
    hideSecondPlayerOptions();
    showGridOptions();
  } else if (this.id === 'computerButton'){
    // set player 2 as computer
    playerTwoType = 'computer';
    console.log(`Player 2 is a computer`);
    hideSecondPlayerOptions();
    showGridOptions();
  } else if (this.id === 'gridThree'){
    gridSize = 3;
    startGame(3);
  } else if (this.id === 'gridFour'){
    startGame(4);
  } else if (this.id === 'gridFive') {
    startGame(5);
  } else if (this.id === 'gridSix'){
    startGame(6);
  } else {
    console.log('Error: no id assigned to button');
  }
}); // .menuButton clicked


// User makes move
$grid.on('click', 'div', function(event){

  // Get square user selected
  const position = getGridElementsPosition($(this).index());

  // Update move
  const gameState = game.addMove(position.row, position.column, player);

  console.log(`row: ${position.row}, column: ${position.column}, Board: ${game.board}`);

  // Show move
  const $piece = $(`<div class="gamePiece ${player}"></div>`);
  if (gameState !== 'Invalid'){
    $(this).append($piece);
  }

  // Update game state

  // Update turn
  if(player === 'X'){
    player = 'O';
  } else {
    player = 'X';
  }

}); // .grid clicked

// Game over

// Display game over information


// Reset game
const reset = function(){
  turn = 0;
}

function getGridElementsPosition(index){
  const numColumns = $grid.css('grid-template-columns').split(' ').length;

  const rowPosition = Math.floor(index / numColumns);
  const columnPosition = index % numColumns;

  return {row: rowPosition, column: columnPosition};
} // getGridElementsPosition()
