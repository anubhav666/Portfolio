import Grid from "./Grid.js"
import Tile from "./Tile.js"
const gameBoard = document.getElementById("game-board")

const grid = new Grid(gameBoard)

var xDown = null;                                                        
var yDown = null;

grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
setInput()
// console.log(grid.cells)
// console.log(grid.cellsByColumn)

function setInput(){
    window.addEventListener("keydown", handleInput, {once:true})
    document.addEventListener("touchstart", handleTouchStart, true);       
    document.addEventListener("touchmove", handleTouchMove, false);
}

async function handleInput(e){
    console.log(e.key)
    switch(e.key)
    {
        case "ArrowUp":
            if(!canMoveUp()){
                setInput()
                return
            }
            await moveUp()
            break;
        case "ArrowDown":
            if(!canMoveDown()){
                setInput()
                return
            }
            await moveDown()
            break;
        case "ArrowLeft":
            if(!canMoveLeft()){
                setInput()
                return
            }
            await moveLeft()
            break;
        case "ArrowRight":
            if(!canMoveRight()){
                setInput()
                return
            }
            await moveRight()
            break;
        default:
            setInput()
            return
    }                                                    
    grid.cells.forEach(cell => cell.mergeTiles())
    const newTile = new Tile(gameBoard)
    grid.randomEmptyCell().tile = newTile
    
    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()){
        newTile.waitForTransition(true).then(() => {
            alert("You lose")
        })
        return
    }
    setInput()
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
  
async function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }
  
      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;
  
      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;
  
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
              /* left swipe */
              if(!canMoveLeft()){
                setInput()
                return
            }
            await moveLeft() 
          } else {
              /* right swipe */
              if(!canMoveRight()){
                setInput()
                return
            }
            await moveRight()
          }                       
      } else {
          if ( yDiff > 0 ) {
              /* up swipe */ 
              if(!canMoveUp()){
                setInput()
                return
            }
            await moveUp()
          } else { 
              /* down swipe */
              if(!canMoveDown()){
                setInput()
                return
            }
            await moveDown()
          }                                                                 
      }
      /* reset values */
      xDown = null;
      yDown = null; 
      grid.cells.forEach(cell => cell.mergeTiles())
    const newTile = new Tile(gameBoard)
    grid.randomEmptyCell().tile = newTile
    
    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()){
        newTile.waitForTransition(true).then(() => {
            alert("You lose")
        })
        return
    }
    setInput()                                            
  };
function getTouches(evt) {
    return evt.touches ||             // browser API
           evt.originalEvent.touches; // jQuery
  }
function slideTiles(cells){
    return Promise.all(
    cells.flatMap(group => {
        const promises = []
        for (let i =1; i< group.length; i++){
            const cell = group[i]
            if(cell.tile == null) continue
            let lastValidCell
            for(let j = i-1 ; j >= 0 ; j--){
                const moveToCell = group[j]
                if(!moveToCell.canAccept(cell.tile)) break
                lastValidCell = moveToCell    
            }
            if(lastValidCell != null){
                promises.push(cell.tile.waitForTransition())
                if (lastValidCell.tile != null){
                lastValidCell.mergeTile = cell.tile
                }
                else{
                lastValidCell.tile = cell.tile
                }
                cell.tile = null
            }
        }
        return promises 
    }))

}

function moveUp(){
    return slideTiles(grid.cellsByColumn)
}

function moveDown(){
    return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
}

function moveLeft(){
    return slideTiles(grid.cellsByRow)
}

function moveRight(){
    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
}

function canMoveUp(){
    return canMove(grid.cellsByColumn)
}

function canMoveDown(){
    return canMove(grid.cellsByColumn.map(columns => [...columns].reverse()))
}

function canMoveLeft(){
    return canMove(grid.cellsByRow)
}

function canMoveRight(){
    return canMove(grid.cellsByRow.map(row => [...row].reverse()))
}

function canMove(cells){
    return cells.some(group => {
        return group.some((cell, index) =>{
            if( index === 0) return false
            if (cell.tile == null) return false
            const moveToCell = group[index - 1]
            return moveToCell.canAccept(cell.tile)
        })
    })
}