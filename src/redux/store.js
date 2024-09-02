import { createStore } from "redux";
import commentReducer from "./reducers/commentReducer";

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("commentState");
    if (serializedState === null) {
      return undefined; // No state found in localStorage
    }
    return JSON.parse(serializedState); // Deserialize the state
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined; // Return undefined if an error occurs
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state); // Serialize the state
    localStorage.setItem("commentState", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
    // Ignore write errors
  }
};

const defaultState = { comments: [] }; // Default state if nothing is in localStorage
const persistedState = loadState() || defaultState; // Load persisted state or use default

// Create Redux store with persisted state
const store = createStore(commentReducer, persistedState);

// Subscribe to store updates to save state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
