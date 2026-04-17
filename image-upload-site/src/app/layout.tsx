import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clickvision · Imágenes de producto",
  description: "Portal privado para subir fotos de monturas a Firebase Storage y Firestore.",
  robots: { index: false, follow: false },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
