import { makeRequest } from '../../axios';
import Post from '../post/Post';
import './Posts.scss';
import { useQuery } from '@tanstack/react-query';

const Posts = () => {
  const { isLoading, error, data } = useQuery(['blogs'], () =>
    makeRequest.get('/blogs').then((res) => {
      return res.data;
    })
  );

  // console.log(data);
  return (
    <div className="posts">
      {error
        ? 'Something went wrong!'
        : isLoading
        ? 'Loading...'
        : data.map((blog) => <Post blog={blog} key={blog.id} />)}
    </div>
  );
};

export default Posts;
