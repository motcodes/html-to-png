import { useState, useRef } from 'react';
import { toJpeg } from 'html-to-image';

export const useHtmlToPng = (size = 1024) => {
  const captureRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setLoading] = useState(true);

  async function generateImage(e) {
    e.preventDefault();
    if (!captureRef?.current) {
      return;
    }
    try {
      const imgBase64 = await toJpeg(captureRef.current, {
        width: size,
        height: size,
        quality: 0.75,
      });
      setImageUrl(imgBase64);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return [generateImage, captureRef, imageUrl, isLoading];
};
