// import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import beepSound from "../../../public/beep-sound.mp3";

export default function HTML5QRCodeTest() {
  const html5QrCode = useRef();

  const [devices, setDevices] = useState([]);
  const [currentDevice, setCurrentDevice] = useState();

  function beep() {
    var snd = new Audio(beepSound);
    snd.play();
  }

  const handleSuccess = async (decodedText, decodedResult) => {
    // handle the scanned code as you like, for example:
    beep();
    html5QrCode?.pause();
    await new Promise(() => {
      setTimeout(() => {
        console.log(`Code matched = ${decodedText}`, decodedResult);
        html5QrCode.stop();
      }, 2000);
    });
  };

  const processScan1 = async () => {
    const cameraId = currentDevice?.id;
    if (!cameraId) return;

    const config = {
      fps: 10, // Optional, frame per seconds for qr code scanning
      qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
    };
    console.log("init scanner");
    handleStopScan();
    html5QrCode.current = new Html5Qrcode(/* element id */ "reader", false);
    html5QrCode?.current
      ?.start(
        cameraId,
        config,
        (decodedText, decodedResult) => {
          // handleSuccess(decodedText, decodedResult);
        },
        undefined
      )
      .catch(() => {
        html5QrCode?.current?.stop();
      });
  };

  const handleStopScan = async () => {
    try {
      await html5QrCode?.current?.stop();
      console.log("stopped");
    } catch (error) {
      console.log("Stop error: ", error);
    }
  };

  const processScan2 = async () => {
    const cameraId = currentDevice?.id;
    if (!cameraId) return;

    const config = {
      fps: 10, // Optional, frame per seconds for qr code scanning
      qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
    };

    html5QrCode.current = new Html5QrcodeScanner("reader", config, false);
    html5QrCode.current.render(function onScanSuccess(
      decodedText,
      decodedResult
    ) {
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);
    });
  };

  const findDevices = async () => {
    const devices = await Html5Qrcode.getCameras();
    setDevices(devices);
    setCurrentDevice(devices[0]);
  };

  const handleChangeDevice = (e) => {
    const selectedId = e.target.value;
    const matchedItem =
      devices?.length && devices.find((it) => it.id === selectedId);
    setCurrentDevice(matchedItem);
  };

  useEffect(() => {
    findDevices();
  }, []);

  useEffect(() => {
    handleStopScan();
    processScan1();
    // processScan2();
  }, [currentDevice]);

  return (
    <>
      <div>
        <select name="" id="" onChange={handleChangeDevice}>
          {!!devices.length &&
            devices.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
        </select>
      </div>
      {/* <div
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
              width: "500px",
              height: "300px",
              // transform: "scaleX(-100%)",
              overflow: "hidden",
            }}
          ></div>
        </div>
      </div> */}

      <div>
        <button onClick={handleStopScan}>Stop scan</button>
      </div>
      <div style={{ position: "relative" }}>
        <div
          id={"reader"}
          style={{
            width: "500px",
            height: "300px",
            transform: "scaleX(-100%)",
            // overflow: "hidden",
          }}
        ></div>
      </div>
    </>
  );
}
