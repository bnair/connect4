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

var newBoard = () => {
  return Array.from(Array(6), () => {return new Array(7).fill(0);} );
}

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

  // check diagonals
  var winner = diagonals.reduce((acc, diagonal) => {
    if (!acc.winner && isWinner(board, diagonal)) {
      acc.vector = diagonal;
      acc.winner = true;
    }
    return acc;
  }, {winner: false, vector: ''});

  return winner;
// diagonals.forEach((vector) => {
//   console.log(util.format('diag %s : %s', vector, isWinner(board, vector)));
// });

// rows.forEach((vector) => {
//   console.log(util.format('row %s : %s', vector, isWinner(p1, vector)));
// });

// columns.forEach((vector) => {
//   console.log(util.format('col %s : %s', vector, isWinner(p1, vector)));
// });
}

module.exports = {
  play_bruteforce: play_bruteforce
};
