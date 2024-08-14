export const validateComment = (name, text) => {
  if (!name.trim() || !text.trim()) {
    return false;
  }
  return true;
};
