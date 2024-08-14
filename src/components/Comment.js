import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment, deleteComment } from "../redux/actions/commentActions";
import { formatDate } from "../utils/dateUtils";
import ReplyForm from "./ReplyForm";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FaEdit, FaReply, FaSave, FaTimes, FaTrash } from "react-icons/fa";

const Comment = ({ comment, parentId = null }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editedText.trim()) {
      dispatch(editComment(comment.id, editedText));
      setIsEditing(false);
      toast.success("Comment updated successfully!");
    } else {
      toast.error("Comment cannot be empty.");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(deleteComment(comment.id, parentId));
      toast.info("Comment deleted.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl p-6 mb-6 relative transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-600"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-1">
            {comment.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(comment.date)}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600 transition-colors duration-300 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
          aria-label="Delete comment"
        >
          <FaTrash size={20} />
        </motion.button>
      </div>
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </motion.div>
        ) : (
          <motion.p
            key="display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            {comment.text}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editButtons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex space-x-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEdit}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center"
                >
                  <FaSave className="mr-1" /> Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300 flex items-center"
                >
                  <FaTimes className="mr-1" /> Cancel
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="normalButtons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex space-x-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1 rounded-md transition-colors duration-300 flex items-center bg-blue-500 text-white hover:bg-blue-600"
                >
                  <FaEdit className="mr-1" /> Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300 flex items-center"
                >
                  <FaReply className="mr-1" /> Reply
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {comment.replies?.length || 0} replies
        </span>
      </div>
      <AnimatePresence>
        {showReplyForm && !isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ReplyForm
              parentId={comment.id}
              onReplyAdded={() => setShowReplyForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {comment.replies && comment.replies.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 ml-8 space-y-4"
        >
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} parentId={comment.id} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Comment;
