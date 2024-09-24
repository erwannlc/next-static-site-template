import type { Metadata } from "next";
import { Inter, Lora, Raleway } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});
const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

/** default create next app Fonts */
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

export const metadata: Metadata = {
  title: "Rennes radiateurs",
  description:
    "Service de réparation de radiateurs pour véhicules indutriels et particuliers, à Cesson-Sévigné",
  robots: "noindex",
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/shortcut-icon.png",
    // apple: "/apple-icon.png",
    // other: {
    //   rel: "apple-touch-icon-precomposed",
    //   url: "/apple-touch-icon-precomposed.png",
    // },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body
        className={`${inter.className} ${lora.variable} ${raleway.variable}`}
      >
        <div className="app">
          Header
          <main className="main">{children}</main>
          Footer
        </div>
      </body>
    </html>
  );
}
