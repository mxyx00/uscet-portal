import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "USC Equestrian",
  description: "USC Equestrian Team Member Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}