export const addComment = (comment) => ({
  type: "ADD_COMMENT",
  payload: comment,
});

export const addReply = (parentId, reply) => ({
  type: "ADD_REPLY",
  payload: { parentId, reply },
});

export const editComment = (id, text) => ({
  type: "EDIT_COMMENT",
  payload: { id, text },
});

export const deleteComment = (id, parentId = null) => ({
  type: "DELETE_COMMENT",
  payload: { id, parentId },
});
