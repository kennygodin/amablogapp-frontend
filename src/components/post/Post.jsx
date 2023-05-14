import { Link } from 'react-router-dom';
import './Post.scss';
import moment from 'moment';

const Post = ({ blog }) => {
  return (
    <div className="post">
      <Link to={`/blogs/${blog.id}`}>
        <img className="postImg" src={blog.img} alt="" />
      </Link>
      <div className="postDetails">
        <h3>
          <Link to={`/blogs/${blog.id}`} className="link">
            {blog.title}
          </Link>
        </h3>

        <span>Posted: {moment(blog.createdAt).fromNow()}</span>

        <p>
          <Link to={`/blogs/${blog.id}`} className="link">
            {blog.desc}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Post;
