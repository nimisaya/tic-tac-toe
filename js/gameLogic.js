
const game = {

  // Game size default 3
  gridSize: 3,

  // player: '',

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
    // this.player = playerOne;

    // Reset board
    this.board.length = 0;
    this.count = 0;

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
  }, // start()

  isIdentical: function(array){
    for(let i = 0; i < array.length - 1; i++) {

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
    }
    // Check if won across Column
    if (this.columns[column] === this.gridSize){
        for (let i = 0; i < this.gridSize; i++){
          comparisonArray.push(this.board[i][column]);
        }
      if (this.isIdentical(comparisonArray)){
        return `Winner`;
      } else {
        comparisonArray.length = 0;
      }
    }
    // Check if won on positive diagonal
    if (this.positiveDiagonal === this.gridSize){
      for (let i = 0; i < this.gridSize; i++){
        comparisonArray.push(this.board[i][i]);
      }
      if (this.isIdentical(comparisonArray)){
        return `Winner`;
      } else {
        comparisonArray.length = 0;
      }
    }
    // Check if won on negative diagonal
    if (this.negativeDiagonal === this.gridSize){
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
    // Check for a draw
    if (this.count === this.totalGridPoints){
      return `Draw`;
    }

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
    return gameState;

  }, // addMove()

  generateRandomInt: function(min, max){
    const randomNumber = (Math.random() * (max - min)) + min;
    return Math.round(randomNumber);
  }, // generateRandomInt()

  getComputerPosition: function(){
    const rowPosition = this.generateRandomInt(0, gridSize - 1);
    const columnPosition = this.generateRandomInt(0, gridSize - 1);

    return {row: rowPosition, column: columnPosition};
  }, // getComputerPosition()
}; // game
