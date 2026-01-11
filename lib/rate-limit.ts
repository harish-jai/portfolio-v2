interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const store: RateLimitStore = {};

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute per IP
const MAX_QUERY_LENGTH = 500; // Maximum query length

export function rateLimit(identifier: string): {
  success: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const key = identifier;

  if (!store[key] || now > store[key].resetAt) {
    store[key] = {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    };
    return {
      success: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetAt: store[key].resetAt,
    };
  }

  if (store[key].count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      success: false,
      remaining: 0,
      resetAt: store[key].resetAt,
    };
  }

  store[key].count += 1;
  return {
    success: true,
    remaining: MAX_REQUESTS_PER_WINDOW - store[key].count,
    resetAt: store[key].resetAt,
  };
}

export function validateQuery(query: string): {
  valid: boolean;
  error?: string;
} {
  if (!query || typeof query !== "string") {
    return { valid: false, error: "Query must be a non-empty string" };
  }

  if (query.trim().length === 0) {
    return { valid: false, error: "Query cannot be empty" };
  }

  if (query.length > MAX_QUERY_LENGTH) {
    return {
      valid: false,
      error: `Query too long (max ${MAX_QUERY_LENGTH} characters)`,
    };
  }

  return { valid: true };
}

export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";
  return ip;
}
