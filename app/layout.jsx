import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "./(Navbar)/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  title: {
    template: "%s | BookHub",
    default: "BookHub",
  },
  description:
    "Una semplice web app per lo scambio di libri per l'Istituto Ivan Piana di Lovere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="min-w-[350px]">{children}</div>
            <Toaster position="top-right" richColors />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
