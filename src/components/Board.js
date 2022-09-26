import React, { useState, useEffect } from "react";
import CreateBoard from "./Createboard";
import { revealed } from "./Reveal";
import Cell from "./Cell";
//created Board functional component
function Board() {
  //declaring the React hooks that will be used
  const [grid, setGrid] = useState([]);
  const [nonMinecount, setNonMinecount] = useState(0);
  const [mineLocation, setmineLocation] = useState([]);
  const style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    color: "white",
  };
  useEffect(() => {
    freshBoard();
  }, []);

  // Making freshboard at start
  const freshBoard = () => {
    const newBoard = CreateBoard(10, 10, 20);
    setNonMinecount(10 * 10 - 20);
    setmineLocation(newBoard.mineLocation);
    setGrid(newBoard.board);
  };
  const updateFlag = (e, x, y) => {
    e.preventDefault();
    // deep copy of the object
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y].flagged = true;
    console.log(newGrid[x][y]);
    setGrid(newGrid);
  };
  const newfresh = () => {
    freshBoard();
  };

  //function to reveal the cell (number, blank or flag) on click
  const revealcell = (x, y) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      for (let i = 0; i < mineLocation.length; i++) {
        newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
      }
      setGrid(newGrid);
      setTimeout(newfresh, 500);
    }
    if (nonMinecount === 0) {
      setTimeout(newfresh, 500);
    } else {
      let revealedboard = revealed(newGrid, x, y, nonMinecount);
      setGrid(revealedboard.arr);
      setNonMinecount(revealedboard.newNonMines);
    }
  };

  return (
    <div className="parent">
      <div>
        <h3 className="minecount">Non-Mines - {nonMinecount}</h3>
        {grid.map((singlerow, index1) => {
          return (
            <div style={style} key={index1}>
              {singlerow.map((singlecol, index2) => {
                return (
                  <Cell
                    details={singlecol}
                    key={index2}
                    updateFlag={updateFlag}
                    revealcell={revealcell}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Board;
