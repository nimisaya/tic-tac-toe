
const game = {

  // Game size default 3
  gridSize: 3,

  // Game Board
  board: [],

  rows: null,
  columns: null,
  positiveDiagonal: 0,
  negativeDiagonal: 0,

  start: function(size, playerOne, playerTwoType){
    this.gridSize = size;
    this.player = playerOne;

    // Reset board
    this.board.length = 0;

    // Set up board
    for (let i = 0; i < size; i++){
      this.board.push(new Array(size).fill(0));
    } // for

    // Set up rows, columns and diagonals to determine if game over
    this.rows = new Array(size).fill(0)
    this.columns = new Array(size).fill(0)
    this.positiveDiagonal = 0;
    this.negativeDiagonal = 0;

    console.log(`Game is ${size} by ${size}. Player one is ${playerOne}. Player two type is ${playerTwoType}`);
    console.log(this.board);
    console.log(this.rows);
  }, // start()

  isIdentical: function(array){
    for(let i = 0; i < array.length - 1; i++) {
      console.log(array[i] !== array[i + 1]);

      if(array[i] !== array[i + 1]) {
        return false;
      }
    } // for
    return true;
  }, // isIdentical()

  checkGameState: function(row, column, player){
    const comparisonString = [];

    // Check if won across Row
    if(this.rows[row] === this.gridSize){

      for (let i = 0; i < this.gridSize; i++){
        comparisonString.push(this.board[row][i]);
      }// for

      if (this.isIdentical(comparisonString)){
        return `Winner`;
      } else {
        comparisonString.length = 0;
      }
    // Check if won across Column
    } else if (this.columns[column] === this.gridSize){
        for (let i = 0; i < this.gridSize; i++){
          comparisonString.push(this.board[i][column]);
        }
      if (this.isIdentical(comparisonString)){
        return `Winner`;
      } else {
        comparisonString.length = 0;
      }
    // Check if won on positive diagonal
  } else if (this.positiveDiagonal === this.gridSize){
      for (let i = 0; i < this.gridSize; i++){
        comparisonString.push(this.board[i][i]);
      }
      if (this.isIdentical(comparisonString)){
        return `Winner`;
      } else {
        comparisonString.length = 0;
      }
    // Check if won on negative diagonal
  } else if (this.negativeDiagonal === this.gridSize){
      let j = this.gridSize - 1;
      for (let i = 0; i < this.gridSize; i++){
          comparisonString.push(this.board[i][j]);
          j--;
      }
      if (this.isIdentical(comparisonString)){
        return `Winner`;
      } else {
        comparisonString.length = 0;
      }
    }
    // Check if it is a draw
    if (this.board.includes(0)){
      return `Draw`
    } else {
      return 'Continue';
    }
  }, // checkGameState()

  addMove: function(row, column, player){
    // Ensure move is valid
    if ((this.board[row][column] !== 0)){
      return 'Invalid';
    }

    // Add move
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

    // Update Game state
    const gameState = this.checkGameState(row, column, player);
    console.log(gameState);
    return gameState;

  }, // addMove()

}; // game
