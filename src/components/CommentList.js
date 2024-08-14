import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

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
    <div>
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortType}
          onChange={handleSortChange}
          className="p-2 border rounded"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="mostReplies">Most Replies</option>
        </select>
      </div>
      <div className="space-y-4">
        {sortedComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
