import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/actions/commentActions";
import { validateComment } from "../utils/validationUtils";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

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
      toast.success("Comment added successfully!");
    } else {
      toast.error("Please enter both name and comment.");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="mb-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Add a Comment
      </h2>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2"
        >
          Your Name
        </label>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="comment"
          className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2"
        >
          Your Comment
        </label>
        <motion.textarea
          whileFocus={{ scale: 1.02 }}
          id="comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 h-32 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-lg font-semibold shadow-md"
      >
        Add Comment
      </motion.button>
    </motion.form>
  );
};

export default CommentForm;
