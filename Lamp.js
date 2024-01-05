import "./Lamp.css";

const LAMP_STATES = {
  ON: "ON",
  OFF: "OFF",
};

function Lamp(props) {
  const changeLampState = () => {
    if (!props.gameWon) props.changeLampState(props.index);
  };

  return (
    <div
      className={props.lampState === LAMP_STATES.OFF ? "lamp" : "lamp on"}
      onClick={changeLampState}
    ></div>
  );
}

export default Lamp;
