import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/pricing",
          "/security",
          "/about",
          "/contact",
          "/terms",
          "/privacy",
          "/disclaimer",
          "/contracts",
          "/contracts/",
          "/clauses",
          "/clauses/",
          "/glossary",
          "/glossary/",
          "/tools",
          "/tools/",
          "/jurisdictions",
          "/jurisdictions/",
          "/compare",
          "/compare/",
          "/blog",
          "/blog/",
        ],
        disallow: [
          "/api/",
          "/app/",
          "/contracts/*/*", // Disallows nested private dynamic analysis sessions if not routed cleanly
          "/admin/",
          "/login/",
          "/signup/",
          "/settings/",
        ],
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
