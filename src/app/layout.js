import "./globals.css";

export const metadata = {
  title: "Main Page",
  description: "That is a main page.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
