import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { Layout } from "../components";
import "./globals.css";
import { StateContext } from "../context/StateContext";

// Specify the weights you want to use
const roboto = Roboto({
  // variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100","300", "400", "500", "700", "900"],  // Declare the weights you want
});

export const metadata: Metadata = {
  title: "DEON Stores",
  description: "Your one-stop online shop",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Add any other metadata like icon links here */}
      </head>
      <body
        className="antialiased" style={{ fontFamily: roboto.style.fontFamily }} // Apply the font variable
      >
        <StateContext>
          <Layout>
            <Toaster />
            {children}
          </Layout>
        </StateContext>
      </body>
    </html>
  );
}
