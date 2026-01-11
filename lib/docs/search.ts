import { Doc } from "./types";
import {
    loadEmbeddingIndex,
    embedQuery,
    cosineSimilarity,
} from "./semantic";

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
            const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const textMatches = (text.match(new RegExp(escapedTerm, "g")) || []).length;
            score += textMatches;

            const titleMatches = (title.match(new RegExp(escapedTerm, "g")) || []).length;
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

function normalizeScores(scores: number[]): number[] {
    const max = Math.max(...scores, 1);

    if (max === 0) {
        return scores.map(() => 0);
    }

    return scores.map((score) => score / max);
}

function getKeywordScore(doc: Doc, queryTerms: string[]): number {
    const text = doc.text.toLowerCase();
    const title = doc.title.toLowerCase();
    let score = 0;

    for (const term of queryTerms) {
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const textMatches = (text.match(new RegExp(escapedTerm, "g")) || []).length;
        score += textMatches;

        const titleMatches = (title.match(new RegExp(escapedTerm, "g")) || []).length;
        score += titleMatches * 2;

        if (doc.tags) {
            const tagMatches = doc.tags.filter((tag) =>
                tag.toLowerCase().includes(term)
            ).length;
            score += tagMatches * 1.5;
        }
    }

    return score;
}

export async function hybridSearch(
    query: string,
    docs: Doc[],
    options?: {
        limit?: number;
        semanticWeight?: number;
        keywordWeight?: number;
    }
): Promise<Doc[]> {
    const limit = options?.limit ?? 10;
    const semanticWeight = options?.semanticWeight ?? 0.7;
    const keywordWeight = options?.keywordWeight ?? 0.3;

    if (!query || query.trim().length === 0) {
        return docs.slice(0, limit);
    }

    const index = loadEmbeddingIndex();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!index || !apiKey) {
        return keywordSearch(query, docs).slice(0, limit);
    }

    const queryEmbedding = await embedQuery(query);

    if (!queryEmbedding) {
        return keywordSearch(query, docs).slice(0, limit);
    }

    const queryTerms = query
        .toLowerCase()
        .split(/\s+/)
        .filter((term) => term.length > 0);

    const semanticScores: number[] = [];
    const keywordScores: number[] = [];

    for (const doc of docs) {
        const docEmbedding = index.embeddings[doc.id];

        if (docEmbedding && docEmbedding.length === queryEmbedding.length) {
            try {
                const similarity = cosineSimilarity(queryEmbedding, docEmbedding);
                semanticScores.push(similarity);
            } catch (error) {
                semanticScores.push(0);
            }
        } else {
            semanticScores.push(0);
        }

        keywordScores.push(getKeywordScore(doc, queryTerms));
    }

    const normalizedSemantic = semanticScores.map((score) =>
        Math.max(0, (score + 1) / 2)
    );
    const normalizedKeyword = normalizeScores(keywordScores);

    const scoredDocs = docs.map((doc, i) => ({
        doc,
        score: semanticWeight * normalizedSemantic[i] + keywordWeight * normalizedKeyword[i],
    }));

    return scoredDocs
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((item) => item.doc);
}

