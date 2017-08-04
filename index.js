var math = require('mathjs');
var util = require('util')

let diagonals = [
    new Array([2,0], [3,1], [4,2], [5,3]),
    new Array([1,0], [2,1], [3,2], [4,3], [5,4]),
    new Array([0,0], [1,1], [2,2], [3,3], [4,4], [5,5]),
    new Array([0,1], [1,2], [2,3], [3,4], [4,5], [5,6]),
    new Array([0,2], [1,3], [2,4], [3,5], [4,6]),
    new Array([0,3], [1,4], [2,5], [3,6]),

    new Array([3,0], [2,1], [1,2], [0,3]),
    new Array([4,0], [3,1], [2,2], [1,3], [0,4]),
    new Array([5,0], [4,1], [3,2], [2,3], [1,4], [0,5]),
    new Array([5,1], [4,2], [3,3], [2,4], [1,5], [0,6]),
    new Array([5,2], [4,3], [3,4], [2,5], [1,6]),
    new Array([5,3], [4,4], [3,5], [2,6])
];

let rows = [
    new Array([0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6]),
    new Array([1,0], [1,1], [1,2], [1,3], [1,4], [1,5], [1,6]),
    new Array([2,0], [2,1], [2,2], [2,3], [2,4], [2,5], [2,6]),
    new Array([3,0], [3,1], [3,2], [3,3], [3,4], [3,5], [3,6]),
    new Array([4,0], [4,1], [4,2], [4,3], [4,4], [4,5], [4,6]),
    new Array([5,0], [5,1], [5,2], [5,3], [5,4], [5,5], [5,6])
];

let columns = [
  new Array([0,0], [1,0], [2,0], [3,0], [4,0], [5,0]),
  new Array([0,1], [1,1], [2,1], [3,1], [4,1], [5,1]),
  new Array([0,2], [1,2], [2,2], [3,2], [4,2], [5,2]),
  new Array([0,3], [1,3], [2,3], [3,3], [4,3], [5,3]),
  new Array([0,4], [1,4], [2,4], [3,4], [4,4], [5,4]),
  new Array([0,5], [1,5], [2,5], [3,5], [4,5], [5,5]),
  new Array([0,6], [1,6], [2,6], [3,6], [4,6], [5,6])
];

// calculate the score along a diagonal, row or column
// and determine if the player has made a winning move
let isWinner = (board, vector) => {
  // if position value is 1 then add to accumulator
  // otherwise reset the accumulator to zero
  var score = vector.reduce((acc, position) => {
    // console.log(util.format('%s : %d, acc: %d', position, board.get(position), acc));
    if (acc < 4) {
      (board.get(position) === 1) ? acc += 1 : acc = 0;
    }
    return acc;
  }, 0);

  return (score === 4);
}

let play_bruteforce = (board, position) => {
  board.set(position, 1);

  // check diagonals, rows and columns
  var winner = [diagonals, rows, columns].reduce((acc, vector) => {
    var w = vector.reduce((inner_acc, inner_vector) => {
      if (!inner_acc.winner && isWinner(board, inner_vector)) {
        inner_acc.vector = vector;
        inner_acc.winner = true;
      }
      return inner_acc;
    }, acc);
    return w;
  }, {winner: false, vector: ''});

  return winner;
}

module.exports = {
  play_bruteforce: play_bruteforce
};
