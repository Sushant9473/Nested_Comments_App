import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { motion, AnimatePresence } from "framer-motion";

const CommentList = () => {
  const comments = useSelector((state) => state.comments);
  const [sortedComments, setSortedComments] = useState([]);
  const [sortType, setSortType] = useState("newest");

  useEffect(() => {
    const sorted = sortComments(comments, sortType);
    setSortedComments(sorted);
  }, [comments, sortType]);

  const sortComments = (commentsToSort, type) => {
    switch (type) {
      case "newest":
        return [...commentsToSort].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      case "oldest":
        return [...commentsToSort].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      case "mostReplies":
        return [...commentsToSort].sort(
          (a, b) => (b.replies?.length || 0) - (a.replies?.length || 0)
        );
      default:
        return commentsToSort;
    }
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-12"
    >
      <div className="mb-8 flex items-center justify-between bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Comments
        </h2>
        <div className="flex items-center">
          <label
            htmlFor="sort"
            className="mr-3 text-gray-700 dark:text-gray-300 font-semibold hidden sm:block"
          >
            Sort by:
          </label>
          <motion.select
            whileHover={{ scale: 1.05 }}
            id="sort"
            value={sortType}
            onChange={handleSortChange}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="mostReplies">Most Replies</option>
          </motion.select>
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          {sortedComments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default CommentList;
