import "./globals.css";
import { Nav } from "@/components/Nav";

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
      <body suppressHydrationWarning>
        <Nav />
        <main className="mx-auto max-w-3xl px-6 py-14">{children}</main>
        <footer className="mx-auto max-w-3xl px-6 pb-14 text-sm text-[var(--muted)]">
          <div className="pt-6">
            Go Blue!
          </div>
        </footer>
      </body>
    </html>
  );
}
