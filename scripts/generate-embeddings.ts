import { config } from "dotenv";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import OpenAI from "openai";
import { getAllDocs } from "@/lib/docs/build";

config({ path: join(process.cwd(), ".env.local") });

interface EmbeddingIndex {
  version: string;
  model: string;
  dimension: number;
  generatedAt: string;
  embeddings: Record<string, number[]>;
}

async function generateEmbeddings(): Promise<void> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY environment variable is not set. Please set it in .env.local"
    );
  }

  const openai = new OpenAI({ apiKey });

  console.log("Loading documents...");
  const docs = getAllDocs();
  console.log(`Found ${docs.length} documents\n`);

  const embeddings: Record<string, number[]> = {};
  const model = "text-embedding-3-small";
  const expectedDimension = 1536;

  console.log(`Generating embeddings using ${model}...\n`);

  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    const progress = `[${i + 1}/${docs.length}]`;

    try {
      console.log(`${progress} Generating embedding for: ${doc.id} (${doc.type})`);

      const response = await openai.embeddings.create({
        model,
        input: doc.text,
      });

      const embedding = response.data[0].embedding;

      if (embedding.length !== expectedDimension) {
        throw new Error(
          `Unexpected embedding dimension: expected ${expectedDimension}, got ${embedding.length}`
        );
      }

      embeddings[doc.id] = embedding;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to generate embedding for doc "${doc.id}": ${error.message}`
        );
      }
      throw error;
    }
  }

  console.log(`\nGenerated ${Object.keys(embeddings).length} embeddings\n`);

  if (Object.keys(embeddings).length !== docs.length) {
    throw new Error(
      `Embedding count mismatch: expected ${docs.length}, got ${Object.keys(embeddings).length}`
    );
  }

  const index: EmbeddingIndex = {
    version: "1.0",
    model,
    dimension: expectedDimension,
    generatedAt: new Date().toISOString(),
    embeddings,
  };

  const dataDir = join(process.cwd(), "data");
  const outputPath = join(dataDir, "embeddings.json");

  try {
    mkdirSync(dataDir, { recursive: true });
  } catch (error) {
    if (error instanceof Error && (error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw new Error(`Failed to create data directory: ${error.message}`);
    }
  }

  console.log(`Writing embeddings to ${outputPath}...`);
  writeFileSync(outputPath, JSON.stringify(index, null, 2), "utf-8");
  console.log(`Embeddings saved successfully!\n`);

  console.log("Embedding generation complete!");
}

generateEmbeddings().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
