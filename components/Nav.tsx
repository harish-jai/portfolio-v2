import { navLinks } from "@/lib/site";
import { NavLink } from "./NavLink";
import { SearchButton } from "./SearchButton";

export function Nav() {
  return (
    <header className="mx-auto max-w-3xl px-6 pt-10">
      <div className="flex items-baseline justify-between">
        <nav className="flex space-x-8 text-sm text-[var(--muted)]">
          {navLinks.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <SearchButton />
      </div>
    </header>
  );
}