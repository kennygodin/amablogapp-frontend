import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <img
        className="homeImg"
        src="https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
      <div className="contents">
        <Posts />
        <Sidebar />
      </div>
    </div>
  );
  <p>Home</p>;
};

export default Home;
