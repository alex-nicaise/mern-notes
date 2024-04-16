const formatDate = (date: string) => {
  const newDate = new Date(date);

  const hours = ("0" + newDate.getUTCHours()).slice(-2);
  const minutes = ("0" + newDate.getUTCMinutes()).slice(-2);
  const month = ("0" + (newDate.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + newDate.getUTCDate()).slice(-2);
  const year = newDate.getUTCFullYear().toString().slice(-2);

  const formattedDate = `${hours}:${minutes} ${month}/${day}/${year}`;

  return formattedDate;
};

export default formatDate;
