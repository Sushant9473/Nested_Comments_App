import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/actions/commentActions";
import { validateComment } from "../utils/validationUtils";

const CommentForm = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateComment(name, text)) {
      const newComment = {
        id: Date.now(),
        name,
        text,
        date: new Date().toISOString(),
        replies: [],
      };
      dispatch(addComment(newComment));
      setName("");
      setText("");
    } else {
      alert("Please enter both name and comment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
