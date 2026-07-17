import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
// import Script from "next/script";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Dynamic English School",
  description: "Official Website of Dynamic English School",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
          
    {/* <Script
  src="https://sahay-ai-alpha.vercel.app/chatBot.js"
  data-owner-id="usr_127186549698724610"
  strategy="afterInteractive"
/> */}
        {children}
      </body>
    </html>
  );
}