import { useEffect, useState } from "react";
import { getState } from "../game/gameState";

export default function Display() {
  const [state, setState] = useState(getState());

  useEffect(() => {
    const update = () => {
      setState(getState());
    };

    window.addEventListener("storage", update);

    const interval = setInterval(update, 100);

    return () => {
      window.removeEventListener("storage", update);
      clearInterval(interval);
    };
  }, []);

  if (!state.puzzle) {
    return <h1>Waiting for game...</h1>;
  }


const MAX = 14;

const tiles = [];

state.puzzle.phrase.split(" ").forEach((word, wi, arr) => {
  word.split("").forEach(c => {
    tiles.push({ type: "char", value: c });
  });

  if (wi !== arr.length - 1) {
    tiles.push({ type: "space", value: " " });
  }
});

const indices = [];

//get all the indices of spaces
tiles.forEach((tile, i) => {
  if (tile.type === "space") {
    indices.push(i);
  }
});

//sift through spaces and push to rows at largest below 14
//largest one whose difference with first push <14
//largest one whose difference with second push <14
const rows = [];
const pushindex = [];
const less14 = indices.filter(i => i < 14);
let firstpush = 0;
if (less14.length == 0){
  rows.push(tiles.slice(0, tiles.length));
}
else{
  firstpush = Math.max(...less14);
  pushindex.push({type: "integer", value: firstpush})

  //preparing for rows 2 and 3 if they exist
  let secondpush = 0;
  let thirdpush = 0;

  //logic for determining pushes
  const less28 = indices.filter(i => i>firstpush && i<firstpush + 14);
  if (less28.length != 0 ){ 
    secondpush = Math.max(...less28);
    pushindex.push({type: "integer", value: secondpush})
    const less42 = indices.filter(i => i>secondpush && i<secondpush + 14);
    if (less42.length !=0){
        thirdpush = Math.max(...less42);
        pushindex.push({type: "integer", value: thirdpush})
    }
  }
  let prev = 0;

  //get all the indices of spaces
  pushindex.forEach((index, i) => {
    rows.push(tiles.slice(prev, index));
    prev = index+1;
  });
  rows.push(tiles.slice(prev)); //final part of the word
}
rows.forEach((row) => {
  while (row.length < 14) {
    row.push({ type: "empty", value: "" });
  }
});

//defining layour style 
const activeTileStyle = {
  width: 60,
  height: 80,
  background: "#22c55e",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 32,
  fontWeight: "bold",
  borderRadius: 8
};

const spaceTileStyle = {
  width: 60,
  height: 80,
  background: "#1f2937",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8
};

const emptyTileStyle = {
  width: 60,
  height: 80,
  background: "#2a4a66",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8
};

  return (
  <div
    style={{
      minHeight: "100vh",
      background: "#111827",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 40
    }}
  >
    <h1>{state.puzzle.category}</h1>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginTop: 20,
        alignItems: "center"
      }}
    >


{rows.map((row, ri) => (
  <div key={ri} style={{ display: "flex", gap: 6 }}>
    {row.map((tile, i) => {
      const show =
        tile.type === "char"
          ? state.revealed.includes(tile.value)
          : false;
      let currentStyle;

      if (tile.type === "char") {
        currentStyle = activeTileStyle;
      } else if (tile.type === "space") {
        currentStyle = spaceTileStyle;
      } else {
        currentStyle = emptyTileStyle;
      }

      return (
        <div key={i} style={currentStyle}>
          {show ? tile.value : ""}
        </div>
      );
    })}
  </div>
))}
    </div>
  </div>
)};