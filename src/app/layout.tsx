"use client";
import { SessionProvider } from "next-auth/react";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <ToastContainer />
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
