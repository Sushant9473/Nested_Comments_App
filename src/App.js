import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";

function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Nested Comments App</h1>
        <CommentForm />
        <CommentList />
      </div>
    </Provider>
  );
}

export default App;
