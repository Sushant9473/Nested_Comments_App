import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReply } from "../redux/actions/commentActions";
import { validateComment } from "../utils/validationUtils";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

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
      toast.success("Reply added successfully!");
    } else {
      toast.error("Please enter both name and reply.");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="mt-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-600"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Add a Reply
      </h3>
      <div className="mb-4">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <motion.textarea
          whileFocus={{ scale: 1.02 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your reply..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 h-28 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-lg font-semibold shadow-md"
      >
        Add Reply
      </motion.button>
    </motion.form>
  );
};

export default ReplyForm;
