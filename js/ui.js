let player;
let playerTwoType; // Computer or human
// let turn = 0;

let gridSize;
let gameState = 'Continue';

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

// Reset game
const reset = function(){
  $('#resetButton').css('display', 'none');
  gameState = 'Continue';
  $grid.children().remove();
  $('#gameOverMessage').text(``);
  startGame(gridSize);
}; // reset()

// Menu: player chooses piece, vs. computer or human & gridsize
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

$grid.on('mouseenter', 'div', function(event){
  const squareID = `#${this.id}`;

  if ((squareID !== '#') && (gameState !== 'GameOver')){
    if(player === 'X'){
      $(squareID).css({backgroundImage: `url(images/Chicken-Transparent.png)`, backgroundSize: `cover`});
    } else {
      $(squareID).css({backgroundImage: `url(images/Egg-Transparent.png)`, backgroundSize: `cover`});
    }
  }
}); // .gridSquare hover

$grid.on('mouseleave', 'div', function(event){
  const squareID = `#${this.id}`;
  if ((squareID !== '#') && (gameState !== 'GameOver')){
      $(squareID).css(`background-image`, `none`);
  }
}); // .gridSquare hover

// User makes move
$grid.on('click', 'div', function(event){

  // Get square user selected
  const position = getGridElementsPosition($(this).index());

  // Show move
  const $piece = $(`<div class="gamePiece ${player}"></div>`);

  // Update move
  if ((gameState === 'Continue')|| (gameState === 'Invalid')){
    gameState = game.addMove(position.row, position.column, player);

    // console.log(`row: ${position.row}, column: ${position.column}, Board: ${game.board}`);
  }

  switch (gameState) {
    case 'Invalid':
      console.log('Invalid move ya drongo');
      break;
    case 'Winner':
      $(this).append($piece);
      console.log('Winner winner, chicken dinner');
      gameState = 'GameOver';

      if(player === 'X'){
        $('#gameOverMessage').text(`Chicken wins!`);
      } else {
        $('#gameOverMessage').text(`Egg wins!`);
      }
      $('#resetButton').css('display', 'inline-block');
      break;
    case 'Draw':
      $(this).append($piece);
      gameState = 'GameOver';
      $('#gameOverMessage').text(`It's a draw!`);
      $('#resetButton').css('display', 'inline-block');
      break;
    case 'Continue':
      $(this).append($piece);
      break;
    default:
      console.log('GAME OVER');
  } // switch (gameState)

  // Update turn
  if(player === 'X'){
    player = 'O';
  } else {
    player = 'X';
  }
}); // .grid clicked

$('#resetButton').on('click', reset);

function getGridElementsPosition(index){
  const numColumns = $grid.css('grid-template-columns').split(' ').length;

  const rowPosition = Math.floor(index / numColumns);
  const columnPosition = index % numColumns;

  return {row: rowPosition, column: columnPosition};
} // getGridElementsPosition()
