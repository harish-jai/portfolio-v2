export interface WritingItem {
    id: string;
    slug: string;
    title: string;
    date: string; // ISO format: "2024-01-15"
    excerpt: string;
    content: string; // make sure its markdown compatible
    tags?: string[];
}

import { samplePost } from "./posts/hello-world";

export const writings: WritingItem[] = [
    samplePost,
    // add more posts here
];

export function getWritingBySlug(slug: string): WritingItem | undefined {
    return writings.find((writing) => writing.slug === slug);
}

export function getAllWritings(): WritingItem[] {
    return [...writings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
