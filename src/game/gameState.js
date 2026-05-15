// src/game/gameState.js

const STORAGE_KEY = "wheel-game-state";

const defaultState = {
  puzzle: null,
  revealed: []
};

export const getState = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return defaultState;
  }

  return JSON.parse(saved);
};

export const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const setPuzzle = (puzzle) => {
  saveState({
    puzzle,
    revealed: []
  });
};

export const revealLetter = (letter) => {
  const state = getState();

  if (!state.revealed.includes(letter)) {
    state.revealed.push(letter);
  }

  saveState(state);
};

export const revealAll = () => {
  const state = getState();

  const phrase = state.puzzle?.phrase || "";

  state.revealed = phrase
    .split("")
    .filter((c) => c !== " ");
  
  saveState(state);
};