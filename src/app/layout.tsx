import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { createMetadata } from "@/lib/seo/metadata";
import {
  JsonLd,
  getOrganizationSchema,
  getSoftwareApplicationSchema,
} from "@/lib/seo/json-ld";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans", // Maps to the custom var we added in globals.css
});

export const metadata: Metadata = createMetadata({
  title: "", // Uses siteConfig.defaultTitle
  description: "", // Uses siteConfig.defaultDescription
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <JsonLd schema={getOrganizationSchema()} />
        <JsonLd schema={getSoftwareApplicationSchema()} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

