const formatDate = (date: Date): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${months[month]} ${day}, ${year}`;
};

export default formatDate;
