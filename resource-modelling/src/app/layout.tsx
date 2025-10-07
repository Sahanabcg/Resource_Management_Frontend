import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Resource Modelling Analytics",
  description: "Landing page for RM analytics tool",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">{children}</body>
    </html>
  );
}
