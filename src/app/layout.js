import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const noto_serif = Noto_Serif({ subsets: ["latin"] });

export const metadata = {
  title: "Gonzalo Pelenur",
  description: "A personal webpage by Gonzalo Pelenur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel='icon' href='/favicon.ico' />
      </head>
      <body className={noto_serif.className}>{children}</body>
    </html>
  );
}
