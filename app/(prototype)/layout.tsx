import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "./prototype-globals.css";

export const metadata: Metadata = {
  title: "Frontend Overhaul Prototypes",
  robots: { index: false, follow: false },
};

export default function PrototypeRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
