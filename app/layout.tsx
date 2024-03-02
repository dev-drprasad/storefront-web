import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/widgets/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  const { children } = props;

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto pt-16 px-6 flex-grow h-[calc(100%-6.4rem)]">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3"></footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
