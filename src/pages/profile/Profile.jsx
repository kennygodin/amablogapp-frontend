import { useContext, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './Profile.scss';
import { BiUserPlus } from 'react-icons/bi';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { upload } from '../../../uploads';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [PicPreview, setPicPreview] = useState(null);
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState(null);

  const handlePicture = (e) => {
    setPicPreview(URL.createObjectURL(e.target.files[0]));
    setPicture(e.target.files[0]);
  };
  const [textInputs, setTextInputs] = useState({
    username: user.username,
    email: user.email,
    password: '',
  });

  const handleTexts = (e) => {
    setTextInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profilePic = user.profilePic;
    profilePic = picture && (await upload(picture));

    try {
      const res = await axios.patch(
        `${BACKEND_URL}/api/users/updateUser`,
        {
          ...textInputs,
          profilePic,
        },
        { withCredentials: true }
      );
      dispatch({ type: 'LOGIN', payload: res.data });
      navigate('/profile');
    } catch (err) {
      // return setError(err);
      console.log(err);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/users/deleteUser`, {
        withCredentials: true,
      });
      dispatch({ type: 'LOGOUT' });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAcct = () => {
    confirmAlert({
      title: 'Delete Account!!!',
      message: "You can't undo this operation.",
      buttons: [
        {
          label: 'Confirm',
          onClick: () => deleteUser(),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  return (
    <div className="profileContainer">
      <div className="profile">
        <div className="profileTop">
          <h2>
            Welcome, <span>{user.username}</span>
          </h2>
          <button onClick={deleteAcct}>Delete Account</button>
        </div>
        <form onSubmit={handleSubmit}>
          <span>Profile Picture</span>
          <div className="profileFileInputs">
            <img src={PicPreview ? PicPreview : user.profilePic} alt="" />
            <label htmlFor="profilePic">
              <BiUserPlus />
            </label>
            <input
              type="file"
              id="profilePic"
              style={{ display: 'none' }}
              onChange={(e) => handlePicture(e)}
            />
          </div>

          <div className="profileTextsInput">
            <label>Username</label>
            <input
              type="text"
              placeholder={user.username}
              name="username"
              onChange={handleTexts}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder={user.email}
              name="email"
              onChange={handleTexts}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="***********"
              name="password"
              onChange={handleTexts}
            />
          </div>
          <button>Update</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Profile;
