import jsQR from 'jsqr';

const imageFileToImageData = (file) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      resolve(imageData);
    };
  });
};

const scanQrCode = async (imageFile) => {
  try {
    const imageData = await imageFileToImageData(imageFile);
    const result = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'attemptBoth',
    });
    return result;
  } catch (error) {
    console.log(error);
    return 'no qr code';
  }
};

export { imageFileToImageData, scanQrCode };
