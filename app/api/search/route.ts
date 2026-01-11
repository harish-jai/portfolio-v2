import { NextRequest, NextResponse } from "next/server";
import { getAllDocs } from "@/lib/docs/build";
import { hybridSearch } from "@/lib/docs/search";
import { loadEmbeddingIndex } from "@/lib/docs/semantic";
import {
  rateLimit,
  validateQuery,
  getClientIdentifier,
} from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  try {
    const clientId = getClientIdentifier(request);
    const rateLimitResult = rateLimit(clientId);

    if (!rateLimitResult.success) {
      const retryAfterSeconds = Math.ceil(
        (rateLimitResult.resetAt - Date.now()) / 1000
      );
      const retryAfterMinutes = Math.ceil(retryAfterSeconds / 60);

      return NextResponse.json(
        {
          error: `Rate limit exceeded. Please wait ${retryAfterSeconds} second${retryAfterSeconds !== 1 ? "s" : ""} (${retryAfterMinutes} minute${retryAfterMinutes !== 1 ? "s" : ""}) before trying again.`,
          retryAfter: retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.resetAt.toString(),
            "Retry-After": retryAfterSeconds.toString(),
          },
        }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const limitParam = searchParams.get("limit");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    const queryValidation = validateQuery(query);
    if (!queryValidation.valid) {
      return NextResponse.json(
        { error: queryValidation.error },
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
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": "10",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetAt.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Error in search API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
