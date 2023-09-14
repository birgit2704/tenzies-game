import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [dices, setDices] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);
  const [highScore, setHighScore] = useState(25);
  const [currentRolls, setCurrentRolls] = useState(0);
  const [loser, setLoser] = useState(false);

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
    }

    if (currentRolls >= highScore) {
      setLoser(true);
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
    if (loser) {
      setDices(allNewDice);
      setLoser(false);
      setCurrentRolls(0);
    } else if (tenzies) {
      setDices(allNewDice);
      setTenzies(false);
      setCurrentRolls(0);
    } else {
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
      setCurrentRolls((prev) => prev + 1);
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
      <div className="rolls">
        <p>Maximum rolls: {highScore}</p>
        <p>Current rolls: {currentRolls}</p>
      </div>
      <h1 className="title">{loser ? "Your are over the limit" : "Tenzies"}</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{dicesArr}</div>
      <button className="button" onClick={rollDice}>
        {tenzies || loser ? "New Game" : "Roll"}
      </button>
      <p className="react">Built with React</p>
    </main>
  );
}

export default App;
