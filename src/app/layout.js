import ClientLayout from "@/client-layout";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

export const metadata = {
  title: "Yulian Guinand | Portfolio",
  description: "Créé par Yulian Guinand",
  icons: {
    icon: "/site-logo.png",
    shortcut: "/site-logo.png",
    apple: "/site-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ViewTransitions>
          <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
