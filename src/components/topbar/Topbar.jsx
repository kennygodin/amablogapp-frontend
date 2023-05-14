import { Link, useNavigate } from 'react-router-dom';
import './Topbar.scss';
import { MdContactless } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };
  return (
    <div className="topbar">
      <div className="left">
        <Link to="/" className="link">
          <span>Amablog</span>
        </Link>
        <MdContactless size={25} className="logo" />
      </div>
      <div className={isOpen ? 'right active' : 'right'}>
        <div className="rightLinks" onClick={toggle}>
          <Link to="/" className="link">
            <span>All Blogs</span>
          </Link>
          <Link to="/write" className="link">
            <span>Add Blog</span>
          </Link>
          <Link to="/register" className="link">
            <span>Register</span>
          </Link>
          <Link to="/login" className="link">
            <span>Login</span>
          </Link>
        </div>
        <div className="rightUser" onClick={toggle}>
          <Link to="/profile">
            {/* <img src= alt="" /> */}
            <img
              src={
                user
                  ? `${user.profilePic}`
                  : 'https://i.ibb.co/4pDNDk1/avatar.png'
              }
              alt=""
            />
          </Link>

          {user && <span>{user.username}</span>}
          {user && <button onClick={logoutUser}>Logout</button>}
        </div>
      </div>
      <div className="nav-btn nav-close-btn" onClick={toggle}>
        {isOpen ? <FaTimes size={25} /> : <GiHamburgerMenu size={25} />}
      </div>
    </div>
  );
};

export default Topbar;
