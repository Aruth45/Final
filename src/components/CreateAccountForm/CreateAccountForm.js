import { useState } from "react";
import Step from "../Step/Step";
import FormsPreview from "../FormsPreview/FormsPreview";
import Validator from "../../helpers/validator";

function CreateAccountForm() {
  const block = "form";
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    stepOne: {
      fullName: {
        labelText: "Full Name",
        value: "",
        required: true,
        type: "input",
        placeholder: "John Doe",
      },
      profilePic: {
        value: {},
        required: true,
        file: true,
        fileName: "No file chosen",
        type: "file",
        allowedTypes: ["png", "jpg", "jpeg"],
        maxFileSize: 1024,
      },
    },
    stepTwo: {
      income: {
        labelText: "Source of Income",
        value: "Employed/Salaried",
        required: true,
        type: "select",
        options: [
          { value: "Employed/Salaried", label: "Employed/Salaried" },
          { value: "Business Owner", label: "Business Owner" },
          { value: "Self-Employed", label: "Self-Employed" },
          { value: "Retired", label: "Retired" },
          { value: "Investor", label: "Investor" },
          { value: "Other", label: "Other" },
        ],
      },

      salary: {
        labelText: "Salary",
        value: "",
        required: true,
        type: "input",
        placeholder: "200000",
      },
    },
    stepThree: {
      email: {
        labelText: "Email",
        value: "",
        required: true,
        placeholder: "john.doe@gmail.com",
        type: "input:email",
        email: true,
      },

      password: {
        labelText: "Password",
        value: "",
        required: true,
        type: "input:password",
      },
    },
  });
  const [errors, setErrors] = useState({});

  const changeHandler = (stepKey, e) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [e.target.name]: {
          ...prev[stepKey][e.target.name],
          value: e.target.value,
        },
      },
    }));
  };

  const fileChangeHandler = (name, file, step) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [name]: {
          ...prev[step][name],
          value: file,
          fileName: file.name ? file.name : "No file chosen",
        },
      },
    }));
  };

  const stepChangeHandler = (values, e) => {
    e.preventDefault();
    const newErrors = Validator(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(step + 1);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullName", formData.stepOne.fullName.value);
    data.append("profilePic", formData.stepOne.profilePic.value);
    data.append("income", formData.stepTwo.income.value);
    data.append("salary", formData.stepTwo.salary.value);
    data.append("email", formData.stepThree.email.value);
    data.append("password", formData.stepThree.password.value);
  };

  return (
    <form className={`${block}`} onSubmit={submitHandler}>
      {step === 1 ? (
        <h1>Personal information</h1>
      ) : step === 2 ? (
        <h1>Income information</h1>
      ) : step === 3 ? (
        <h1>Login information</h1>
      ) : (
        <h1>Make sure everything is correct</h1>
      )}
      {step === 1 && (
        <Step
          data={formData.stepOne}
          onChange={changeHandler}
          onStepChange={stepChangeHandler}
          onFileChange={fileChangeHandler}
          errors={errors}
          stepKey="stepOne"
          step={1}
        />
      )}
      {step === 2 && (
        <Step
          data={formData.stepTwo}
          onChange={changeHandler}
          onStepChange={stepChangeHandler}
          errors={errors}
          stepKey="stepTwo"
          onPrevStep={(step) => setStep(step)}
          step={2}
        />
      )}
      {step === 3 && (
        <Step
          data={formData.stepThree}
          onChange={changeHandler}
          onStepChange={stepChangeHandler}
          errors={errors}
          stepKey="stepThree"
          onPrevStep={(step) => setStep(step)}
          step={3}
        />
      )}
      {step === 4 && (
        <FormsPreview
          onPrevStep={() => setStep(step - 1)}
          data={[
            { label: "Full name", value: formData.stepOne.fullName.value },
            {
              label: "Profile pic",
              value: URL.createObjectURL(formData.stepOne.profilePic.value),
              image: true,
            },
            { label: "Income", value: formData.stepTwo.income.value },
            { label: "Salary", value: formData.stepTwo.salary.value },
            { label: "Email", value: formData.stepThree.email.value },
            { label: "Password", value: formData.stepThree.password.value },
          ]}
        />
      )}
    </form>
  );
}

export default CreateAccountForm;
