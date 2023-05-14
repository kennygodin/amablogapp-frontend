import { useState } from 'react';
import './ResetPass.scss';
import { MdLockReset } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Notification from '../../components/notification/Notification';

const ResetPass = () => {
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const { resetToken } = useParams();
  const [passwords, setPasswords] = useState({
    password: '',
    conPassword: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Confirm Notify
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!passwords.password || !passwords.conPassword) {
      setError('All fields are required.');
      throw new Error('All fields are required.');
    }
    if (passwords.password !== passwords.conPassword) {
      setError('Passwords do no match.');
      throw new Error('Passwords do no match.');
    }

    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/auth/resetpassword/${resetToken}`,
        passwords
      );
      setError(null);
      setNotify({
        isOpen: true,
        message: res.data.message,
        type: 'success',
      });
      navigate('/profile');
      // return res.data;
    } catch (err) {
      // console.log(err);
      return setError(err.response.data);
    }
  };
  return (
    <div className="resetPass">
      <form onSubmit={handleSubmit}>
        <MdLockReset size={35} className="resIcon" />
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          name="password"
          onChange={handleInputs}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="conPassword"
          onChange={handleInputs}
        />

        <button>Reset Password</button>

        {error && <div className="error">{error}</div>}
        <Notification notify={notify} setNotify={setNotify} />
      </form>
    </div>
  );
};

export default ResetPass;
