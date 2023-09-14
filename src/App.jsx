import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [dices, setDices] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);

  const dicesArr = dices.map((dice) => (
    <Die
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  useEffect(() => {
    const allHeld = dices.every((die) => die.isHeld);

    const allEqual = dices.every((die) => die.value === dices[0].value);

    if (allHeld && allEqual) {
      setTenzies(true);
      console.log("you won!");
    }
  }, [dices]);

  function allNewDice() {
    return new Array(10).fill(undefined).map(() => {
      return {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      };
    });
  }

  function rollDice() {
    if (!tenzies) {
      setDices((prevState) =>
        prevState.map((die) => {
          if (die.isHeld) return die;
          else
            return {
              value: Math.floor(Math.random() * 6) + 1,
              isHeld: false,
              id: nanoid(),
            };
        })
      );
    } else {
      setDices(allNewDice);
      setTenzies(false);
    }
  }

  function holdDice(id) {
    setDices((prevState) =>
      prevState.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        } else return die;
      })
    );
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{dicesArr}</div>
      <button className="button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
