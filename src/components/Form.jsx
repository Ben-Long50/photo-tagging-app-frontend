import Button from './Button';

const Form = (props) => {
  return (
    <form
      method={props.method}
      onSubmit={props.onSubmit}
      className={`form ${props.class}`}
    >
      {props.children}
      <Button type="submit" classes="submit-button">
        <div style={{ padding: '0 1.5rem' }}>{props.buttonText}</div>
      </Button>
    </form>
  );
};

export default Form;
