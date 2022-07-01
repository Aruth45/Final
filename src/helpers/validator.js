const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

function Validator(inputs) {
  let errors = {};

  for (let input in inputs) {
    const currentInput = inputs[input];

    if (currentInput.required && currentInput.value === "") {
      errors[input] = "This field is required";
    }

    if (
      currentInput.required &&
      currentInput.file &&
      !currentInput.value.name
    ) {
      errors[input] = "This field is required";
    }

    if (currentInput.email && !validateEmail(currentInput.value)) {
      errors[input] = "Invalid email address";
    }

    if (
      currentInput.minLength &&
      currentInput.value.trim().length < currentInput.minLength
    ) {
      errors[
        input
      ] = `This field must have at least ${currentInput.minLength} characters`;
    }

    if (
      currentInput.file &&
      currentInput.allowedTypes &&
      currentInput.value.name &&
      !currentInput.allowedTypes.includes(currentInput.value.name.split(".")[1])
    ) {
      errors[input] = "Invalid file type";
    }

    if (
      currentInput.file &&
      currentInput.maxFileSize &&
      currentInput.maxFileSize * 1024 < Math.round(currentInput.value.size)
    ) {
      errors[input] = "File is too large";
    }
  }

  return errors;
}

export default Validator;
