import PropTypes from "prop-types";

import Input from "../Input/Input";
import Select from "../Select/Select";
import FileInput from "../FileInput/FileInput";

const Step = ({
  data,
  onChange,
  onFileChange,
  onStepChange,
  errors,
  stepKey,
  step,
  onPrevStep,
}) => {
  let output = [];

  for (const [key, val] of Object.entries(data)) {
    if (val.type.split(":")[0] === "input") {
      output.push(
        <Input
          key={key}
          labelText={val.labelText}
          placeholder={val.placeholder}
          name={key}
          value={val.value}
          onChange={(e) => onChange(stepKey, e)}
          error={errors[key]}
          type={val.type.split(":")[1]}
        />
      );
    } else if (val.type === "select") {
      output.push(
        <Select
          key={key}
          labelText={val.labelText}
          name={key}
          value={val.value}
          onChange={(e) => onChange(stepKey, e)}
          error={errors[key]}
          options={val.options}
        />
      );
    } else if (val.type === "file") {
      output.push(
        <FileInput
          key={key}
          onChange={onFileChange}
          error={errors[key]}
          name={key}
          stepKey={stepKey}
          fileName={val.fileName}
        />
      );
    }
  }

  return (
    <>
      {output}
      <div className="step__holder">
        {step > 1 && (
          <button
            className="step__holder-btn"
            type="button"
            onClick={() => onPrevStep(step - 1)}
          >
            Go back
          </button>
        )}
        <button
          className="step__holder-btn"
          type="button"
          onClick={(e) => onStepChange(data, e)}
        >
          Next
        </button>
      </div>
    </>
  );
};

Step.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func,
  onStepChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  stepKey: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  onPrevStep: PropTypes.func,
};

export default Step;
