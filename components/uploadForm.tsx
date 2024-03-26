"use client";
import { useUploadContext } from "@/contexts/UploadContext";
import useUploadWorker from "@/hooks/useUploadWorker";
import React, { ChangeEvent, FormEvent, useState } from "react";

export default function UploadForm() {
  const { handleFileUpload } = useUploadContext();
  const [files, setFiles] = useState<File[]>([]);
  const handleOnChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFiles(Array.from(files));
    }
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFileUpload(files);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        {/* <input type="text" onChange={(e) => setTextx(e.target.value)} /> */}
        <input type="file" multiple onChange={handleOnChangeFiles} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
