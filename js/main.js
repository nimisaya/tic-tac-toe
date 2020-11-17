// Game will be 3 x 3
const gridSize = 3;

// Game Board
const gameBoard = [];

const rows = Array(gridSize).fill(0);
const columns = Array(gridSize).fill(0);
let positiveDiagonal = 0;
let negativeDiagonal = 0;

const setupGame = function(){
  // Set up Gameboard
  for (let i = 0; i < gridSize; i++){
    gameBoard.push(Array(gridSize).fill(0));
  }
}; // setupGame()

const checkGameState = function(row, column, player){
  const comparisonString = [];

  // Check if won across Row
  if(rows[row] === gridSize){

    for (let i = 0; i < rows.length; i++){
      comparisonString.push(gameBoard[row][i]);
    }

    if (comparisonString.every(function(letter){return letter === player;})){
      return `${player} wins the game!`;
    } else {
      comparisonString.length = 0;
    }
  // Check if won across Column
  } else if (columns[column] === gridSize){

      for (let i = 0; i < columns.length; i++){
        comparisonString.push(gameBoard[i][column]);
      }

    if (comparisonString.every(function(letter){return letter === player;})){
      return `${player} wins the game!`;
    } else {
      comparisonString.length = 0;
    }
  // Check if won on positive diagonal
  } else if (positiveDiagonal === gridSize){

    for (let i = 0; i < gridSize; i++){
      comparisonString.push(gameBoard[i][i]);
    }

    if (comparisonString.every(function(letter){return letter === player;})){
      return `${player} wins the game!`;
    } else {
      comparisonString.length = 0;
    }
  // Check if won on negative diagonal
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

  // Check if it is a draw
  if (gameBoard.every(function(letter){return letter !== 0;})){
    return `It's a draw.`
  }
}; // checkGameState()

const makeMove = function(row, column, player){

  if (gameBoard[row][column] !== 0){
    return 'Invalid move'
  }

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

const gameState = checkGameState(row, column, player);
if (gameState !== null){
  return gameState;
}




}

const runTests = function(){
setupGame();
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

  // Taking Turns and 0 wins
  makeMove(1,1, 'X');
  makeMove(0,0, 'O');
  makeMove(1,0, 'X');
  makeMove(1,2, 'O');
  makeMove(2,0, 'X');
  makeMove(0,2, 'O');
  makeMove(2,1, 'X');
  console.log(makeMove(0,1, 'O'));

  // Draw
  // makeMove(0,0, 'O');
  // makeMove(0,1, 'X');
  // makeMove(0,2, 'O');
  //
  // makeMove(1,0, 'X');
  // makeMove(1,1, 'O');
  // makeMove(1,2, 'X');
  //
  // makeMove(2,0, 'X');
  // makeMove(2,1, 'O');
  // console.log(makeMove(2,2, 'X'));

  // Illegal move
  // makeMove(0,0, 'O');
  // console.log(makeMove(0,0, 'X'));

  console.log(gameBoard);
}

runTests();
