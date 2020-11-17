

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
  }

  // TODO: User clicks on square show piece on Board
  $grid.on('click', 'div', function(event){
    const position = getGridElementsPosition($(this).index());
    game.makeMove(position.row,position.column,'X')
  }); // $grid.on click

  function getGridElementsPosition(index){
    const numColumns = $grid.css('grid-template-columns').split(' ').length;

    const rowPosition = Math.floor(index / numColumns);
    const columnPosition = index % numColumns;

    return {row: rowPosition, column: columnPosition};
  } // getGridElementsPosition()



  // TODO: Update gameboard & state

});
