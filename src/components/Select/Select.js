import PropTypes from "prop-types";

const Select = ({ labelText, name, value, onChange, options, error }) => {
  return (
    <div className="form__group">
      <div className="form__controls-select">
        <label className="form__select-heading">{labelText}</label>
        <select
          className="form__select"
          name={name}
          value={value}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  error: PropTypes.string,
};

export default Select;
