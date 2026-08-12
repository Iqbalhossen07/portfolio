import { Merriweather } from "next/font/google";
import "./globals.css";
import WhatsAppSticky from "@/components/common/WhatsAppSticky";



const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata = {
  title: "Iqbal's Portfolio",
  description: "Next.js migrated portfolio",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${merriweather.variable} ${merriweather.className} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="min-h-full flex flex-col relative bg-[#050505] overflow-x-hidden text-white" suppressHydrationWarning>
        {children}
        <WhatsAppSticky />
      </body>
    </html>
  );
}
