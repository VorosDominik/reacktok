import "./Board.css";
import Lamp from "../lamp/Lamp";
import { useState, useEffect } from "react";

const LAMP_STATES = {
  ON: "ON",
  OFF: "OFF",
};

function Board(props) {
  const getStartingBoard = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const easy = urlParams.get("easy");
    if (easy === "true") {
      return Array(9).fill(LAMP_STATES.OFF);
    }
    const startingBoard = Array(9).fill(null);
    startingBoard.forEach((lamp, index) => {
      const startingState =
        Math.random() > 0.5 ? LAMP_STATES.ON : LAMP_STATES.OFF;
      startingBoard[index] = startingState;
    });
    return startingBoard;
  };

  const [board, setBoard] = useState(getStartingBoard());

  const changeLampState = (index) => {
    console.log("Ez a lámpa lett kattintva:" + index);
    const newBoard = [...board];
    const neighbors = [index];
    // Felső szomszéd
    if (index - 3 >= 0) neighbors.push(index - 3);
    // Alsó szomszéd
    if (index + 3 < 9) neighbors.push(index + 3);
    // Bal oldali szomszéd
    if (index % 3 !== 0) neighbors.push(index - 1);
    // Jobb oldali szomszéd
    if ((index + 1) % 3 !== 0) neighbors.push(index + 1);

    neighbors.forEach((neighborIndex) => {
      newBoard[neighborIndex] =
        newBoard[neighborIndex] === LAMP_STATES.OFF
          ? LAMP_STATES.ON
          : LAMP_STATES.OFF;
    });
    setBoard(newBoard);
  };

  useEffect(() => {
    if (board.every((lamp) => lamp === LAMP_STATES.ON)) {
      props.setGameWon(true);
    }
  }, [board, props]);

  return (
    <div className="Board">
      {board.map((lamp, i) => (
        <Lamp
          lampState={lamp}
          key={i}
          index={i}
          changeLampState={changeLampState}
          gameWon={props.gameWon}
        />
      ))}
    </div>
  );
}

export default Board;
