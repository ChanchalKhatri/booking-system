import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthProvider } from "./context/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Restaurant",
  description: "Restaurant Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="wrapper flex flex-col h-screen justify-between">
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}