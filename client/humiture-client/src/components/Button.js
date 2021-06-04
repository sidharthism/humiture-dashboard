import buttonStyles from "./Button.module.css";

function Button({ styles = [], type, onClick, children }) {
  return (
    <button
      className={[buttonStyles.button, ...styles].join(" ")}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
