import heic2any from "heic2any";
import JSZip from "jszip";
import { useState } from "react";

const TARGET_EXTENSION = "jpeg";
const TARGET_MIME = "image/jpeg";
const TARGET_ZIP = "images.zip";

export default function HeicToJpeg() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(0);

  const handleInputChange = (e) => {
    const fileList = e.target.files;
    if (fileList?.length) {
      const list = [];
      Array.from(fileList).forEach((item) => {
        list.push(item);
      });
      setImages(list);
    }
  };

  const convertHEICToJPEG = async (file) => {
    try {
      const result = await heic2any({
        blob: file,
        toType: TARGET_MIME,
        // quality: 0.1,
      });
      return { name: file.name, blob: result };
    } catch (error) {
      console.log(error);
    }
  };

  const changeExtension = (fileName) => {
    const lastDotIndex = fileName.lastIndexOf(".");
    const nameWithoutExtension = fileName.substring(0, lastDotIndex);
    return `${nameWithoutExtension}.${TARGET_EXTENSION}`;
  };

  const handleDownload = (url, name) => {
    const aEl = document.createElement("a");
    aEl.href = url;
    aEl.download = name;
    aEl.click();
  };

  const zipImages = async (convertedFiles) => {
    const jsZip = new JSZip();
    convertedFiles.forEach((item) =>
      jsZip.file(changeExtension(item.name), item.blob, { base64: true })
    );
    const result = await jsZip.generateAsync({ type: "blob" });
    return result;
  };

  const handleConvert = async () => {
    setIsLoading(true);
    try {
      // Track the progress:
      const fileList = Array.from(images);
      const result = [];
      for (const image of fileList) {
        setCount((prev) => prev + 1);
        const resolvedImg = await convertHEICToJPEG(image);
        result.push(resolvedImg);
      }

      if (!result?.length) return;
      const zippedFile = await zipImages(result);
      const url = URL.createObjectURL(zippedFile);
      handleDownload(url, TARGET_ZIP);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
      setImages([]);
      setCount(0);
    }
  };

  return (
    <div>
      <p className="text-[20px] font-bold">HEIC to JPEG</p>

      <div className="flex flex-col gap-3">
        <input
          id="file-input"
          type="file"
          accept="image/heic"
          multiple
          onChange={handleInputChange}
        />

        <div className="border border-dashed p-1 min-h-6">
          {!!images?.length &&
            images.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>{(item.size / 1024 / 1024).toFixed(2)}MB</span>
              </div>
            ))}
        </div>
      </div>
      <button
        disabled={isLoading}
        onClick={handleConvert}
        className="mt-1"
        style={{
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? `Converting ...${count}/${images.length}` : "Convert"}
      </button>
    </div>
  );
}
