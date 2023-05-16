const getMonthName = (element) => {
  let label = "";
  if (element === "01") {
    label = "January";
  } else if (element === "02") {
    label = "Feburary";
  } else if (element === "03") {
    label = "March";
  } else if (element === "04") {
    label = "April";
  } else if (element === "05") {
    label = "May";
  } else if (element === "06") {
    label = "June";
  } else if (element === "07") {
    label = "July";
  } else if (element === "08") {
    label = "August";
  } else if (element === "09") {
    label = "September";
  } else if (element === "10") {
    label = "Octuber";
  } else if (element === "11") {
    label = "November";
  } else if (element === "12") {
    label = "December";
  }
  return label;
};

const convertArrayOfObjectToArray = (arr, key) => {
  try {
    const data = [];
    for (var i = 0; i < arr.length; i++) {
      data.push(arr[i][key]);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const percentage = (obtain, total) => {
  return ((obtain / total) * 100).toFixed(2);
};

export { convertArrayOfObjectToArray, percentage, getMonthName };
