import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Bazar Dor",
  description: "Daily essential product prices at a glance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}

        <Footer />

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: "13px",
            },
            success: {
              duration: 3000,
            },
            error: {
              duration: 4000,
            },
          }}
        />
      </body>
    </html>
  );
}