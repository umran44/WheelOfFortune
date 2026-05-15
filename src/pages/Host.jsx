// pages/Host.jsx
import { useState } from "react";
import { getState, setPuzzle, revealLetter } from "../game/gameState";
import { revealAll } from "../game/gameState";

const puzzles = [
  { category: "Movie", phrase: "THE DARK KNIGHT" },
  { category: "Food", phrase: "SPAGHETTI AND MEATBALLS" }
];

export default function Host() {
  const [state, setState] = useState(getState());

  const newPuzzle = () => {
    const p = puzzles[Math.floor(Math.random() * puzzles.length)];
    setPuzzle(p);
    setState(getState());
  };

  const reveal = (l) => {
    revealLetter(l);
    setState(getState());
  };

  return (
    <div>
      <h1>HOST PANEL</h1>

      <button onClick={newPuzzle}>New Puzzle</button>

      <h2>Reveal Letters</h2>
      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => (
        <button key={l} onClick={() => reveal(l)}>
          {l}
        </button>
      ))}

      <button
      onClick={() => revealAll()}
      style={{
        marginTop: 20,
        padding: "10px 20px",
        fontSize: 16,
        background: "red",
        color: "white",
        border: "none",
        borderRadius: 8,
        cursor: "pointer"
      }}
    >
      Reveal Full Phrase
    </button>

      <hr />

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}