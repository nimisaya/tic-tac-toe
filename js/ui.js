
let player = `X`;
let turn = 0;

const reset = function(){
  game.reset();

}


$(document).ready(function(){

  // Set the board size
  const size = 3; // 3x3

  // Create game
  game.setup(size);

  const $grid = $('#grid');


  // Display the gameboard
  // Add grid squares to HTML based on game size
  for (let i = 0; i < (Math.pow(size, 2)); i++){
    let $square = $(`<div class="gridSquare" id="square${[i]}"></div>`);
    // Add within grid
    $grid.append($square);
  } // for

  // User clicks on square show piece on Board
  $grid.on('click', 'div', function(event){

    // Update turn
    if(turn % 2 === 0){
      player = 'X';
    } else {
      player = 'O';
    }

    const position = getGridElementsPosition($(this).index());

    const gameState = game.makeMove(position.row,position.column,player);
    // console.log(`row: ${position.row}, column: ${position.column}, Board: ${game.board}`);

    // Display piece on board
    const $piece = $(`<div class="gamePiece ${player}"></div>`);
    if (gameState !== 'Invalid'){
      $(this).append($piece);
    }


    turn++;

    if (gameState === 'Winner'){
      // console.log(`${player} won the game`);
      console.log(`You won the game`);
      // reset game
      game.reset();
    } else if (gameState === 'Draw'){
      console.log(`Game over! It's a draw!`);
      // reset game
      game.reset();
    } else if (gameState === 'Invalid') {
      console.log('Illegal move');
    } else {
      // Next turn
    }
  }); // $grid.on click

  function getGridElementsPosition(index){
    const numColumns = $grid.css('grid-template-columns').split(' ').length;

    const rowPosition = Math.floor(index / numColumns);
    const columnPosition = index % numColumns;

    return {row: rowPosition, column: columnPosition};
  } // getGridElementsPosition()
});
