document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {

  cells: generateCells(5)

}

 function generateCells (size) {

    var cells = []

      for (i = 0; i < size; i++) {

        for (j = 0; j < size; j++) {
              
           cell = {
            row: i,
            col: j,
            isMine: Math.floor(Math.random()*1.5),
            isMarked: false,
            hidden: true
            }
        

          cells.push(cell)

        }
     
    }

    return cells
}


function startGame () {
  // Don't remove this function call: it makes the game work!

  
/*  board.cells[7].isMine=true
  board.cells[11].isMine=true
  board.cells[12].isMine=true
  board.cells[13].isMine=true
  board.cells[17].isMine=true
*/  
  
  lib.initBoard()

  for (i = 0; i < board.cells.length; i++) {

  board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
}

  document.addEventListener('click', checkForWin); // call check for win function on click
  document.addEventListener('contextmenu', checkForWin);
  document.addEventListener('click', Loser)
}
// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function checkForWin () {

  for (var i = 0; i < board.cells.length; i++) { 

    const checkWinner = board.cells[i]
    if(checkWinner.isMine && checkWinner.isMarked) {
      return;

      
     }
     else if(!checkWinner.isMine && checkWinner.hidden){
       return;
     } 
  };

  lib.displayMessage('YAAAAAAAAAASSSSSSSS!')
 
 }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
//lib.displayMessage('You win!')
//}

// Define this function to count the number of mines around the cell
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {

  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  var count = 0;

  for(j = 0; j < surrounding.length; j++){
    if (surrounding[j].isMine) {
      count++;
    }
  }
  return count;
}


const Loser = _ => {
  const uglyCry = new Audio ('~/dev-academy/blog/ari-t.github.io/gallery/uglyCry.mp3')
  // if isMine && not hidden
  // play losing sound with no loop
  uglyCry.loop = false;

  board.cells.forEach((box) => {
    if(box.isMine && !box.hidden) {
      uglyCry.play()
    }
  })
}
