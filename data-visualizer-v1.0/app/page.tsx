// app/page.tsx
"use client";

import UploadCSV from "./components/UploadCSV";

export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <h1 className="neon-text">Data Visualizer v1.0</h1>
        <UploadCSV />
      </div>
    </main>
  );
}
