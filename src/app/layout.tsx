// // src/app/layout.tsx

import Navbar from "@/components/layouts/Navbar";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Footer from "@/components/layouts/Footer";


export const metadata = {
  title: "Edu Smart",
  description: "One Step Solutions to all you Papers",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar/>
          {children}
          <Footer/>
          </Providers> 
      </body>
    </html>
  );
}
