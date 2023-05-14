import { Link } from 'react-router-dom';
import './Sidebar.scss';
import { BsFacebook } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="about">
        <h2>About Me</h2>
        <img
          src="https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>
          I'm Kencodin, responsible, creative, open-minded, friendly and
          ambitious web developer. I built this blog app, "amablog" where you
          can share information about your opinion on varieties of topics,
          lifestyle and hobbies, publish your stories, interents and thoughts.
          Please check it out.
        </p>
      </div>
      <hr />
      <div className="contact">
        <h2>Contact Me</h2>
        <div className="sideLinks">
          <Link
            to="https://www.facebook.com/okoh.kenechukwu.1"
            className="link"
          >
            <BsFacebook size={25} />
          </Link>
          <Link to="https://twitter.com/kennycodin" className="link">
            <BsTwitter size={25} />
          </Link>

          <Link to="https://www.instagram.com/kennygodine" className="link">
            <BsInstagram size={25} />
          </Link>
          <Link to="https://github.com/kennygodin" className="link">
            <BsGithub size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
