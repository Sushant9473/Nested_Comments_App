// src/utils/commentUtils.js
export const deleteNestedComment = (comments, id) => {
  return comments
    .filter((comment) => comment.id !== id)
    .map((comment) => ({
      ...comment,
      replies: comment.replies ? deleteNestedComment(comment.replies, id) : [],
    }));
};
