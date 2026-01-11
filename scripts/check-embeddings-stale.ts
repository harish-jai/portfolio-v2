import { readdirSync, statSync, existsSync } from "fs";
import { join } from "path";

function getAllContentFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      getAllContentFiles(filePath, fileList);
    } else if (file.endsWith(".ts")) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

function getMaxMtime(filePaths: string[]): number {
  let maxMtime = 0;

  for (const filePath of filePaths) {
    try {
      const stat = statSync(filePath);
      if (stat.mtimeMs > maxMtime) {
        maxMtime = stat.mtimeMs;
      }
    } catch (error) {
      console.error(`Warning: Could not read ${filePath}`);
    }
  }

  return maxMtime;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toISOString();
}

function checkEmbeddingsStale(): void {
  const embeddingsPath = join(process.cwd(), "data", "embeddings.json");

  if (!existsSync(embeddingsPath)) {
    console.error(`Error: Embeddings file not found at ${embeddingsPath}`);
    process.exit(1);
  }

  const contentDir = join(process.cwd(), "content");
  const contentFiles = getAllContentFiles(contentDir);

  if (contentFiles.length === 0) {
    console.error("Error: No content files found in content directory");
    process.exit(1);
  }

  const contentMaxMtime = getMaxMtime(contentFiles);
  const embeddingsStat = statSync(embeddingsPath);
  const embeddingsMtime = embeddingsStat.mtimeMs;

  if (embeddingsMtime < contentMaxMtime) {
    const contentDate = formatDate(contentMaxMtime);
    const embeddingsDate = formatDate(embeddingsMtime);

    console.error(`Warning: Embeddings are stale.`);
    console.error(`  Last updated: ${embeddingsDate}`);
    console.error(`  Content changed: ${contentDate}`);
    console.error(`  Run: npm run generate:embeddings`);
    process.exit(1);
  }

  console.log(`Embeddings are up to date`);
  console.log(`  Last updated: ${formatDate(embeddingsMtime)}`);
  console.log(`  Content last changed: ${formatDate(contentMaxMtime)}`);
  process.exit(0);
}

checkEmbeddingsStale();
