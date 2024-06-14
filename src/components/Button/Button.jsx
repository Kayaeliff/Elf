import { Link } from "react-router-dom";
import "./_Button.css";
import arrowIcon from "/images/shared/desktop/icon-arrow-right.svg";

function Button({
  kind = "orange", className = "", type = "button", isLink = true, onClick, linkTo, buttonText, isDisabled = false,
}) {
  if (isLink) {
    return (
      <Link
        onClick={(e) => isDisabled ? e.preventDefault() : onClick ? onClick() : null}
        className={`button button--${kind} ${className} ${isDisabled && "disabled"}`}
        to={linkTo}
      >
        {buttonText}
        {kind === "right-arrow" && (
          <img
            src={arrowIcon}
            alt="An orange arrow pointing to the right side." />
        )}
      </Link>
    );
  }

  if (!isLink)
    return (
      <button
        disabled={isDisabled}
        type={type}
        onClick={onClick}
        className={`button button--${kind} ${className}`}
      >
        {buttonText}
      </button>
    );
}

export default Button;
