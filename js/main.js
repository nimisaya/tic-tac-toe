// Game will be 3 x 3
const gridSize = 3;

// Game Board
const gameBoard = [];
gameBoard.push(Array(gridSize).fill(0));
gameBoard.push(Array(gridSize).fill(0));
gameBoard.push(Array(gridSize).fill(0));


const rows = Array(gridSize).fill(0);
const columns = Array(gridSize).fill(0);
let positiveDiagonal = 0;
let negativeDiagonal = 0;

const comparisonString = [];

const makeMove = function(row, column, player){
  // TODO: Check position available

  // Add piece
  gameBoard[row][column] = player;

  // Increment row / column / diagonal / neg diagonal counts
  rows[row]++;
  columns[column]++;

  if (row === column) {
    positiveDiagonal++;
  }

  if (row + column + 1 === gridSize){
    negativeDiagonal++;
  }

  // Game over (Win || Lose || Draw)
  //ROW
  if(rows[row] === gridSize){

    for (let i = 0; i < rows.length; i++){
      comparisonString.push(gameBoard[row][i]);
    }

    if (comparisonString.every(function(letter){return letter === player;})){
      return `${player} wins the game!`;
    } else {
      comparisonString.length = 0;
    }
  } else if (columns[column] === gridSize){

      for (let i = 0; i < columns.length; i++){
        comparisonString.push(gameBoard[i][column]);
      }

    if (comparisonString.every(function(letter){return letter === player;})){
      return `${player} wins the game!`;
    } else {
      comparisonString.length = 0;
    }

  } else if (positiveDiagonal === gridSize){

    for (let i = 0; i < gridSize; i++){
      comparisonString.push(gameBoard[i][i]);
    }

    if (comparisonString.every(function(letter){return letter === player;})){
      return `${player} wins the game!`;
    } else {
      comparisonString.length = 0;
    }
  } else if (negativeDiagonal === gridSize){

    let j = gridSize - 1;

    for (let i = 0; i < gridSize; i++){
        comparisonString.push(gameBoard[i][j]);
        j--;
    }

    if (comparisonString.every(function(letter){return letter === player;})){
      return `${player} wins the game!`;
    } else {
      comparisonString.length = 0;
    }
  }

  // TODO: It's a draw
}

const runTests = function(){

  // Row 0 Win
  // makeMove(0,0,'X');
  // makeMove(0,1,'X');
  // makeMove(0,2,'X');

  // Row 2 Win
  // makeMove(2,0,'X');
  // makeMove(2,1,'X');
  // makeMove(2,2,'X');

  // Column Win
  // makeMove(0,2,'X');
  // makeMove(1,2,'X');
  // makeMove(2,2,'X');

  // // Diagonal -> Win
  // makeMove(0,0,'X');
  // makeMove(1,1,'X');
  // makeMove(2,2,'X');

  // Diagonal <- Win
  // makeMove(0,2,'X');
  // makeMove(1,1,'X');
  // makeMove(2,0,'X');

  // Taking Turns
  makeMove(1,1, 'X');
  makeMove(0,0, 'O');
  makeMove(1,0, 'X');
  makeMove(1,2, 'O');
  makeMove(2,0, 'X');
  makeMove(0,2, 'O');
  makeMove(2,1, 'X');
  console.log(makeMove(0,1, 'O'));

  console.log(gameBoard);
}

runTests();
