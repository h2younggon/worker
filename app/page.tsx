"use client";
import useWebWorker from "@/hooks/useWorker";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const { workerRef, postMessageToWorker, terminateWorker } = useWebWorker();
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();

  const handleOnChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFiles(Array.from(files));
    }
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postMessageToWorker({ action: "putObject", files: files });
    if (workerRef.current) {
      workerRef.current.onmessage = (e) => {
        if (e.data === "done") {
          console.log("done");
          terminateWorker();
        }
      };
    }
  };
  return (
    <main className={styles.main}>
      <Link href={"/goods"}>goods route</Link>
      <form onSubmit={handleOnSubmit}>
        {/* <input type="text" onChange={(e) => setTextx(e.target.value)} /> */}
        <input type="file" multiple onChange={handleOnChangeFiles} />
        <button type="submit">전송</button>
      </form>
    </main>
  );
}
