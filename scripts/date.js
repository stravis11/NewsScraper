const createDate = () => {
  let d = new Date();
  let dateFormat = "";

  dateFormat += d.getMonth() + 1 + "_";

  dateFormat += d.getDate() + "_";

  dateFormat += d.getFullYear();

  return dateFormat;
};

module.exports = createDate;
