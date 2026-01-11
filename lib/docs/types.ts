export type DocType = "profile" | "experience" | "project" | "course" | "writing";

export interface Doc {
    id: string;
    type: DocType;
    title: string;
    url: string; // deep link like /experience#capital-one
    text: string; // plain text for search / embeddings
    tags?: string[];
    date?: string;
    meta?: Record<string, string>; // company, school, stack, etc.
}

