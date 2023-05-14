import './UpdateSinglePost.scss';
import { FaRegTimesCircle } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useState } from 'react';
import { upload } from '../../../uploads';

const UpdateSinglePost = ({
  setUpdateMode,
  isLoading,
  error,
  data,
  title,
  desc,
  setTitle,
  setDesc,
  id,
  notify,
  setNotify,
}) => {
  const [imgPreview, setImgPreview] = useState(null);
  const [img, setImg] = useState(null);

  const handleImg = (e) => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (userData) => {
      return makeRequest.put(`/blogs/${id}`, userData);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['blog', id]);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = data.img;
    url = img && (await upload(img));
    mutation.mutate({ title, desc, img: url });

    setUpdateMode(false);
    setNotify({
      isOpen: true,
      message: 'Successfully Updated',
      type: 'success',
    });
  };

  return (
    <div className="updatePostContainer">
      {error ? (
        'Something went wrong...'
      ) : isLoading ? (
        'Loading...'
      ) : (
        <div className="updatePost">
          <div className="updateTop">
            <h2>Update Blog</h2>
            <FaRegTimesCircle
              className="updateClose"
              size={20}
              onClick={() => setUpdateMode(false)}
            />
          </div>
          <img
            className="updatePostImg"
            src={imgPreview ? imgPreview : data.img}
            alt=""
          />
          <code>Use the plus icon to add a blog picture</code>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <label htmlFor="coverPic">
                <AiOutlinePlus />
              </label>
              <input
                type="file"
                id="coverPic"
                style={{ display: 'none' }}
                onChange={(e) => handleImg(e)}
              />
              <input
                type="text"
                autoFocus={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button>Update</button>
            </div>

            <textarea
              placeholder="Update your story..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateSinglePost;
