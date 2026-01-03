import "./globals.css";

export const metadata = {
  title: "Harish Jaisankar",
  description: "Backend & Systems Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
