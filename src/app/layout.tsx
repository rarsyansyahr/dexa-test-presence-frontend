import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/id";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");

export const metadata: Metadata = {
  title: "Presence App",
  description: "WFH Presence App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen w-full bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
