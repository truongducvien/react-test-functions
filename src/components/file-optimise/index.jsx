import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { base64ToFile, parseGIFtoFrames, resizeImage } from './utils';

export default function FileOptimise() {
  const [value, setValue] = useState();

  const showImage = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const resizedImage = new Image();
      resizedImage.src = fileReader.result;

      resizedImage.style.width = '200px';
      resizedImage.onload = () => {
        const area = document.querySelector('#resized-image');
        area.appendChild(resizedImage);
      };
    };
  };

  const optimiseStaticImage = async () => {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(value);
      fileReader.onload = () => {
        const image = new Image();
        image.src = fileReader.result;
        image.onload = async () => {
          // Resize:
          const resizedImageUrl = resizeImage({
            image,
            width: 1000,
            quality: 50,
          });

          const newFile = await base64ToFile(resizedImageUrl, value.name);
          resolve(newFile);
        };
      };
    });
  };

  const optimiseGifImage = () => {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(value);
      fileReader.onload = async () => {
        const gifArrayBuffer = fileReader.result;
        const frames = await parseGIFtoFrames(gifArrayBuffer);

        console.log('frame: ', frames);

        // const imageData = new ImageData(frames[7].patch, 200);
        // const b64 = imageDataToBase64(imageData);
        // const newFile = await base64ToFile(b64, value.name);

        // resolve(newFile);
      };
    });
  };

  const handleSubmit = async () => {
    let file;
    value.type === 'image/gif'
      ? (file = await optimiseGifImage())
      : (file = await optimiseStaticImage());

    showImage(file);
  };

  return (
    <>
      <input
        name="image"
        type="file"
        onChange={(e) => setValue(e.target.files[0])}
      />
      <Button onClick={handleSubmit}>Optimise</Button>
      <Box id={'resized-image'}></Box>
      <hr />
      <Box id="canvas-container"></Box>
    </>
  );
}
