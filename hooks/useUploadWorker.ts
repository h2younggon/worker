"use client";
import { useState } from "react";

const useUploadWorker = () => {
  const [progress, setProgress] = useState<number>(0);
  const [totalSize, setTotalSize] = useState<number>(0);

  const handleFileUpload = (files: File[]) => {
    const worker = new Worker(new URL("/workers/worker.ts", import.meta.url));

    worker.postMessage({ files });

    worker.onmessage = (event) => {
      const { totalSize, progress } = event.data;
      setTotalSize(totalSize);
      setProgress(progress);
    };

    worker.onerror = (error) => {
      console.error("Error in worker:", error);
    };
  };

  return { progress, totalSize, handleFileUpload };
};

export default useUploadWorker;
