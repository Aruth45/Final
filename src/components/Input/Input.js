import PropTypes from "prop-types";

function Input({
  type = "text",
  labelText,
  placeholder,
  name,
  value,
  onChange,
  error,
}) {
  
  const formGroupTitle = labelText;

  return (
    <div className="form__group">
      <label className="form__group-title">{labelText}</label>
      <div className="form__controls">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
      </div>
      {error && <div>{error}</div>}
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
