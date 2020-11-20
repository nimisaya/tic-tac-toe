const game = {
  player: {
    turn: true, // true: player one, false player two
    one: {
      token: '',
    },// player.one
    two: {
      token: '',
      computerMode: false, // false: human vs. human
      // difficulty: 'easy',
    }, // player.two

    setTokens: function(playerOneToken){
      if (playerOneToken === 'cross'){
        this.one.token = 'cross';
        this.two.token = 'nought';
      } else {
        this.one.token = 'nought';
        this.two.token = 'cross';
      }
    }, // player.setTokens()
  }, // game.player

  rowSize: null,
  board: [],
  remainingMoves: [],

  state: {
    continue: true,
    invalid: false,
    win: false,
    draw: false,
    gameEnded: false,

    setGameEnd: function(){
      if(this.win || this.draw){
        this.gameEnded = true;
        this.continue = false;
      }
    }, // setGameEnd()

    reset: function(){
      this.continue = true;
      this.invalid = false;
      this.win = false;
      this.draw = false;
      this.gameEnded = false;
    }, // reset()
  }, // game.states

  createBoard: function(size){
    this.board.length = 0; // Ensure board is empty
    this.rowSize = size;

    for (let i = 0; i < this.rowSize; i++){
      this.board.push(new Array(size).fill(0));
      this.remainingMoves.push(new Array(size).fill(0));
    }// for
  }, // game.createBoard()

  startGame: function(playerToken, mode, size, difficulty){
    this.createBoard(size);
    this.player.setTokens(playerToken);
    this.state.reset();

    if(mode === 'computer'){ // defaults to human
      this.player.two.computerMode = true;
      computer.setDifficulty(difficulty);
    }
  }, // game.startGame()

  reset: function(){
    this.createBoard(game.rowSize);
    this.state.reset();
  }, // game.reset()

  isValidMove: function(){
    if(this.board[row][column] === null){
      this.state.invalid = false;
    } else {
      this.state.invalid = true;
    }
    return this.state.invalid;
  }, // game.isValidMove()

  isWin: function(){
    if(){
      this.state.win = true;
    }
    return this.state.win;
  }, // game.isWin()

  isDraw: function(){
    if(this.remainingMoves.length === 0){
      this.state.draw = true;
    }
    return this.state.draw;
  }, // game.isDraw()

  isNextTurn: function(){
    if(this.isWin()){
      this.setGameEnd();
      return false;
    }

    if(this.isDraw()){
      this.setGameEnd();
      return false;
    }

    return true;
  }, // game.isNextTurn();

  updateTurn: function(){
    this.player.turn = !this.player.turn;

    if (this.player.turn === false){
      if (this.player.two.computerMode){
        const position = computer.takeTurn();
        this.addMove(position.row, position.column, this.player.two.token);
      }
    }
  }, // game.updateTurn()

  addMove: function(row, column, player){
    if (this.gameEnded){
      return false;
    }
    if (this.isValidMove()){
      this.board[row][column] = player;
      this.remainingMoves[row][column].pop();
      this.updateTurn();
      return this.isNextTurn(); // Returns false if win/draw condition met
    } else {
      return false;
    }
  }, // game.addMove()
}; // game
