
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


  }, // addMove()

}; // game
