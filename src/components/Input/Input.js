import PropTypes from "prop-types";
import { useState, useRef } from "react";

function Input({
  type = "text",
  labelText,
  placeholder,
  name,
  value,
  onChange,
  error,
}) {
  const [animation, setAnimation] = useState(false);

  const inputRef = useRef();
  

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="input__group">
      <div className={animation ? "form__controls animate" : "form__controls"}>
        <label
          onClick={handleClick}
          className={
            animation
              ? "form__group-label animate"
              : value.trim() !== ""
              ? "form__group-label animate"
              : "form__group-label"
          }
        >
          {labelText}
        </label>
        <input
          ref={inputRef}
          onBlur={() => setAnimation(!animation)}
          onFocus={() => setAnimation(!animation)}
          className="form__input"
          type={type}
          // placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
      </div>
      {error && <div className="form__error">{error}</div>}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default Input;
