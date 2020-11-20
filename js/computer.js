const computer = {
  difficulty: {
    level: null,

    setDifficulty: function(difficulty){
      switch (difficulty){
        case 'hard':
          this.level = 2;
          break;
        case 'medium':
          this.level = 1;
          break;
        default:
          this.level = 0;
      }
    },
  }, // difficulty()

  position: {
    row: null,
    column: null,
  },

  generateRandomInt: function(min = 0, max = game.rowSize){
    const randomNumber = (Math.random() * (max - min)) + min;
    return Math.round(randomNumber);
  }, // generateRandomInt()

  randomPosition: function(){
    this.position.row = this.generateRandomInt();
    this.position.column = this.generateRandomInt();
    return position;
  }, // randomPosition()

  semiRandomPosition: function(){
    // const randomRow;
    // const randomColumn;
    // return {row: randomRow, column: randomColumn};
  }, // semiRandomPosition()

  bestPosition: function(){
    // const bestRow;
    // const bestColumn;
    // return {row: bestRow, column: bestColumn};
  }, // bestPosition()

  takeTurn: function(rowSize){
    if (this.difficulty.level === 0){
      const position = this.randomPosition(rowSize);
    } else if (this.difficulty.level === 1){
      // const position = this.semiRandomPosition(rowSize);
    } else {
      // const position = this.bestPosition(rowSize);
    }

    return position;
  }
}; // computer
