// src/components/Comment.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment, deleteComment } from "../redux/actions/commentActions";
import { formatDate } from "../utils/dateUtils";
import ReplyForm from "./ReplyForm";

const Comment = ({ comment, parentId = null }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editedText.trim()) {
      dispatch(editComment(comment.id, editedText));
      setIsEditing(false);
    }
  };

  // src/components/Comment.js
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(deleteComment(comment.id, parentId));
    }
  };

  return (
    <div className="border p-4 rounded mb-4 relative">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{comment.name}</h3>
          <p className="text-sm text-gray-500">{formatDate(comment.date)}</p>
        </div>
        <button
          onClick={handleDelete}
          className="absolute top-1/2 -mt-3 right-[-0.8rem] w-6 h-6 flex items-center justify-center text-red-500 bg-white rounded-full border border-red-500 hover:bg-red-100 transition-colors"
        >
          X
        </button>
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <button
            onClick={handleEdit}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <p className="mt-2 pr-8">{comment.text}</p>
      )}
      <div className="mt-2 flex justify-between items-center">
        <div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mr-2 text-blue-500"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-blue-500"
          >
            Reply
          </button>
        </div>
        <span className="text-sm text-gray-500">
          {comment.replies?.length || 0} replies
        </span>
      </div>
      {showReplyForm && (
        <ReplyForm
          parentId={comment.id}
          onReplyAdded={() => setShowReplyForm(false)}
        />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 mt-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} parentId={comment.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
