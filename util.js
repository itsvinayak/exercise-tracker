const  isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

const getDate = (date) => {
  if (isValidDate(date)) {
    return new Date(date).toString().split(" ").slice(0,4).join(" ") ;
  }
  return new Date().toString().split(" ").slice(0,4).join(" ");
};

module.exports = {
  isValidDate,
  getDate
};
