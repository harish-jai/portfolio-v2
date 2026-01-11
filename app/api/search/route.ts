import { NextRequest, NextResponse } from "next/server";
import { getAllDocs } from "@/lib/docs/build";
import { hybridSearch } from "@/lib/docs/search";
import { loadEmbeddingIndex } from "@/lib/docs/semantic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const limitParam = searchParams.get("limit");

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    const limit = limitParam ? parseInt(limitParam, 10) : 10;

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Limit must be a number between 1 and 100" },
        { status: 400 }
      );
    }

    const docs = getAllDocs();

    const index = loadEmbeddingIndex();
    const apiKey = process.env.OPENAI_API_KEY;
    const canUseHybrid = index !== null && apiKey !== undefined;

    const results = await hybridSearch(query.trim(), docs, { limit });

    const method = canUseHybrid ? "hybrid" : "keyword-only";

    return NextResponse.json(
      {
        results,
        method,
        count: results.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in search API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
