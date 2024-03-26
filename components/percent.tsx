"use client";
import { useUploadContext } from "@/contexts/UploadContext";

function Percent() {
  const { totalSize, progress } = useUploadContext();
  console.log(totalSize, progress);
  return (
    <div style={{ position: "fixed", top: 0, right: 0, zIndex: 1000 }}>
      {0} / {totalSize} [{progress}%]
    </div>
  );
}

export default Percent;
