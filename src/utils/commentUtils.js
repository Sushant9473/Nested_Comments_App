// src/utils/commentUtils.js
export const deleteNestedComment = (comments, id) => {
  return comments
    .filter((comment) => comment.id !== id)
    .map((comment) => ({
      ...comment,
      replies: comment.replies ? deleteNestedComment(comment.replies, id) : [],
    }));
};

// src/utils/commentUtils.js
export const countNestedReplies = (comment) => {
  if (!comment.replies || comment.replies.length === 0) {
    return 0;
  }
  return comment.replies.reduce(
    (count, reply) => count + 1 + countNestedReplies(reply),
    0
  );
};
