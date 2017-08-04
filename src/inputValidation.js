const calorieValidation = (cal) => {
  const cals = Number(cal);

  try {
    if (cal.match(/[^\w\s]/)){
      throw new Error("Calories must not contain strange characters");
    }
    if (typeof cals != "number") {
      throw new Error("Calories must be a number");
    }
    return {
      isValid: true
    }
  } catch (e) {
    return {
      isValid: false,
      message: e.message
    };
  }
};


const textValidation = (input) => {
  const string = input.toString();

  try {
    if (input.match(/[^\w\s]/)){
      throw new Error("Input must not contain strange characters");
    }
    if (typeof string != "string") {
      throw new Error("Input must be a string");
    }
    return {
      isValid: true
    }
  } catch (e) {
    return {
      isValid: false,
      message: e.message
    };
  }
};

module.exports = {calorieValidation, textValidation};
