// src/components/ReplyForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReply } from "../redux/actions/commentActions";
import { validateComment } from "../utils/validationUtils";

const ReplyForm = ({ parentId, onReplyAdded }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateComment(name, text)) {
      const newReply = {
        id: Date.now(),
        name,
        text,
        date: new Date().toISOString(),
        replies: [],
      };
      dispatch(addReply(parentId, newReply));
      setName("");
      setText("");
      onReplyAdded();
    } else {
      alert("Please enter both name and reply.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
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
        placeholder="Write a reply..."
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Reply
      </button>
    </form>
  );
};

export default ReplyForm;
