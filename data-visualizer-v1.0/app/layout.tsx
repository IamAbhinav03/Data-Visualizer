// app/layout.tsx
import "./global.css";
import { CsvProvider } from "./context/CsvContext";

export const metadata = {
  title: "Data Visualizer v1.0",
  description: "A simple 2d data plotter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CsvProvider>{children}</CsvProvider>
      </body>
    </html>
  );
}
