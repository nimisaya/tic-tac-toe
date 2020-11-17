

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
  $grid.on('click', function(){
    alert(event.srcElement.id);
  })
  // TODO: Update gameboard & state

});
