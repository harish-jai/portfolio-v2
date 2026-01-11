import { config } from "dotenv";
import { join } from "path";
import { existsSync, renameSync } from "fs";
import { getAllDocs } from "@/lib/docs/build";
import { hybridSearch } from "@/lib/docs/search";

config({ path: join(process.cwd(), ".env.local") });

async function testDegradation() {
  console.log("Testing Graceful Degradation\n");
  console.log("=".repeat(50));

  const docs = getAllDocs();
  const testQuery = "distributed systems";
  const embeddingsPath = join(process.cwd(), "data", "embeddings.json");
  const embeddingsBackupPath = join(process.cwd(), "data", "embeddings.json.backup");
  const originalApiKey = process.env.OPENAI_API_KEY;

  console.log(`\n1. Testing WITHOUT API KEY`);
  console.log("--------------------------------------------------");
  try {
    delete process.env.OPENAI_API_KEY;
    const results = await hybridSearch(testQuery, docs, { limit: 5 });
    console.log(`Search works without API key`);
    console.log(`  Found ${results.length} results`);
    console.log(`  Top result: ${results[0]?.title || "N/A"}`);
    console.log(`  Method: keyword-only (expected)`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
  } finally {
    if (originalApiKey) {
      process.env.OPENAI_API_KEY = originalApiKey;
    }
  }

  console.log(`\n2. Testing WITHOUT EMBEDDINGS FILE`);
  console.log("--------------------------------------------------");
  try {
    let embeddingsBackedUp = false;
    if (existsSync(embeddingsPath)) {
      renameSync(embeddingsPath, embeddingsBackupPath);
      embeddingsBackedUp = true;
      console.log("  Temporarily moved embeddings file");
    }

    const results = await hybridSearch(testQuery, docs, { limit: 5 });
    console.log(`Search works without embeddings file`);
    console.log(`  Found ${results.length} results`);
    console.log(`  Top result: ${results[0]?.title || "N/A"}`);
    console.log(`  Method: keyword-only (expected)`);

    if (embeddingsBackedUp && existsSync(embeddingsBackupPath)) {
      renameSync(embeddingsBackupPath, embeddingsPath);
      console.log("  Restored embeddings file");
    }
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
    if (existsSync(embeddingsBackupPath)) {
      renameSync(embeddingsBackupPath, embeddingsPath);
    }
  }

  console.log(`\n3. Testing WITHOUT BOTH (API KEY and EMBEDDINGS)`);
  console.log("--------------------------------------------------");
  try {
    delete process.env.OPENAI_API_KEY;
    let embeddingsBackedUp = false;
    if (existsSync(embeddingsPath)) {
      renameSync(embeddingsPath, embeddingsBackupPath);
      embeddingsBackedUp = true;
      console.log("  Temporarily moved embeddings file");
    }

    const results = await hybridSearch(testQuery, docs, { limit: 5 });
    console.log(`Search works without both API key and embeddings`);
    console.log(`  Found ${results.length} results`);
    console.log(`  Top result: ${results[0]?.title || "N/A"}`);
    console.log(`  Method: keyword-only (expected)`);

    if (embeddingsBackedUp && existsSync(embeddingsBackupPath)) {
      renameSync(embeddingsBackupPath, embeddingsPath);
      console.log("  Restored embeddings file");
    }
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
    if (existsSync(embeddingsBackupPath)) {
      renameSync(embeddingsBackupPath, embeddingsPath);
    }
  } finally {
    if (originalApiKey) {
      process.env.OPENAI_API_KEY = originalApiKey;
    }
  }

  console.log(`\n4. Testing API ENDPOINT (without API key)`);
  console.log("--------------------------------------------------");
  try {
    delete process.env.OPENAI_API_KEY;
    const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(testQuery)}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`API endpoint works without API key`);
      console.log(`  Method: ${data.method} (should be "keyword-only")`);
      console.log(`  Results: ${data.count}`);
    } else {
      console.error(`API returned error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`Note: Make sure dev server is running (npm run dev)`);
    console.log(`   Error: ${error instanceof Error ? error.message : error}`);
  } finally {
    if (originalApiKey) {
      process.env.OPENAI_API_KEY = originalApiKey;
    }
  }

  console.log(`\n${"=".repeat(50)}\n`);
  console.log("All degradation tests completed!");
  console.log("\nSummary:");
  console.log("  - Search should work in all scenarios");
  console.log("  - Should fall back to keyword-only when needed");
  console.log("  - Should never crash or throw errors");
}

testDegradation().catch((error) => {
  console.error("Test failed:", error);
  process.exit(1);
});
