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



var arrayClone = function( arr ) {
  var i, copy;
  if ( Array.isArray( arr ) ) {
    copy = arr.slice( 0 );
    for ( i = 0; i < copy.length; i++ ) {
      copy[ i ] = arrayClone( copy[ i ] );
    }
    return copy;
  } else if ( typeof arr === 'object' ) {
    throw 'Cannot clone array containing an object!';
  } else {
    return arr;
  }
};

var SolTree = function(solBoard) {
  this.counter = 0;
  this.childCount = 0;
  this.children = [];
  this.board = solBoard;
};
SolTree.prototype.addChild = function(solBoard, row, col) {
  var cBoard = arrayClone(solBoard);
  var child = new SolTree(cBoard);
  child.board[row][col] = 1;
  child.counter = this.counter + 1;
  this.children.push(child);
  this.childCount ++;
};
window.findNRooksSolution = function(n) {
  var solution;
  //assume each row has solution -> each tree has same amount of children
  var root = new SolTree(makeEmptyMatrix(n));
  var recursion = function (tree, length, rowInx) {
    if (n === 0) {
      result = makeEmptyMatrix(n);
      return result;
    }
    if (rowInx === length) {
      if (tree.counter === length) {
        solution = tree.board;
        return solution;
      }
    }
    for (var i = 0; i < length; i++) {
      if (hasColValueAt(tree.board, i) || hasRowValueAt(tree.board, rowInx)) {
        continue;
      } else {
        tree.addChild(tree.board, rowInx, i);
      }
    }
    if (rowInx <= length - 1 && tree.children.length) {
      for (var c = 0; c < tree.children.length; c++) {
        return recursion(tree.children[c], length, rowInx + 1);
      }
    }
  };
  solution = recursion(root, n, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var root = new SolTree(makeEmptyMatrix(n));
  var solutionCount = 0;
  var recursion = function(tree, length, rowInx) {
    if (rowInx === length && tree.counter === length) {
      solutionCount ++;
      return;
    }
    for (var i = 0; i < length; i++) {
      if (!hasColValueAt(tree.board, i) && !hasRowValueAt(tree.board, rowInx)) {
        tree.addChild(tree.board, rowInx, i);
        //run func for each added latest child
        var cLen = tree.childCount - 1;
        recursion(tree.children[cLen], length, rowInx + 1);
      }
    }
  };
  recursion(root, n, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //assume each row has solution-> each tree has child and assume n queens
  var solution = makeEmptyMatrix(n);
  var root = new SolTree(makeEmptyMatrix(n));
  var recursion = function (tree, length, rowInx) {
    var result;
    if (n === 0) {
      result = makeEmptyMatrix(n);
      return result;
    }
    if (rowInx === length) {
      if (tree.counter === length) {
        result = tree.board;
        return result;
      } else {
        return;
      }
    }
    for (var i = 0; i < length; i++) {
      var majI = i - rowInx;
      var minI = i + rowInx;
      if (hasColValueAt(tree.board, i) || hasRowValueAt(tree.board, rowInx) || hasDiagonalValueAt(tree.board, majI, minI)) {
        continue;
      } else {
        tree.addChild(tree.board, rowInx, i);
      }
    }
    if (tree.children.length && rowInx <= length - 1) {
      for (var c = 0; c < tree.children.length; c++) {
        result = recursion(tree.children[c], length, rowInx + 1);
        if (result !== undefined) {
          return result;
        }
      } //no kids can't go on
    } else if (rowInx <= length) {
      result = recursion(tree, length, rowInx + 1);
      if (result !== undefined) {
        return result;
      }
    }
  };
  var result = recursion(root, n, 0);
  if (result !== undefined) {
    solution = result;
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  //assume each row has solution-> each tree has child and assume n queens
  var solution = makeEmptyMatrix(n);
  var solutionCount = undefined;
  var root = new SolTree(makeEmptyMatrix(n));
  var recursion = function (tree, length, rowInx) {
    var tolCount = 0;
    if (rowInx === length) {
      if (tree.counter === length) {
        return tolCount = tolCount + 1;
      } else {
        return 0;
      }
    }
    for (var i = 0; i < length; i++) {
      var majI = i - rowInx;
      var minI = i + rowInx;
      if (hasColValueAt(tree.board, i) || hasRowValueAt(tree.board, rowInx) || hasDiagonalValueAt(tree.board, majI, minI)) {
        continue;
      } else {
        tree.addChild(tree.board, rowInx, i);
      }
    }
    if (tree.children.length && rowInx <= length - 1) {
      for (var c = 0; c < tree.children.length; c++) {
        tolCount = tolCount + recursion(tree.children[c], length, rowInx + 1);
      } //no kids can't go on
    } else if (rowInx <= length) {
      tolCount = tolCount + recursion(tree, length, rowInx + 1);
    }
    return tolCount;
  };
  solutionCount = recursion(root, n, 0);
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
window.hasDiagonalValueAt = function (arr, majorInx, minorInx) {
  //go thru solution array
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      //check if current index has same majorInx or minorInx
      if ( (j - i === majorInx) || (j + i === minorInx)) {
        if (arr[i][j] === 1) {
          //if the value is one, then return true
          return true;
        }
      }
    }
  }
  return false;
};