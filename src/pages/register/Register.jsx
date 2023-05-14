import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    return setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validations;
    if (inputs.password !== inputs.confirmPassword) {
      setError('Passwords do not match');
      throw new Error('Passwords do not match');
    }
    if (!inputs.username || !inputs.email || !inputs.password) {
      setError('Please fill all fields.');
      throw new Error('Please fill all fields.');
    }

    try {
      await axios.post(`${BACKEND_URL}/api/auth/register`, inputs);
      navigate('/');
    } catch (err) {
      return setError(err.response.data);
    }
  };
  // console.log(error);

  return (
    <div className="register">
      <div className="container">
        <div className="left">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
            />
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
            {error && <div className="error">{error}</div>}
            <button>Register</button>
          </form>
        </div>
        <div className="right">
          <h1>Ama Blog.</h1>
          <p>
            Share information about your opinion on varieties of topics,
            lifestyle and hobbies. Publish your stories, interents and thoughts.
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
