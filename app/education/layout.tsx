"use client";

import { useEffect } from "react";

export default function EducationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        document.documentElement.classList.add("education-page");
        return () => {
            document.documentElement.classList.remove("education-page");
        };
    }, []);

    return <>{children}</>;
}

