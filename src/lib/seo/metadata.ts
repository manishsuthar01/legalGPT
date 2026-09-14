import type { Metadata } from "next";
import { siteConfig } from "./config";
import { SeoPageMeta } from "./types";

/**
 * Normalizes a route path to ensure it starts with a leading slash
 * and strips any trailing slash (except for the root path).
 */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  let clean = path.startsWith("/") ? path : `/${path}`;
  if (clean.endsWith("/") && clean.length > 1) {
    clean = clean.slice(0, -1);
  }
  return clean;
}

/**
 * Returns an absolute URL based on the configured site URL.
 */
export function getAbsoluteUrl(path = ""): string {
  const normalized = normalizePath(path);
  return `${siteConfig.siteUrl}${normalized}`;
}

/**
 * Centralized Next.js Metadata Generator for LegalGPT.
 * Generates comprehensive metadata including OpenGraph, Twitter cards,
 * canonical URLs, and crawler robots directives.
 */
export function createMetadata(meta: SeoPageMeta): Metadata {
  const absoluteUrl = getAbsoluteUrl(meta.path);
  const title = meta.title ? `${meta.title} | ${siteConfig.siteName}` : siteConfig.defaultTitle;
  const description = meta.description || siteConfig.defaultDescription;
  const ogImage = meta.ogImage
    ? meta.ogImage.startsWith("http")
      ? meta.ogImage
      : `${siteConfig.siteUrl}${meta.ogImage}`
    : `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`;

  const isNoIndex = Boolean(meta.noindex);

  return {
    title,
    description,
    keywords: meta.keywords || (siteConfig.keywords as unknown as string[]),
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    metadataBase: new URL(siteConfig.siteUrl),
    icons: {
      icon: "/logo/legalGPT_logo.png",
      apple: "/logo/legalGPT_logo.png",
    },
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      type: meta.type || "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${meta.title || siteConfig.siteName} — AI Contract Intelligence`,
        },
      ],
      ...(meta.type === "article" && meta.publishedAt
        ? {
            publishedTime: meta.publishedAt,
            modifiedTime: meta.updatedAt || meta.publishedAt,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      images: [ogImage],
    },
    robots: {
      index: !isNoIndex,
      follow: !isNoIndex,
      googleBot: {
        index: !isNoIndex,
        follow: !isNoIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
