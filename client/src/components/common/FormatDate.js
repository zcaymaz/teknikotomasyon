export const formatDate = (dateString) => {
  const inputDate = new Date(dateString);
  inputDate.setHours(inputDate.getHours() + 3);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formattedDate = inputDate.toLocaleString("tr-TR", options);
  return formattedDate;
};
