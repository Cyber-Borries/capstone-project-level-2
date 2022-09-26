import React from "react";
//created Cell functional component which will be used in the Board,js
function Cell({ details, updateFlag, revealcell }) {
  const style = {
    cellStyle: {
      width: 40,
      height: 40,
      //used ternary operator to change cells based on value
      backgroundColor:
        details.revealed && details.value !== 0
          ? details.value === "X"
            ? "red"
            : " #00226d"
          : details.revealed && details.value === 0
          ? "#00226f"
          : "#000",
      opacity: "0.8",
      border: "3px solid white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
      cursor: "pointer",
      color: "cyan",
      fontWeight: "1000",
    },
  };

  const click = () => {
    console.log("clicked"); //debugging - logged to console to confirm that click is being registered
    // calling revealcell for specific cell x and y
    revealcell(details.x, details.y);
  };

  // Right Click Function
  const rightclick = (e) => {
    console.log("right clicked"); //debugging - logged to console to confirm that click is being registered
    updateFlag(e, details.x, details.y);
  };

  // rendering the cell component and showing the different values on right and left clicks
  return (
    <div style={style.cellStyle} onClick={click} onContextMenu={rightclick}>
      {!details.revealed && details.flagged
        ? "🚩"
        : details.revealed && details.value !== 0
        ? details.value === "X"
          ? "💣"
          : details.value
        : ""}
    </div>
  );
}

export default Cell;
