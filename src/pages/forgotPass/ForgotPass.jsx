import { Link } from 'react-router-dom';
import './ForgotPass.scss';
import { MdPassword } from 'react-icons/md';
import { useState } from 'react';
import axios from 'axios';
import Notification from '../../components/notification/Notification';

const ForgotPass = () => {
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  // Confirm Notify
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!email) {
      setError('Email field is required.');
      throw new Error('Email field is required.');
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/forgotpassword`, {
        email,
      });

      setNotify({
        isOpen: true,
        message: res.data.message,
        type: 'success',
      });

      setEmail('');
      setError(null);
    } catch (err) {
      // console.log(err);
      return setError(err.response.data);
    }
  };
  return (
    <div className="forgotPass">
      <form onSubmit={handleSubmit}>
        <MdPassword size={35} className="passIcon" />
        <h2>Reset Password Request</h2>
        <input
          type="email"
          placeholder="Please, enter your blog email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="action">
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
          <Link to="/">Home ?</Link>
        </div>
        <button>Get Reset Token</button>

        {error && <div className="error">{error}</div>}
        <Notification notify={notify} setNotify={setNotify} />
      </form>
    </div>
  );
};

export default ForgotPass;
