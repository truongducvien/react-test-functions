import { Box, Button, Input, VStack } from '@chakra-ui/react';
import QRCode from 'qrcode-reader';
import { useState } from 'react';
import { resizeImage } from '../file-optimise/utils';
import { scanQrCode } from './scanQrCode';

export default function HTML5QRCodeReader() {
  const [value, setValue] = useState();

  const handleCheckQRCode = async (file) => {
    const qrCode = await scanQrCode(file);
    console.log({ qrCode });

    const preview = new Image();
    preview.src = URL.createObjectURL(value);
    preview.setAttribute('style', 'width: 300px; height: 160px');
    preview.onload = () => {
      const ele = document.querySelector('#test');
      ele.appendChild(preview);
    };

    // scanQrCodeCopy(file, (result) => console.log('scan result: ', result));
  };

  return (
    <VStack>
      <Box id="qr-code" hidden />
      <Input type="file" onChange={(e) => setValue(e.target.files[0])} />
      <Button onClick={() => handleCheckQRCode(value)}>Check</Button>
      <div id="test"></div>
    </VStack>
  );
}
