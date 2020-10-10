// eslint-disable-next-line consistent-return
const uploadImage = async (e, name) => {
  try {
    // const { files } = e.target;
    const data = new FormData();
    data.append('file', e);
    data.append('upload_preset', `${name}`);
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/kodehauz/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );
    // console.log(files[0]);

    const file = await res.json();
    return file.secure_url;
  } catch (err) {
    console.log(err);
  }
};

export default uploadImage;
