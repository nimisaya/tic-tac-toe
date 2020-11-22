let player;
let playerTwoType; // computer or human

let playerOne;
let playerTwo;

let gridSize;
let gameState = 'Continue';

const computer = 'computer';

// GAME
// Retrieve grid
const $grid = $('#grid');

// Display gameBoard
const showGameBoard = function(size){
  const $square = [];

  $grid.css({'grid-template-columns': `repeat(${size}, 1fr)`, 'grid-template-rows': `repeat(${size}, 1fr)`});
  // Create array of gridSquares
  for (let i = 0; i < size; i++){
    for (let j = 0; j < size; j++){
      $square.push($(`<div class="gridSquare" id="square[${i}][${j}]"></div>`));
    } // for ()
  } // for()

  // Add them all to the grid
  for (let i = 0; i < (Math.pow(size, 2)); i++){
      $grid.append($square[i]);
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
  player = playerOne;
  startGame(gridSize);
}; // reset()

const updateGame = function(event){
  if (gameState === 'GameOver'){
    return false; // end game
  }

  let position;
  let squareID;

  // Get index of square user (or computer) selected
  if (player === playerTwo && playerTwoType === computer){
    position = game.getComputerPosition();
  } else {
    position = getSquarePosition($(this).index());
  }

  // Create game piece
  const $piece = $(`<div class="gamePiece ${player}"></div>`);

  // Update move
  if ((gameState === 'Continue')|| (gameState === 'Invalid')){
    gameState = game.addMove(position.row, position.column, player);
  }

  if (player === playerTwo && playerTwoType === computer) {
    squareID = $(`#square\\[${position.row}\\]\\[${position.column}\\]`);
  } else {
    squareID = $(this);
  }

  // Update game state
  switch (gameState) {
    case 'Invalid':
      console.log('Invalid move ya drongo');
      break;
    case 'Winner':
      squareID.append($piece);
      gameState = 'GameOver';

      if(player === 'cross'){
        $('#gameOverMessage').text(`Chicken wins!`);
      } else {
        $('#gameOverMessage').text(`Egg wins!`);
      }
      $('#resetButton').css('display', 'inline-block');
      break;
    case 'Draw':
      squareID.append($piece);
      gameState = 'GameOver';
      $('#gameOverMessage').text(`It's a draw!`);
      $('#resetButton').css('display', 'inline-block');
      break;
    case 'Continue':
      squareID.append($piece);
      break;
    default:
      console.log('GAME OVER');
  } // switch()

  // Update turn
  if(player === playerOne){
    player = playerTwo;

    if(playerTwoType === computer){
      setTimeout(updateGame, 500);
    }
  } else {
    player = playerOne;
  }
}; // updateGame()



// Menu: player chooses piece, vs. computer or human & gridsize
$('.menuButton').on('click', function(){
  if (this.id === 'chickenButton'){
    playerOne = 'cross';
    playerTwo = 'nought';
    player = playerOne;
    hideGamePieceOptions();
    showSecondPlayerOptions();
  } else if (this.id === 'eggButton'){
    playerOne = 'nought';
    playerTwo = 'cross';
    player = playerOne;
    hideGamePieceOptions();
    showSecondPlayerOptions();
  } else if (this.id === 'humanButton'){
    // set player 2 as human
    playerTwoType = 'human';
    hideSecondPlayerOptions();
    showGridOptions();
  } else if (this.id === 'computerButton'){
    // set player 2 as computer
    playerTwoType = computer;
    hideSecondPlayerOptions();
    showGridOptions();
  } else if (this.id === 'gridThree'){
    gridSize = 3;
    startGame(gridSize);
  } else if (this.id === 'gridFour'){
    gridSize = 4;
    startGame(gridSize);
  } else if (this.id === 'gridFive') {
    gridSize = 5;
    startGame(gridSize);
  } else if (this.id === 'gridSix'){
    gridSize = 6;
    startGame(gridSize);
  } else {
    console.log('Error: no id assigned to button');
  }
}); // .menuButton clicked

// GAME PLAY
// User hovers over game squares
$grid.on('mouseenter', 'div', function(event){
  let squareID = `#${this.id}`;
  squareID = squareID.replace(/\[/g, "\\[");
  squareID = squareID.replace(/\]/g, "\\]");

  if ((squareID !== '#') && (gameState !== 'GameOver')){
    if(player === 'cross'){
      $(squareID).css({backgroundImage: `url(images/Chicken-Transparent.png)`, backgroundSize: `cover`});
    } else {
      $(squareID).css({backgroundImage: `url(images/Egg-Transparent.png)`, backgroundSize: `cover`});
    }
  }
}); // .gridSquare hover

$grid.on('mouseleave', 'div', function(event){
  let squareID = `#${this.id}`;
  squareID = squareID.replace(/\[/g, "\\[");
  squareID = squareID.replace(/\]/g, "\\]");

  if ((squareID !== '#') && (gameState !== 'GameOver')){
      $(squareID).css(`background-image`, `none`);
  }
}); // .gridSquare hover

// User makes move
$grid.on('click', 'div', updateGame); // .grid clicked

// Play again with same game settings
$('#resetButton').on('click', reset);
