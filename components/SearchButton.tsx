"use client";

import { useState, useEffect } from "react";
import { SearchDialog } from "./SearchDialog";

export function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <button
        className="text-sm text-[var(--muted)] hover:text-[var(--fg)]"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Search
      </button>
      <SearchDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
