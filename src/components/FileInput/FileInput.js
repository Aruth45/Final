import { useRef } from "react";
import PropTypes from "prop-types";

const FileInput = ({ onChange, name, error, stepKey, fileName }) => {
  const fileInput = useRef();

  const handleFilePicker = () => {
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
    <div className="form__group-file">
      <button onClick={handleFilePicker} className="form__inputFile-btn">
        Choose File
      </button>
      {error && <div className="form__error">{error}</div>}
      <input
        className="form__inputFile"
        type="file"
        name={name}
        ref={fileInput}
        onChange={fileChangeHandler}
      />
    
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
