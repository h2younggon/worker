import { useEffect, useRef } from "react";

const useWebWorker = () => {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(new URL("../worker.ts", import.meta.url));

    // 컴포넌트가 언마운트될 때 웹 워커 종료
    // return () => {
    //   if (workerRef.current) {
    //     workerRef.current.terminate();
    //   }
    // };
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
