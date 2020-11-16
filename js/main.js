// Pieces
const playerOne = "X";
const playerTwo = "O";

// Game will be 3 x 3 grid
const numberOfSquares = 3;


let gameSquares = [];
gameSquares.length = Math.pow(numberOfSquares, 2);


// Add to the tally for row/column/diagonal/opposite diagonal when a piece is placed. If the total in any row/column/diagonal/opposite diagonal is the same as squares in row then game is over. Note: can be in a row, column and diagonal all at once e.g. 1,1 in a 3 x 3
const rows = Array(numberOfSquares).fill(0);
const columns = Array(numberOfSquares).fill(0);
const positiveDiagonal = Array(numberOfSquares).fill(0);
const negativeDiagonal = Array(numberOfSquares).fill(0);

const makeMove = function(row, column, player){
  console.log(`Player (${player}) chose ${row}, ${column}`);

  // Add piece

  // Increment row / column / diagonal / neg diagonal counts
  rows[row]++;
  columns[column]++;


  if (row === column) {
    positiveDiagonal[row]++;
  }

  if (row + column + 1 === numberOfSquares){
    negativeDiagonal[row]++;
  }

  console.log(`Row plays: ${rows}, Column plays: ${columns}, Diagonal: ${positiveDiagonal}, Neg Diagonal: ${negativeDiagonal}`);

  // Game over (Win || Lose || Draw)
  if ((rows[row] === numberOfSquares)
  ||(columns[column] === numberOfSquares)
  || (positiveDiagonal[row] === numberOfSquares)
  || (negativeDiagonal[row] === numberOfSquares)){

    console.log('Game over');
    // Check the current row / column / diagonal / neg diagonal to see if all same piece. If they are then this player is the winner else it's a draw
  }

} // makeMove()

const runTests = function(){
  // Check diagonal
  makeMove(1,1,'X');

  // Check game over along top row
  makeMove(0,0,'X');
  makeMove(0,1,'X');
  makeMove(0,2,'X');
}; // runTests()

runTests();
