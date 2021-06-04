import buttonStyles from "./Button.module.css";

function Button({ styles = [], type, disabled, onClick, children }) {
  return (
    <button
      className={[buttonStyles.button, ...styles].join(" ")}
      type={type}
      disabled={disabled || false}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
