import "./globals.css";

export const metadata = {
  title: "Broker AI Credit Assessor",
  description: "AI-powered illion analyser",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}