import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const usePhotoUpload = () => {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('');
  const history = useHistory();

  const clearStatus = () => setStatus('');

  const uploadPhoto = async (photo) => {
    const { signedRequest, url } = await (
      await fetch(`/api/uploads?name=${photo.name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
    ).json();

    try {
      await fetch(signedRequest, { method: 'PUT', body: photo });

      setStatus(
        await (
          await fetch('/api/photos', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              name: photo.name,
              url,
            }),
          })
        ).text(),
      );
    } catch (err) {
      setStatus(err);
    }
  };

  const uploadPhotos = async () => {
    await Promise.all(photos.map(uploadPhoto));
    setTimeout(() => history.push('/'), 1000);
  };

  return { photos, setPhotos, uploadPhotos, status, clearStatus };
};

export default usePhotoUpload;
