import axios from 'axios';

// Uploading to Cloudinary
export const upload = async (blogImage) => {
  const formData = new FormData();
  formData.append('file', blogImage);
  formData.append('upload_preset', 'amablog');

  try {
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/kencodin/image/upload',
      formData
    );

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};
