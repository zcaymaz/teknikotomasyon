export const formatDate = (dateString) => {
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = new Date(dateString).toLocaleString("tr-TR", options);
  return formattedDate;
};
