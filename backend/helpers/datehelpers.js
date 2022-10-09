const convertDate = (strDate) => {
  var vals = strDate.split("/");

  return new Date(vals[2] + "-" + vals[0] + "-" + vals[1]);
};

const convertToDisplayDate = (valDate) => {
  if (valDate === null) {
    return null;
  } else {
    let date = new Date(valDate);

    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  }
};
module.exports = { convertDate, convertToDisplayDate };
