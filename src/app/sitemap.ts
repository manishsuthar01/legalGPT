import type { MetadataRoute } from "next";
import { contractsData } from "@/data/seo/contracts";
import { clausesData } from "@/data/seo/clauses";
import { glossaryData } from "@/data/seo/glossary";
import { getAbsoluteUrl } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Core static commercial & marketing pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: getAbsoluteUrl("/pricing"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/security"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl("/contracts"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/clauses"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/glossary"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/tools"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/terms"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: getAbsoluteUrl("/privacy"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: getAbsoluteUrl("/disclaimer"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Dynamic Contract Type Hub Pages
  const contractRoutes: MetadataRoute.Sitemap = contractsData.map((contract) => ({
    url: getAbsoluteUrl(`/contracts/${contract.slug}`),
    lastModified: new Date(contract.updatedAt || now),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Dynamic Clause Intelligence Pages
  const clauseRoutes: MetadataRoute.Sitemap = clausesData.map((clause) => ({
    url: getAbsoluteUrl(`/clauses/${clause.slug}`),
    lastModified: new Date(clause.updatedAt || now),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. Dynamic Legal Glossary Term Pages
  const glossaryRoutes: MetadataRoute.Sitemap = glossaryData.map((term) => ({
    url: getAbsoluteUrl(`/glossary/${term.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...contractRoutes,
    ...clauseRoutes,
    ...glossaryRoutes,
  ];
}
