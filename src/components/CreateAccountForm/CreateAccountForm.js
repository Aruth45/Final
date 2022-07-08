import { useState, useEffect } from "react";
import Step from "../Step/Step";
import FormsPreview from "../FormsPreview/FormsPreview";
import Validator from "../../helpers/validator";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

function CreateAccountForm() {
  const block = "signupForm";
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

      ocupation: {
        labelText: "Ocupation",
        value: "",
        required: true,
        type: "input",
        placeholder: "Lawyer",
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

      identification: {
        labelText: "Identification",
        value: "",
        required: true,
        type: "input",
        placeholder: "117000511",
        minLength: 9,
      },
    },
    stepThree: {
      username: {
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
        match: true,
        type: "input:password",
      },

      confirmPassword: {
        labelText: "Confirm Password",
        value: "",
        required: true,
        match: true,
        type: "input:password",
      },
    },
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  const uploadImage = async (userData) => {
    const imageData = new FormData();
    imageData.append("file", formData.stepOne.profilePic.value);
    imageData.append("upload_preset", "ss81vymd");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dpvd14tr1/image/upload",
      {
        method: "POST",
        body: imageData,
      }
    );

    const imageInfo = await response.json();
    userData.profilePic = imageInfo.url;

    return userData;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const user = {
      fullname: formData.stepOne.fullName.value,
      ocupation: formData.stepOne.ocupation.value,
      incomeSource: formData.stepTwo.income.value,
      identification: formData.stepTwo.identification.value,
      email: formData.stepThree.username.value,
      password: formData.stepThree.password.value,
    };

    uploadImage(user).then((userData) => {
      fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.error) {
            console.log(data);
          } else {
            navigate("/login");
          }
        });
    });
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
      } else {
        navigate("/dashboard");
      }
    }
  }, []);

  if (token) return null;

  return (
    <form className={`${block}`} onSubmit={submitHandler}>
      <div className={`${block}__holder`}>
        {step === 1 ? (
          <h1 className={`${block}__heading`}>Personal information</h1>
        ) : step === 2 ? (
          <h1 className={`${block}__heading`}>Income information</h1>
        ) : step === 3 ? (
          <h1 className={`${block}__heading`}>Login information</h1>
        ) : (
          <h1 className={`${block}__heading`}>Preview</h1>
        )}
        <div className={`${block}__input-section`}>
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
                { label: "Ocupation", value: formData.stepOne.ocupation.value },
                { label: "Income", value: formData.stepTwo.income.value },
                {
                  label: "Identification",
                  value: formData.stepTwo.identification.value,
                },
                { label: "Email", value: formData.stepThree.username.value },
              ]}
            />
          )}
        </div>
      </div>

      <Link className={`${block}__login-link`} to="/login">
        Already have an account?
      </Link>
    </form>
  );
}

export default CreateAccountForm;
