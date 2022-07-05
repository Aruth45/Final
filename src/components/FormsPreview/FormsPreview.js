function FormsPreview({ data, onPrevStep }) {
  return (
    <>
      <div className="preview">
        <ul className="preview__list">
          {data.map((input, index) => (
            <li className="preview__item" key={index}>
              {!input.image ? (
                <>
                  <strong>{input.label}:</strong> {input.value}
                </>
              ) : (
                <div className="preview__img-container">
                  <strong>{input.label}:</strong>
                  <img
                    className="preview__img"
                    src={input.value}
                    alt="Front face"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="step-holder">
        <button className="step__holder-btn" type="button" onClick={onPrevStep}>
          Go back
        </button>
        <button className="step__holder-btn" type="submit">
          Submit form
        </button>
      </div>
    </>
  );
}

export default FormsPreview;
