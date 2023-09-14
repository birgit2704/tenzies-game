import React from "react";

function Die(props) {
  const styles = {
    border: props.isHeld ? "3px solid blue" : "none",
  };

  return (
    <div className="die">
      <img
        src={`./images/${props.value}die.jpg`}
        alt={props.value}
        className="die"
        onClick={props.holdDice}
        style={styles}
      ></img>
    </div>
  );
}

export default Die;
