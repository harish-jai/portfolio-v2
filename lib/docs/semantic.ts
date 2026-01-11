import { readFileSync } from "fs";
import { join } from "path";
import OpenAI from "openai";
import { Doc } from "./types";

export interface EmbeddingIndex {
  version: string;
  model: string;
  dimension: number;
  generatedAt: string;
  embeddings: Record<string, number[]>;
}

let cachedIndex: EmbeddingIndex | null = null;

export function loadEmbeddingIndex(): EmbeddingIndex | null {
  if (cachedIndex) {
    return cachedIndex;
  }

  try {
    const embeddingsPath = join(process.cwd(), "data", "embeddings.json");
    const fileContent = readFileSync(embeddingsPath, "utf-8");
    const index = JSON.parse(fileContent) as EmbeddingIndex;

    if (
      !index.version ||
      !index.model ||
      !index.dimension ||
      !index.embeddings ||
      typeof index.embeddings !== "object"
    ) {
      console.warn("Invalid embeddings file structure");
      return null;
    }

    cachedIndex = index;
    return cachedIndex;
  } catch (error) {
    // graceful degradation so prevent crash
    return null;
  }
}

export async function embedQuery(text: string): Promise<number[] | null> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  try {
    const openai = new OpenAI({ apiKey });
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    return null;
  }
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(
      `Vectors must have the same length: ${a.length} vs ${b.length}`
    );
  }

  let dotProduct = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
  }

  let magnitudeA = 0;
  let magnitudeB = 0;
  for (let i = 0; i < a.length; i++) {
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB); // cosine similarity
}

export function cosineSearch(
  queryEmbedding: number[],
  index: EmbeddingIndex,
  docs: Doc[],
  limit: number = 10
): Doc[] {
  const scoredDocs: Array<{ doc: Doc; score: number }> = [];

  for (const doc of docs) {
    const docEmbedding = index.embeddings[doc.id];

    if (!docEmbedding) {
      continue;
    }

    if (docEmbedding.length !== queryEmbedding.length) {
      continue;
    }

    try {
      const similarity = cosineSimilarity(queryEmbedding, docEmbedding);
      scoredDocs.push({ doc, score: similarity });
    } catch (error) {
      continue;
    }
  }

  // descending order by similarity and return top N
  return scoredDocs
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.doc);
}
