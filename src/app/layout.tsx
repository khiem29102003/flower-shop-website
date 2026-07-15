import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import './globals.css';
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { NotificationProvider } from "@/components/Notification";
import Navbar from "@/components/Navbar";
import AppInitializer from "@/components/AppInitializer";

export const metadata: Metadata = {
  title: "BELOVED BLOOM - Premium Flower Shop",
  description: "Dự án website bán hoa tươi - BELOVED BLOOM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>BELOVED BLOOM</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppInitializer>
          <NotificationProvider>
            <CartProvider>
              <CheckoutProvider>
                <Navbar />
                <main className="container my-4">{children}</main>
              </CheckoutProvider>
            </CartProvider>
          </NotificationProvider>
        </AppInitializer>
      </body>
    </html>
  );
}