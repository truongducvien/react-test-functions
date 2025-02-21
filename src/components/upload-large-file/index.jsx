import axios from "axios";
import { useState } from "react";

const ENDPOINT = "http://localhost:3005/api";
const CHUNK_SIZE = 1 * 1024 * 1024; // 1Mb

export default function UploadLargeFile() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState([]);
  const [loadingPercent, setLoadingPercent] = useState(0);

  const handleInputChange = (e) => {
    const fileList = e.target.files;
    setFile(fileList[0]);
  };

  const handleUploadChunk = async ({
    chunk,
    chunkIndex,
    totalChunks,
    fileId,
    fileName,
  }) => {
    try {
      const fd = new FormData();
      fd.append("fileName", fileName);
      fd.append("chunk", chunk);
      fd.append("fileId", fileId);
      fd.append("totalChunks", totalChunks);
      fd.append("chunkIndex", chunkIndex);

      const result = await axios.post(`${ENDPOINT}/upload-chunks`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return result?.data;
    } catch (error) {
      console.log("Error in handleUploadChunk: ", chunkIndex, " - ", error);
      return null;
    }
  };

  const handleUpLoad = async () => {
    if (!file) return;
    setIsLoading(true);

    const fileSize = file.size;

    // Split file into chunks:
    const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);

    for (let i = 0; i < totalChunks; i++) {
      // Slice the file and pick the exact chunk to upload:
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      await handleUploadChunk({
        chunk,
        chunkIndex: i,
        totalChunks,
        fileId: null,
        fileName: file.name,
      });
      setLoadingPercent(Math.round(((i + 1) / totalChunks) * 100));
    }
    setIsLoading(false);
  };

  const handleDownload = async () => {
    try {
      window.open(`${ENDPOINT}/download?name=${file[0].name}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2>Upload large file</h2>
      <hr />

      <input
        type="file"
        name=""
        id=""
        multiple={false}
        onChange={handleInputChange}
      />
      <button onClick={handleUpLoad}>
        <span>{isLoading ? "Uploading ... " : "Upload"}</span>
        <span>{!!isLoading && `${loadingPercent}%`}</span>
      </button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

/**
 * Server implementation for upload large file:
 */

// ======= Controller:
// export const uploadChunksController = (req, res, next) => {
//   const form = formidable();
//   form.parse(req, (err, fields, files) => {
//     if (!fields) next();
//     const [fileName] = fields.fileName;
//     const [chunkIndex] = fields.chunkIndex;
//     const [fileId] = fields.fileId;
//     const [totalChunks] = fields.totalChunks;

//     // Check and create a directory for chunk if does not exist:
//     if (!fs.existsSync(chunksDirPath)) {
//       fs.mkdirSync(chunksDirPath);
//     }

//     // Write chunks to the directory:
//     const { filepath, newFilename } = files.chunk[0];
//     const buffer = fs.readFileSync(filepath);
//     const chunkPath = `${chunksDirPath}/chunks-${chunkIndex || 0}`;
//     fs.writeFileSync(chunkPath, buffer);

//     // Merge chunks when all chunks are fully uploaded:
//     if (Number(chunkIndex) + 1 < Number(totalChunks)) {
//       res.status(200).json({
//         status: "in-progress",
//         fileId: fileId?.length ? fileId : uuid(),
//       });
//     } else {
//       mergeChunks(chunksDirPath, mergedChunksDirPath, totalChunks, fileName);
//       res.status(200).json({
//         status: "done",
//         fileId: fileId?.length ? fileId : uuid(),
//       });
//     }
//   });
// };

// ======= Helper:
// const mergeChunks = (
//   chunksDirPath,
//   mergedChunksDirPath,
//   totalChunks,
//   fileName
// ) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!fs.existsSync(mergedChunksDirPath)) {
//         fs.mkdirSync(mergedChunksDirPath);
//       }

//       const writableStream = fs.createWriteStream(
//         `${mergedChunksDirPath}/${fileName}`
//       );

//       for (let i = 0; i < totalChunks; i++) {
//         const path = `${chunksDirPath}/chunks-${i}`;
//         const buffer = fs.readFileSync(path);
//         writableStream.write(buffer);
//         // Remove chunk
//         fs.rmSync(path);
//       }
//       writableStream.end();
//       resolve(true);
//     } catch (error) {
//       console.log("error:::: ", error);
//       reject(error);
//     }
//   });
// };
