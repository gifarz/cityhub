import { Orbitron, Exo, Audiowide } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const exo = Exo({
  subsets: ["latin"],
  variable: "--font-exo",
});

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
});

export const metadata = {
  title: "CityHub",
  description: "Metro City Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${exo.variable} ${audiowide.variable}`}
      >
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
