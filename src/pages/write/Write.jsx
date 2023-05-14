import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './Write.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useNavigate } from 'react-router-dom';

import { upload } from '../../../uploads';

const Write = () => {
  const [textInputs, setTextInputs] = useState({
    title: '',
    desc: '',
  });
  const [imgPreview, setImgPreview] = useState(null);
  const [blogImage, setBlogImage] = useState(null);
  const [error, setError] = useState(null);

  const handleTextInputs = (e) => {
    setTextInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlogImgChange = (e) => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setBlogImage(e.target.files[0]);
  };

  // Cloudinary

  // Using react-query to add blogs and refetch them
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(
    (newBlog) => {
      return makeRequest.post('/blogs/newblog', newBlog);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['blogs']);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!textInputs.title || !textInputs.desc) {
      setError('Please enter blog title and description.');
      throw new Error('Please enter blog title and description.');
    }

    const url = await upload(blogImage);
    mutation.mutate({ ...textInputs, img: url });
    navigate('/');
  };
  // console.log(textInputs);
  return (
    <div className="writeContainer">
      <div className="write">
        {imgPreview != null ? (
          <img src={imgPreview} alt="" />
        ) : (
          <code>Use the plus icon to add a blog picture</code>
        )}

        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label htmlFor="coverPic">
              <AiOutlinePlus />
            </label>
            <input
              type="file"
              id="coverPic"
              style={{ display: 'none' }}
              onChange={(e) => handleBlogImgChange(e)}
            />
            <input
              type="text"
              autoFocus={true}
              placeholder="Enter Blog Title"
              name="title"
              onChange={handleTextInputs}
            />
            <button>Publish</button>
          </div>

          <textarea
            placeholder="Share your story..."
            name="desc"
            onChange={handleTextInputs}
          ></textarea>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Write;
