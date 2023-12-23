import { LRUCache } from "lru-cache";
import { NextResponse } from "next/server";

type RateLimitOptions = {
    maxToken?: number;
    interval?: number;
    limit?: number;
};

export default function rateLimit(options?: RateLimitOptions) {
    const tokenCache = new LRUCache({
        max: options?.maxToken || 500,
        ttl: options?.interval || 60000,
    });

    const limit = options?.limit ?? 5;

    return {
        check: (token: string) =>
            new Promise<void>((resolve, reject) => {
                const tokenCount = (tokenCache.get(token) as number[]) || [0];

                if (tokenCount[0] === 0) {
                    tokenCache.set(token, tokenCount);
                }

                tokenCount[0]++;

                const currentUsage = tokenCount[0];
                const isRateLimited = currentUsage >= limit;

                return isRateLimited
                    ? reject(
                          new NextResponse(
                              JSON.stringify({
                                  error: "Rate limit exceeded",
                              }),
                              {
                                  headers: {
                                      "X-RateLimit-Limit": limit.toString(),
                                      "X-RateLimit-Remaining": (isRateLimited
                                          ? 0
                                          : limit - currentUsage
                                      ).toString(),
                                  },
                                  status: 429,
                              }
                          )
                      )
                    : resolve();
            }),
    };
}
