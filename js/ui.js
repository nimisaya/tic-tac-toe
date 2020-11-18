let player;
let playerTwoType = 'human'; // Computer or human
let turn = 0;

let gridSize = 3;

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

const hideMenu = function(){
  $('#menu').css('display', 'none');
}; // hideMenu()

const showGame = function(){

}; // showGame()

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
    showSecondPlayerOptions();
  } else if (this.id === 'humanButton'){
    // set player 2 as human
    playerTwoType = 'computer';
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
    hideMenu();
    showGame();
  } else if (this.id === 'gridFour'){
    gridSize = 4;
    hideMenu();
    showGame();
  } else if (this.id === 'gridFive') {
    gridSize = 5
    hideMenu();
    showGame();
  } else if (this.id === 'gridSix'){
    gridSize == 6;
    hideMenu();
    showGame();
  } else {
    console.log('Error: no id assigned to button');
  }

  console.log(`Player 1 is ${player}, player 2 is ${playerTwoType}, Grid size is ${gridSize}`);
}); // .menuButton clicked

// Hide piece selection buttons

// Display player 2: human or computer buttons


// Set player 2 type


// Hide menu

// Set grid size


// Display gameBoard

// User makes move

// Game over

// Display game over information


// Reset game
