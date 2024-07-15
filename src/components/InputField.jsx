import '../styles/form.css';

const InputField = (props) => {
  return (
    <div className="form-field">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputField;
