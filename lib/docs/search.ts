import { Doc } from "./types";

// keyword search with term frequency scoring and title boost
export function keywordSearch(query: string, docs: Doc[]): Doc[] {
    if (!query || query.trim().length === 0) {
        return docs;
    }

    const queryTerms = query
        .toLowerCase()
        .split(/\s+/)
        .filter((term) => term.length > 0);

    if (queryTerms.length === 0) {
        return docs;
    }

    const scoredDocs = docs.map((doc) => {
        const text = doc.text.toLowerCase();
        const title = doc.title.toLowerCase();
        let score = 0;

        for (const term of queryTerms) {
            // count occurrences in text
            const textMatches = (text.match(new RegExp(term, "g")) || []).length;
            score += textMatches;

            // boost title matches (2x weight)
            const titleMatches = (title.match(new RegExp(term, "g")) || []).length;
            score += titleMatches * 2;

            if (doc.tags) {
                const tagMatches = doc.tags.filter((tag) =>
                    tag.toLowerCase().includes(term)
                ).length;
                score += tagMatches * 1.5;
            }
        }

        return { doc, score };
    });

    return scoredDocs
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.doc);
}

