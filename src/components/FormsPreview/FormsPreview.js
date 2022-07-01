function FormsPreview({ data, onPrevStep }) {
  return (
    <div>
      <p>Your data</p>
      <div>
        <ul>
          {data.map((input, index) => (
            <li key={index}>
              {!input.image ? (
                <>
                  <strong>{input.label}:</strong> {input.value}
                </>
              ) : (
                <div>
                  <strong>{input.label}:</strong>
                  <img src={input.value} alt="Front face" />
                </div>
              )}
            </li>
          ))}
        </ul>
        <div>
          <button type="button" onClick={onPrevStep}>
            Go back
          </button>
          <button type="submit">Submit form</button>
        </div>
      </div>
    </div>
  );
}

export default FormsPreview;
