import { useState } from "react";

export default function VideoCapture() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [frames, setFrames] = useState([]);

  const handleChangeVideo = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const videoEle = document.createElement("video");
      videoEle.src = fileReader.result;
      videoEle.width = 500;
      videoEle.height = 200;
      videoEle.play();

      const container = document.querySelector("#video-area");
      container.append(videoEle);

      setVideoUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleCapture = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const videoEl = document.querySelector("video");

    canvas.width = 500;
    canvas.height = 200;
    ctx.drawImage(videoEl, 0, 0, 500, 200);

    const imgUrl = canvas.toDataURL();
    setFrames([...frames, imgUrl]);
    console.log({ imgUrl });
  };

  return (
    <div>
      Video capture <hr />
      <input
        type="file"
        name=""
        id=""
        accept=".mkv, .mp4"
        onChange={handleChangeVideo}
      />
      <div id="video-area"></div>
      <button onClick={handleCapture}>Capture</button> <br />
      <div>
        {!!frames?.length &&
          frames.map((item, i) => (
            <img key={i} src={item} width={300} height={200} />
          ))}
      </div>
    </div>
  );
}
