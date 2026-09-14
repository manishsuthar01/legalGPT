"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, BookOpen } from "lucide-react";
import { GlossaryTerm } from "@/lib/seo/types";

interface GlossarySearchFilterProps {
  terms: GlossaryTerm[];
}

export const GlossarySearchFilter: React.FC<GlossarySearchFilterProps> = ({ terms }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");

  // Get list of unique first letters present in terms
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    terms.forEach((t) => {
      const firstChar = t.term.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar);
      }
    });
    return Array.from(letters).sort();
  }, [terms]);

  // Filtered terms based on query and selected letter
  const filteredTerms = useMemo(() => {
    return terms.filter((item) => {
      const matchesLetter =
        selectedLetter === "ALL" ||
        item.term.toUpperCase().startsWith(selectedLetter);

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        item.term.toLowerCase().includes(query) ||
        item.simpleExplanation.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query);

      return matchesLetter && matchesQuery;
    });
  }, [terms, searchQuery, selectedLetter]);

  return (
    <div>
      {/* Search Input Bar */}
      <div className="max-w-xl mx-auto mb-8 relative">
        <div className="relative">
          <Search className="w-4 h-4 text-silver absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search legal terms (e.g. indemnification, liability, force majeure)..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-surface/80 border border-edge hover:border-[#333] focus:border-accent text-white placeholder-silver/60 text-sm outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-silver hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* A-Z Alphabet Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-12">
        <button
          onClick={() => setSelectedLetter("ALL")}
          className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
            selectedLetter === "ALL"
              ? "bg-accent text-white font-bold shadow-[0_0_15px_rgba(124,92,252,0.3)]"
              : "bg-surface/60 border border-edge text-silver hover:text-white hover:border-[#333]"
          }`}
        >
          All ({terms.length})
        </button>

        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
          const isAvailable = availableLetters.includes(letter);
          const isSelected = selectedLetter === letter;

          if (!isAvailable) {
            return (
              <span
                key={letter}
                className="w-7 h-7 flex items-center justify-center text-xs font-mono text-[#444] cursor-not-allowed select-none"
              >
                {letter}
              </span>
            );
          }

          return (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-7 h-7 rounded-lg text-xs font-mono transition-all flex items-center justify-center ${
                isSelected
                  ? "bg-accent text-white font-bold shadow-[0_0_15px_rgba(124,92,252,0.3)]"
                  : "bg-surface/60 border border-edge text-silver hover:text-white hover:border-[#333]"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between text-xs font-mono text-silver mb-6 px-1">
        <span>
          Showing <strong className="text-white">{filteredTerms.length}</strong> of{" "}
          {terms.length} legal terms
        </span>
        {(searchQuery || selectedLetter !== "ALL") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedLetter("ALL");
            }}
            className="text-accent hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Terms Grid */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {filteredTerms.map((item) => (
            <Link
              key={item.slug}
              href={`/glossary/${item.slug}`}
              className="group rounded-2xl bg-surface/60 border border-edge p-6 hover:border-accent/50 hover:bg-surface/90 transition-all flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors flex items-center justify-between">
                  <span>{item.term}</span>
                  <ArrowRight className="w-4 h-4 text-silver group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                </h2>
                <p className="text-accent text-xs font-medium mb-3">
                  &ldquo;{item.simpleExplanation}&rdquo;
                </p>
                <p className="text-silver text-xs line-clamp-2 leading-relaxed mb-4">
                  {item.definition}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-accent text-xs font-semibold group-hover:translate-x-1 transition-transform">
                <span>Read Full Definition &amp; Contract Example</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl bg-surface/30 border border-edge max-w-lg mx-auto mb-20">
          <BookOpen className="w-10 h-10 text-silver/40 mx-auto mb-3" />
          <h3 className="text-white font-bold text-lg mb-2">No matching legal terms</h3>
          <p className="text-silver text-xs max-w-xs mx-auto mb-6">
            We couldn&apos;t find any terms matching &quot;{searchQuery || selectedLetter}&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedLetter("ALL");
            }}
            className="px-4 py-2 rounded-xl bg-accent hover:bg-accent/90 text-white text-xs font-semibold transition-all"
          >
            Clear Search &amp; Filters
          </button>
        </div>
      )}
    </div>
  );
};
