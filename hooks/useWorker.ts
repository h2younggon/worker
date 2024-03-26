import { useEffect, useRef } from "react";

const useWebWorker = () => {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("/workers/worker.ts", import.meta.url)
    );
  }, []);

  const terminateWorker = () => {
    if (workerRef.current) workerRef.current.terminate();
  };

  const postMessageToWorker = (message: any) => {
    if (workerRef.current) workerRef.current.postMessage(message);
  };

  // 웹 워커를 반환
  return {
    workerRef,
    terminateWorker,
    postMessageToWorker,
  };
};

export default useWebWorker;
