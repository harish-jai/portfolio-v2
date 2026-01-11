"use client";

export function SearchButton() {
  return (
    <button
      className="text-sm text-[var(--muted)] hover:text-[var(--fg)]"
      type="button"
      onClick={() => alert("Search coming soon")}
    >
      Search
    </button>
  );
}
