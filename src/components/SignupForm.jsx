import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/form.css';
import Form from './Form';
import InputField from './InputField';
import { AuthContext } from './AuthContext';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { apiUrl } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result);
        navigate('/signin');
      } else {
        const errorArray = result.map((error) => {
          return error.msg;
        });
        setErrors(errorArray);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="layout">
      <div className="form-layout">
        <Form method="post" onSubmit={handleSubmit} buttonText="Sign Up">
          <h1 className="form-title">Sign Up</h1>
          <InputField
            label="First Name"
            name="firstName"
            type="text"
            onChange={handleChange}
          />
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            onChange={handleChange}
          />
          <InputField
            label="Username"
            name="username"
            type="text"
            onChange={handleChange}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
          />
        </Form>
        <p>
          Already have an account? <Link to="/signin">Log in</Link>
        </p>
        {errors.length > 0 && (
          <div className="error-list">
            <span style={{ color: 'black' }}>Errors</span>
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
