import '../styles/button.css';

const Button = (props) => {
  return (
    <button
      className={`button ${props.classes}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
      {props.text}
    </button>
  );
};

export default Button;
