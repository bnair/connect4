var c4     = require('../index');
var expect = require('chai').expect;
var assert = require('chai').assert;
var math   = require('mathjs');

describe('Connect4', () => {
  var board;

  let rows2test = [
    [ [[0,0],[0,1],[0,2]], [0,3], true],
    [ [[0,0],[0,1],[0,2]], [0,4], false]
  ];

  let fill = (points, val) => {
    points.forEach((point) => {
      board.set(point, val);
    });
  };

  // before each test create an empty board
  beforeEach((done) => {
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
      fill([[0,0],[1,1],[2,2]], 1);
      let play = c4.play_bruteforce(board, [3,3]);
      expect(play.winner).to.be.true;
      done();
    });

    it('should return no winner when [0,0] to [2,2] and [4,4] are filled', (done) => {
      fill([[0,0],[1,1],[2,2]], 1);
      let play = c4.play_bruteforce(board, [4,4]);
      expect(play.winner).to.be.false;
      done();
    });

    it('should return a winner when [2,2] to [5,5] are filled', (done) => {
      fill([[2,2],[3,3],[4,4]], 1);
      let play = c4.play_bruteforce(board, [5,5]);
      expect(play.winner).to.be.true;
      done();
    });
  });

  // test rows
  describe('test horizontals', () => {
    it('should return a winner when [0,0] to [0,3] are filled', (done) => {
      fill(rows2test[0][0], 1);
      let play = c4.play_bruteforce(board, rows2test[0][1]);
      expect(play.winner).to.be.equal(rows2test[0][2]);
      done();
    });

    it('should return no winner when [0,0] to [0,2] and [0,4] are filled', (done) => {
      fill(rows2test[1][0], 1);
      let play = c4.play_bruteforce(board, rows2test[1][1]);
      expect(play.winner).to.be.equal(rows2test[1][2]);
      done();
    });
  });

  // test columns
  describe('test verticals', () => {
    it('should return a winner when [0,0] to [3,0] are filled', (done) => {
      fill([[0,0],[1,0],[2,0]], 1);
      let play = c4.play_bruteforce(board, [3,0]);
      expect(play.winner).to.be.true;
      done();
    });

    it('should return no winner when [0,0] to [2,0] and [4,0] are filled', (done) => {
      fill([[0,0],[1,0],[2,0]], 1);
      let play = c4.play_bruteforce(board, [4,0]);
      expect(play.winner).to.be.false;
      done();
    });
  });
});
