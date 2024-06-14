import { useState } from "react";

import "../Input/_Input.css";
function Input({
  id, type, inputProps, labelText, checks, errorMessage = "Error", onChange, isRequired = false,
}) {
  const [isValid, setIsValid] = useState(true);

  const checkValidity = (ev) => {
    const { validity } = ev.target;

    const checksPassed = checks.filter((check) => validity[check]).length === 0;

    setIsValid(checksPassed);
  };

  if (type === "radio") {
    return (
      <div className="input__container input__container--radio">
        <input
          className="input__field--radio"
          onChange={onChange}
          id={id}
          type={type}
          {...inputProps} />
        <label className="input__label--radio" htmlFor={id}>
          <div>
            <div></div>
          </div>
          <p>{labelText}</p>
        </label>
      </div>
    );
  }

  return (
    <div className="input__container input__container--field">
      <input
        required={isRequired}
        id={id}
        className={`input__field--field ${!isValid ? "invalid" : ""} `}
        type={type}
        {...inputProps}
        onChange={onChange}
        onBlur={checkValidity}
        name={id} />
      <label className="input__label input__label--field" htmlFor={id}>
        <span>{isRequired && "*"}</span>
        <p>{labelText}</p>
      </label>
      <p
        className={`input__error ${isValid ? "input__error--hidden" : "input__error--shown"} `}
      >
        {errorMessage}
      </p>
    </div>
  );
}

export default Input;
