const game = {

  // Game will be 3 x 3
  gridSize: 0,

  // Game Board
  board: [],

  rows: Array(this.gridSize).fill(0),
  columns: Array(this.gridSize).fill(0),
  positiveDiagonal: 0,
  negativeDiagonal: 0,

  setup: function(size){
    // Set grid size
    this.gridSize = size;

    // Set up board
    for (let i = 0; i < this.gridSize; i++){
      this.board.push(Array(this.gridSize).fill(0));
    }
  }, // setup()

  checkState: function(row, column, player){
    const comparisonString = [];

    // Check if won across Row
    if(this.rows[row] === this.gridSize){

      for (let i = 0; i < this.rows.length; i++){
        comparisonString.push(this.board[row][i]);
      }

      if (comparisonString.every(function(letter){return letter === player;})){
        return `${player} wins the game!`;
      } else {
        comparisonString.length = 0;
      }
    // Check if won across Column
  } else if (this.columns[column] === this.gridSize){

        for (let i = 0; i < this.columns.length; i++){
          comparisonString.push(this.board[i][column]);
        }

      if (comparisonString.every(function(letter){return letter === player;})){
        return `${player} wins the game!`;
      } else {
        comparisonString.length = 0;
      }
    // Check if won on positive diagonal
  } else if (this.positiveDiagonal === this.gridSize){

      for (let i = 0; i < this.gridSize; i++){
        comparisonString.push(this.board[i][i]);
      } // for

      if (comparisonString.every(function(letter){return letter === player;})){
        return `${player} wins the game!`;
      } else {
        comparisonString.length = 0;
      }
    // Check if won on negative diagonal
    } else if (this.negativeDiagonal === this.gridSize){

      let j = this.gridSize - 1;

      for (let i = 0; i < this.gridSize; i++){
          comparisonString.push(this.board[i][j]);
          j--;
      } // for

      if (comparisonString.every(function(letter){return letter === player;})){
        return `${player} wins the game!`;
      } else {
        comparisonString.length = 0;
      }
    }

    // Check if it is a draw
    if (this.board.every(function(letter){return letter !== 0;})){
      return `It's a draw.`
    }
  }, // checkState()

  makeMove: function(row, column, player){

    if (this.board[row][column] !== 0){
      return 'Invalid move'
    }

    // Add piece
    this.board[row][column] = player;

    // Increment row / column / diagonal / neg diagonal counts
    this.rows[row]++;
    this.columns[column]++;

    if (row === column) {
      this.positiveDiagonal++;
    }

    if (row + column + 1 === this.gridSize){
      this.negativeDiagonal++;
    }

    const gameState = this.checkState(row, column, player);
    if (gameState !== null){
      return gameState;
    }
  }, // makeMove()
}; // game


const runTests = function(){
game.setup(3);
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
  game.makeMove(1,1, 'X');
  game.makeMove(0,0, 'O');
  game.makeMove(1,0, 'X');
  game.makeMove(1,2, 'O');
  game.makeMove(2,0, 'X');
  game.makeMove(0,2, 'O');
  game.makeMove(2,1, 'X');
  console.log(game.makeMove(0,1, 'O'));

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

  console.log(game.board);
}

// runTests();
