"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Doc } from "@/lib/docs/types";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

function getTypeLabel(type: Doc["type"]): string {
  const labels: Record<Doc["type"], string> = {
    profile: "Profile",
    experience: "Experience",
    project: "Project",
    course: "Course",
    writing: "Writing",
  };
  return labels[type] || type;
}

function getExcerpt(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength).trim() + "...";
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=10`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          throw new Error(errorData.error || `Rate limit exceeded. Please wait ${errorData.retryAfter || 60} seconds.`);
        }
        throw new Error(errorData.error || `Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, performSearch]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setError(null);
      setSelectedIndex(-1);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        return;
      }

      if (e.key === "Enter" && selectedIndex >= 0 && results[selectedIndex]) {
        e.preventDefault();
        const selectedResult = results[selectedIndex];
        window.location.href = selectedResult.url;
        onClose();
        return;
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open, results, selectedIndex, onClose]);

  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-[var(--bg)] border border-[var(--muted)]/20 rounded-lg w-full max-w-2xl max-h-[70vh] flex flex-col"
        style={{
          boxShadow: `0 0 0 1px rgba(var(--glow-color), 0.1), 0 0 40px rgba(var(--glow-color), 0.15), 0 0 80px rgba(var(--glow-color), 0.1), 0 4px 6px -1px rgb(0 0 0 / 0.1)`,
        }}
      >
        <div className="p-4 border-b border-[var(--muted)]/20">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent text-[var(--fg)] placeholder:text-[var(--muted)] outline-none text-base"
            autoFocus
          />
        </div>

        <div className="overflow-y-auto flex-1">
          {loading && (
            <div className="p-8 text-center text-[var(--muted)]">
              Searching...
            </div>
          )}

          {error && (
            <div className="p-8 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!loading && !error && query.trim() && results.length === 0 && (
            <div className="p-8 text-center text-[var(--muted)]">
              No results found
            </div>
          )}

          {!loading && !error && results.length > 0 && (
            <div ref={resultsRef} className="divide-y divide-[var(--muted)]/20">
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  href={result.url}
                  onClick={onClose}
                  className={`block p-4 hover:bg-[var(--muted)]/10 transition-colors ${index === selectedIndex ? "bg-[var(--muted)]/10" : ""
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs px-2 py-1 rounded bg-[var(--muted)]/20 text-[var(--muted)] flex-shrink-0">
                      {getTypeLabel(result.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-[var(--fg)]">
                        {result.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {getExcerpt(result.text)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && !error && !query.trim() && (
            <div className="p-8 text-center text-[var(--muted)]">
              Start typing to search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
