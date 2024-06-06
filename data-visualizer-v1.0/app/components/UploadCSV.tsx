// app/components/UploadCSV.tsx
"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useCsv } from "../context/CsvContext";
import * as d3 from "d3";
import styles from "./UploadCSV.module.css";

const UploadCSV: React.FC = () => {
  const { setData } = useCsv();
  const router = useRouter();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.type === "text/csv") {
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result as string;
          const parsedData = d3.csvParse(text, (d) => ({
            x: +d.x!,
            y: +d.y!,
          }));
          setData(parsedData);
          router.push("/graph");
        };
        reader.readAsText(file);
      } else {
        alert("Please upload a valid CSV file");
      }
    },
    [router, setData]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
  });

  return (
    <div
      {...getRootProps()}
      className={styles.dropzone}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 1 }}
    >
      <input {...getInputProps()} />
      <p>Drag & drop a CSV file here, or click to select one</p>
      <button>Upload</button>
    </div>
  );
};

export default UploadCSV;
