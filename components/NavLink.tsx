"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function isActivePath(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
}

export function NavLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const active = isActivePath(pathname, href);

    return (
        <Link
            href={href}
            className={active ? "text-[var(--fg)]" : "hover:text-[var(--fg)]"}
            aria-current={active ? "page" : undefined}
        >
            {children}
        </Link>
    );
}
