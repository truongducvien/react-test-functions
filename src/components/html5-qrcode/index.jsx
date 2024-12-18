// import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";
import beepSound from "../../../public/beep-sound.mp3";

export default function HTML5QRCodeTest() {
  function beep() {
    var snd = new Audio(beepSound);
    snd.play();
  }

  const handleSuccess = async (html5QrCode, decodedText, decodedResult) => {
    // handle the scanned code as you like, for example:
    beep();
    html5QrCode.pause();
    await new Promise(() => {
      setTimeout(() => {
        console.log(`Code matched = ${decodedText}`, decodedResult);
        html5QrCode.stop();
      }, 2000);
    });
  };

  const processScan = async () => {
    const devices = await Html5Qrcode.getCameras(); // Request permission
    if (devices && devices.length) {
      const cameraId = devices[0].id;

      const config = {
        fps: 10, // Optional, frame per seconds for qr code scanning
        qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
      };

      const html5QrCode = new Html5Qrcode(/* element id */ "reader", false);
      html5QrCode
        .start(cameraId, config, (decodedText, decodedResult) => {
          handleSuccess(html5QrCode, decodedText, decodedResult);
        })
        .catch(() => {
          html5QrCode.stop();
        });
    }
  };

  useEffect(() => {
    processScan();
  }, []);

  return (
    <div
      style={{
        width: "300px",
      }}
    >
      <div
        style={{
          width: "600px",
          // height: "400px",
          border: "2px dashed",
        }}
      >
        <div
          id="reader"
          // width="400px"
          style={{
            transform: "scaleX(-100%)",
          }}
        ></div>
      </div>
    </div>
  );
}
