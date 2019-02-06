/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  //togglePiece: function (rowIndex, colIndex)
  var solution = makeEmptyMatrix(n);
  var startRow = Math.floor(Math.random() * Math.floor(n));
  var startCol = Math.floor(Math.random() * Math.floor(n));
  solution[startRow][startCol] = 1;
  for (var r = 0; r < n; r++) {
    if (hasRowValueAt(solution, r)) {
      continue;
    }
    for (var c = 0; c < n; c++) {
      if (hasColValueAt(solution, c)) {
        continue;
      } else {
        solution[r][c] = 1;
        break;
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.makeEmptyMatrix = function (n) {
  return _(_.range(n)).map(function () {
    return _(_.range(n)).map(function () {
      return 0;
    });
  });
};

window.hasColValueAt = function (arr, colIndex) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][colIndex] === 1) {
      return true;
    }
  }
  return false;
};

window.hasRowValueAt = function (arr, rowIndex) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[rowIndex][i] === 1) {
      return true;
    }
  }
  return false;
};