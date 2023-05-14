import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    // Validation;
    if (!inputs.email || !inputs.password) {
      setError('Please fill all fields.');
      throw new Error('Please fill all fields.');
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, inputs, {
        withCredentials: true,
      });
      dispatch({ type: 'LOGIN', payload: res.data });
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };
  // console.log(inputs);

  return (
    <div className="login">
      <div className="container">
        <div className="left">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
            <div>
              <span>
                Don't have an account? <Link to="/register">Register</Link>
              </span>
              <Link to="/forgotpassword">Forgot Password?</Link>
              <Link to="/">Home</Link>
            </div>
            {error && <div className="error">{error}</div>}
            <button>Login</button>
          </form>
        </div>
        <div className="right">
          <h1>Ama Blog.</h1>
          <p>
            Share information about your opinion on varieties of topics,
            lifestyle and hobbies. Publish your stories, interents and thoughts.
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
