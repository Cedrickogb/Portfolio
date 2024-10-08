import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const monsserat = localFont({
  src: "./fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--font-monsserat",
  weight: "100 900",
});
const nunito = localFont({
  src: "./fonts/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
  variable: "--font-nunito",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Uppercase +",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/codicon.svg" />
      <link rel="icon" type="image/svg" sizes="16x16" href="/codicon.svg" />

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${monsserat.variable} ${nunito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
