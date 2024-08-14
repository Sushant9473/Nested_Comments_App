// src/redux/reducers/commentReducer.js
import { deleteNestedComment } from "../../utils/commentUtils";

const initialState = {
  comments: [],
};

const updateCommentText = (comments, id, newText) => {
  return comments.map((comment) => {
    if (comment.id === id) {
      return { ...comment, text: newText };
    }
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: updateCommentText(comment.replies, id, newText),
      };
    }
    return comment;
  });
};

const addReplyToComments = (comments, parentId, reply) => {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...(comment.replies || []), reply],
      };
    }
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: addReplyToComments(comment.replies, parentId, reply),
      };
    }
    return comment;
  });
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "ADD_REPLY":
      return {
        ...state,
        comments: addReplyToComments(
          state.comments,
          action.payload.parentId,
          action.payload.reply
        ),
      };
    case "EDIT_COMMENT":
      return {
        ...state,
        comments: updateCommentText(
          state.comments,
          action.payload.id,
          action.payload.text
        ),
      };
    case "DELETE_COMMENT":
      return {
        ...state,
        comments: deleteNestedComment(state.comments, action.payload.id),
      };
    default:
      return state;
  }
};

export default commentReducer;
