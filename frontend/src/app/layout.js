import { ViewTransitions } from "next-view-transitions";
import ClientLayout from "../client-layout";
import "./globals.css";

export const metadata = {
  title: "Yulian Guinand | Portfolio",
  description: "Portfolio de Yulian Guinand",
  icons: {
    icon: "./favicon.ico",
    shortcut: "./favicon.ico",
    apple: "./favicon.ico",
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
