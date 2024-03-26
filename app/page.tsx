"use client";
import UploadForm from "@/components/uploadForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <UploadForm />
    </main>
  );
}
