import "./globals.css";

export const metadata = {
  title: "React Test Lab",
  description: "Auth + Todo + Responsive + Testing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
