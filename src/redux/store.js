import { createStore } from "redux";
import commentReducer from "./reducers/commentReducer";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("commentState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("commentState", serializedState);
  } catch {
    // Ignore write errors
  }
};

const persistedState = loadState();

const store = createStore(
  commentReducer,
  persistedState || { comments: [] } // Provide a default state if nothing is in localStorage
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
