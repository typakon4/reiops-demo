import "./globals.css";

const metadataBase = new URL(process.env.PUBLIC_WEB_URL || "http://localhost:3000");

export const metadata = {
  metadataBase,
  title: "ReiOps - Trusted Operations Layer for AI Agents",
  description:
    "ReiOps makes AI agents safe for businesses with vetted workflows, secure sandboxes, monitoring, approval gates, audit logs, and managed support.",
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/apple-touch-icon.png"
  },
  openGraph: {
    title: "ReiOps - Trusted Operations Layer for AI Agents",
    description:
      "Deploy vetted AI workflows in secure sandboxes with monitoring, approval gates, audit logs, and managed support.",
    images: ["/brand/reiops-mark.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "ReiOps - Trusted Operations Layer for AI Agents",
    description:
      "Deploy vetted AI workflows in secure sandboxes with monitoring, approval gates, audit logs, and managed support.",
    images: ["/brand/reiops-mark.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
