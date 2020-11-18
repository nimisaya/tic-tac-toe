
const game = {

  // Game size default 3
  gridSize: 3,

  // Game Board
  board: [],

  count: 0,
  totalGridPoints: 0,

  rows: null,
  columns: null,
  positiveDiagonal: 0,
  negativeDiagonal: 0,

  calculateTotalGridPoints: function(size){
    this.totalGridPoints = 2 * Math.pow(size, 2) + 2 * size;
  },

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

    // Calculate grid points in game board (rows^2 + columns^2 + positiveDiagonal + negativeDiagonal )
    this.calculateTotalGridPoints(size);

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
    const comparisonArray = [];

    // Check if won across Row
    if(this.rows[row] === this.gridSize){

      for (let i = 0; i < this.gridSize; i++){
        comparisonArray.push(this.board[row][i]);
      }// for

      if (this.isIdentical(comparisonArray)){
        return `Winner`;
      } else {
        comparisonArray.length = 0;
      }
    // Check if won across Column
    } else if (this.columns[column] === this.gridSize){
        for (let i = 0; i < this.gridSize; i++){
          comparisonArray.push(this.board[i][column]);
        }
      if (this.isIdentical(comparisonArray)){
        return `Winner`;
      } else {
        comparisonArray.length = 0;
      }
    // Check if won on positive diagonal
    } else if (this.positiveDiagonal === this.gridSize){
      for (let i = 0; i < this.gridSize; i++){
        comparisonArray.push(this.board[i][i]);
      }
      if (this.isIdentical(comparisonArray)){
        return `Winner`;
      } else {
        comparisonArray.length = 0;
      }
    // Check if won on negative diagonal
    } else if (this.negativeDiagonal === this.gridSize){
      let j = this.gridSize - 1;
      for (let i = 0; i < this.gridSize; i++){
          comparisonArray.push(this.board[i][j]);
          j--;
      }
      if (this.isIdentical(comparisonArray)){
        return `Winner`;
      } else {
        comparisonArray.length = 0;
      }
    }

    if (this.count === this.totalGridPoints){
      console.log(`count: ${this.count}, totalGridPoints: ${this.totalGridPoints} and it's a draw`);
      return `Draw`;
    }
    console.log(`count: ${this.count}, totalGridPoints: ${this.totalGridPoints} so CONTINEU`);

    return 'Continue';
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
    this.count++;

    this.columns[column]++;
    this.count++;

    if (row === column) {
      this.positiveDiagonal++;
      this.count++;
    }

    if (row + column + 1 === this.gridSize){
      this.negativeDiagonal++;
      this.count++;
    }

    // Update Game state
    const gameState = this.checkGameState(row, column, player);
    console.log(gameState);
    return gameState;

  }, // addMove()

}; // game
