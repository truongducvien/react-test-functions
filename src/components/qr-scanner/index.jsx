import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRScanner() {
  const [isScanActive, setIsScanActive] = useState(false);
  const handleOnScan = (result) => {
    console.log({ result });
  };

  return (
    <div>
      {/* <QrReader videoId="videoId" onResult={handleOnScan} /> */}
      <div
        className="scan-container"
        style={{ width: "350px", height: "300px" }}
      >
        <Scanner
          styles={{
            finderBorder: 0,
            container: {
              border: "5px solid",
            },
            video: {
              border: "5px solid red",
            },
          }}
          components={{
            finder: false,
          }}
          onScan={handleOnScan}
          onError={(err) => console.log({ err })}
          paused={!isScanActive}
          allowMultiple
        />
      </div>
      <video id="videoId" />
      <button onClick={() => setIsScanActive(!isScanActive)}>
        Toggle scan
      </button>
    </div>
  );
}
