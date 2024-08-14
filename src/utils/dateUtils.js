export const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

export const sortByDate = (a, b) => {
  return new Date(b.date) - new Date(a.date);
};
