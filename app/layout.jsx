import Nav from "./auth/Nav";
import QueryWrapper from "./QueryWrapper";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "poster.",
  description: "tell us what's on your mind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`mx-4 md:mx-48 xl:mx-96 bg-gray-200`}>
        <QueryWrapper>
          <Nav /> {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
