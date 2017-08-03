var c4     = require('../index');
var expect = require('chai').expect;
var assert = require('chai').assert;
var math   = require('mathjs');

describe('Connect4', () => {
  var board;

  // before each test create an empty board
  before((done) => {
    board = math.zeros(6,7);
    done();
  });

  // test the diagonal solutions
  describe('test diagonals', () => {
    it('should return no winner on an empty board', (done) => {
      let play = c4.play_bruteforce(board, [0,0]);
      expect(play.winner).to.be.false;
      done();
    });

    it('should return a winner when [0,0] to [3,3] are filled', (done) => {
      board.set([0,0], 1);
      board.set([1,1], 1);
      board.set([2,2], 1);
      let play = c4.play_bruteforce(board, [3,3]);
      expect(play.winner).to.be.true;
      done();
    })
  });
});
