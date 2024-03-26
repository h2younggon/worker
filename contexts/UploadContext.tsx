"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface UploadContextType {
  progress: number;
  totalSize: number;
  handleFileUpload: (files: File[]) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }
  return context;
};

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<number>(0);
  const [totalSize, setTotalSize] = useState<number>(0);

  const handleFileUpload = (files: File[]) => {
    const worker = new Worker(new URL("/workers/worker.ts", import.meta.url));

    worker.postMessage({ files });

    worker.onmessage = (event) => {
      console.log(event.data);
      const { totalSize, progress } = event.data;
      setTotalSize(totalSize);
      setProgress(progress);
    };

    worker.onerror = (error) => {
      console.error("Error in worker:", error);
    };
  };

  const value: UploadContextType = {
    progress,
    totalSize,
    handleFileUpload,
  };

  return (
    <UploadContext.Provider value={value}>{children}</UploadContext.Provider>
  );
};
