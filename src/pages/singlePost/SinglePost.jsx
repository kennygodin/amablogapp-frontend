import { useContext, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import UpdateSinglePost from '../../components/updateSinglePost/UpdateSinglePost';
import './SinglePost.scss';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';
import Notification from '../../components/notification/Notification';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const SinglePost = () => {
  // Handle Update Post
  const [updateMode, setUpdateMode] = useState(false);
  const { id } = useParams();

  const { isLoading, error, data } = useQuery(['blog', id], () =>
    makeRequest.get(`/blogs/${id}`).then((res) => {
      return res.data;
    })
  );

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const { user } = useContext(AuthContext);

  const updateBlog = () => {
    setUpdateMode(true);
    setTitle(data.title);
    setDesc(data.desc);
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Confirm Notify
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const deleteMutation = useMutation(
    () => {
      return makeRequest.delete(`/blogs/${id}`);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['blogs']);
        navigate('/');
        setNotify({
          isOpen: true,
          message: 'Deleted Successfully.',
          type: 'success',
        });
      },
    }
  );

  const deleteBlog = () => {
    confirmAlert({
      title: 'Delete Blog!!!',
      message: 'Are you sure you want to delete blog?.',
      buttons: [
        {
          label: 'Confirm',
          onClick: () => deleteMutation.mutate(),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  // console.log(data);
  return (
    <div className="singlePostContainer">
      {error ? (
        'Something went wrong'
      ) : isLoading ? (
        'Loading...'
      ) : (
        <div className="singlePost">
          <img className="singlePostImg" src={data.img} alt="" />
          <div className="actions">
            <div className="author">
              <span>Author:</span>
              <span> {data.username}</span>
            </div>

            {user?.username === data.username ? (
              <div className="actionItems">
                <span>
                  <AiOutlineDelete size={25} onClick={deleteBlog} />
                </span>
                <span>
                  <BiEdit size={25} onClick={updateBlog} />
                </span>
              </div>
            ) : (
              <span>Posted: {moment(data.createdAt).fromNow()}</span>
            )}
          </div>

          <h2 className="singlePostTitle">{data.title}</h2>
          <p>{data.desc}</p>

          {updateMode && (
            <UpdateSinglePost
              setUpdateMode={setUpdateMode}
              isLoading={isLoading}
              error={error}
              data={data}
              title={title}
              desc={desc}
              setTitle={setTitle}
              setDesc={setDesc}
              id={id}
              notify={notify}
              setNotify={setNotify}
            />
          )}

          <Notification notify={notify} setNotify={setNotify} />
        </div>
      )}
      <Sidebar />
    </div>
  );
};

export default SinglePost;
