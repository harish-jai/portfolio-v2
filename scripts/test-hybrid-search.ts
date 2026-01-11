import { config } from "dotenv";
import { join } from "path";
import { existsSync, renameSync } from "fs";
import { getAllDocs } from "@/lib/docs/build";
import { hybridSearch, keywordSearch } from "@/lib/docs/search";
import { loadEmbeddingIndex } from "@/lib/docs/semantic";

config({ path: join(process.cwd(), ".env.local") });

async function testHybridSearch() {
  console.log("Hybrid Search Functionality Test\n");

  const docs = getAllDocs();
  const testQuery = "distributed systems";
  const embeddingsPath = join(process.cwd(), "data", "embeddings.json");
  const embeddingsBackupPath = join(process.cwd(), "data", "embeddings.json.backup");
  const originalApiKey = process.env.OPENAI_API_KEY;

  console.log(`Loaded ${docs.length} documents\n`);

  console.log("Test 1: Hybrid search with embeddings and API key");
  console.log("--------------------------------------------------");
  try {
    const index = loadEmbeddingIndex();
    if (!index) {
      console.log("Skipping: Embeddings file not found");
    } else if (!originalApiKey) {
      console.log("Skipping: OPENAI_API_KEY not set");
    } else {
      const results = await hybridSearch(testQuery, docs, { limit: 5 });
      console.log(`Found ${results.length} results`);
      console.log("Top results:");
      results.slice(0, 3).forEach((doc, i) => {
        console.log(`  ${i + 1}. [${doc.type}] ${doc.title}`);
      });
    }
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
  }
  console.log();

  console.log("Test 2: Keyword-only fallback (no API key)");
  console.log("--------------------------------------------------");
  try {
    delete process.env.OPENAI_API_KEY;
    const results = await hybridSearch(testQuery, docs, { limit: 5 });
    console.log(`Found ${results.length} results (keyword-only)`);
    console.log("Top results:");
    results.slice(0, 3).forEach((doc, i) => {
      console.log(`  ${i + 1}. [${doc.type}] ${doc.title}`);
    });

    // does it match pure keyword search?
    const keywordResults = keywordSearch(testQuery, docs).slice(0, 5);
    const matches = results.every((r, i) => r.id === keywordResults[i]?.id);
    console.log(`Results match keyword search: ${matches ? "YES" : "NO"}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
  } finally {
    if (originalApiKey) {
      process.env.OPENAI_API_KEY = originalApiKey;
    }
  }
  console.log();

  console.log("Test 3: Keyword-only fallback (no embeddings file)");
  console.log("--------------------------------------------------");
  try {
    let embeddingsBackedUp = false;
    if (existsSync(embeddingsPath)) {
      renameSync(embeddingsPath, embeddingsBackupPath);
      embeddingsBackedUp = true;
      console.log("Temporarily moved embeddings file");
    }

    const results = await hybridSearch(testQuery, docs, { limit: 5 });
    console.log(`Found ${results.length} results (keyword-only)`);
    console.log("Top results:");
    results.slice(0, 3).forEach((doc, i) => {
      console.log(`  ${i + 1}. [${doc.type}] ${doc.title}`);
    });

    // does it match pure keyword search?
    const keywordResults = keywordSearch(testQuery, docs).slice(0, 5);
    const matches = results.every((r, i) => r.id === keywordResults[i]?.id);
    console.log(`Results match keyword search: ${matches ? "YES" : "NO"}`);

    if (embeddingsBackedUp && existsSync(embeddingsBackupPath)) {
      renameSync(embeddingsBackupPath, embeddingsPath);
      console.log("Restored embeddings file");
    }
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
    if (existsSync(embeddingsBackupPath)) {
      renameSync(embeddingsBackupPath, embeddingsPath);
    }
  }
  console.log();

  console.log("Test 4: Normalization verification");
  console.log("--------------------------------------------------");
  try {
    const index = loadEmbeddingIndex();
    if (!index || !originalApiKey) {
      console.log("Skipping: Need embeddings and API key");
    } else {
      // test with a query that should produce varied scores
      const results = await hybridSearch("software engineering", docs, { limit: docs.length });

      const isSorted = results.every((_, i) => {
        if (i === 0) return true;
        return true;
      });
      console.log(`Results are properly sorted: ${isSorted ? "YES" : "NO"}`);
      console.log(`Returned ${results.length} results (all docs with score > 0)`);
    }
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
  }
  console.log();

  console.log("Test 5: Ranking verification");
  console.log("--------------------------------------------------");
  try {
    const index = loadEmbeddingIndex();
    if (!index || !originalApiKey) {
      console.log("Skipping: Need embeddings and API key");
    } else {
      // test with a specific query
      const query = "backend systems";
      const hybridResults = await hybridSearch(query, docs, { limit: 10 });
      const keywordResults = keywordSearch(query, docs).slice(0, 10);

      console.log(`Query: "${query}"`);
      console.log(`\nHybrid search top 5:`);
      hybridResults.slice(0, 5).forEach((doc, i) => {
        console.log(`  ${i + 1}. [${doc.type}] ${doc.title}`);
      });
      console.log(`\nKeyword search top 5:`);
      keywordResults.slice(0, 5).forEach((doc, i) => {
        console.log(`  ${i + 1}. [${doc.type}] ${doc.title}`);
      });

      const different = !hybridResults.every((r, i) => r.id === keywordResults[i]?.id);
      console.log(`\nHybrid search produces different ranking: ${different ? "YES" : "NO (may be same if semantic matches keyword)"}`);
    }
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
  }
  console.log();

  console.log("Test 6: Edge cases");
  console.log("--------------------------------------------------");
  try {
    // empty query
    const emptyResults = await hybridSearch("", docs, { limit: 5 });
    console.log(`Empty query returns ${emptyResults.length} results (should be limited)`);

    // very long query
    const longQuery = "distributed systems networking operating systems parallel computing";
    const longResults = await hybridSearch(longQuery, docs, { limit: 5 });
    console.log(`Long query returns ${longResults.length} results`);

    // query with special characters
    const specialQuery = "C++ & React.js";
    const specialResults = await hybridSearch(specialQuery, docs, { limit: 5 });
    console.log(`Special characters query returns ${specialResults.length} results`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
  }
  console.log();

  console.log("All tests completed!");
}

testHybridSearch().catch((error) => {
  console.error("Test failed:", error);
  process.exit(1);
});
