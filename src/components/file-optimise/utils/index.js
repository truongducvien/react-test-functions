import { parseGIF, decompressFrames } from 'gifuct-js';

const resizeImage = ({
  image,
  width = 100,
  returnType = 'webp',
  quality = 100,
} = {}) => {
  const imageRatio = image.width / image.height;

  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = width / imageRatio;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#8dc1f1';
  ctx.fillRect(0, 0, width, width / imageRatio);
  ctx.drawImage(image, 0, 0, width, width / imageRatio);

  return canvas.toDataURL(`image/${returnType}`, quality / 100); // Base64
};

const base64ToFile = async (base64, fileName = 'new_file.webp') => {
  const res = await fetch(base64);
  const blob = await res.blob();
  const file = new File([blob], fileName, {
    type: 'image/jpeg',
  });
  return file;
};

const fileToBase64 = async (file) => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = async () => {
      resolve(fileReader.result);
    };
  });
};

const parseGIFtoFrames = async (gifArrayBuffer) => {
  const gif = await parseGIF(gifArrayBuffer);
  const result = decompressFrames(gif, true);
  return result;
};

function imageDataToBase64(imagedata) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = imagedata.width;
  canvas.height = imagedata.height;

  ctx.putImageData(imagedata, 0, 0);
  return canvas.toDataURL();
}

export {
  resizeImage,
  base64ToFile,
  fileToBase64,
  parseGIFtoFrames,
  imageDataToBase64,
};
