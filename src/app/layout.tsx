import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diego Hub — Centro de Investigaciones",
  description: "Dashboard personal de investigaciones y actualizaciones de Diego Sucrovich",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
