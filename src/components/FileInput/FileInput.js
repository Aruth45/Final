import { useRef } from "react";
import PropTypes from "prop-types";

const FileInput = ({ onChange, name, error, stepKey, fileName }) => {
  const fileInput = useRef();

  const openFilePicker = () => {
    fileInput.current.click();
  };

  const fileChangeHandler = (e) => {
    if (e.target.files[0]) {
      onChange(name, e.target.files[0], stepKey);
    } else {
      onChange(name, {}, stepKey);
    }
  };

  return (
    <div>
      <input
        type="file"
        name={name}
        ref={fileInput}
        onChange={fileChangeHandler}
      />
      <div>
        <button type="button" onClick={openFilePicker}>
          Choose file
        </button>
        <p>
          {fileName}
          {fileName !== "No file chosen" && (
            <button
              type="button"
              onClick={() => onChange(name, {}, stepKey)}
            ></button>
          )}
        </p>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

FileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  stepKey: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default FileInput;
