// Centralized API utilities for Reddit endpoints

export const REDDIT_BASE_URL = "https://www.reddit.com" as const;
const isLocalhost = typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)/.test(window.location.hostname);

// Simple in-memory cache and in-flight deduplication
type CacheEntry = { expiry: number; data: any };
const responseCache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<any>>();

const DEFAULT_TTL_MS = 60 * 1000; // 1 minute for listings
const LONG_TTL_MS = 10 * 60 * 1000; // 10 minutes for about/trophies

function ttlForPath(path: string): number {
  return /\/about\.json$|\/trophies\.json$/.test(path) ? LONG_TTL_MS : DEFAULT_TTL_MS;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function doFetchJson(url: string, init?: RequestInit) {
  const res = await fetch(url, { headers: { Accept: "application/json" }, ...init });
  return res;
}

export async function getJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${REDDIT_BASE_URL}${path}`;
  const cacheKey = `GET ${path}`; // key by path to keep proxy/direct interchangeable
  const now = Date.now();
  const ttl = ttlForPath(path);

  // Serve from cache if fresh
  const cached = responseCache.get(cacheKey);
  if (cached && cached.expiry > now) {
    return cached.data as T;
  }

  // Deduplicate concurrent requests
  const inprog = inflight.get(cacheKey);
  if (inprog) {
    return (await inprog) as T;
  }

  const task = (async () => {
    const maxRetries = 3;
    let attempt = 0;
    let lastError: unknown = null;

    while (attempt <= maxRetries) {
      try {
  const res = await doFetchJson(url, init);
        if (res.ok) {
          const json = (await res.json()) as T;
          responseCache.set(cacheKey, { expiry: Date.now() + ttl, data: json });
          return json;
        }

        // Handle 429/5xx with backoff and optionally try proxy
        const status = res.status;
        const text = await res.text().catch(() => "");
  if (status === 429 || (status >= 500 && status < 600)) {
          // honor Retry-After if present
          const retryAfter = Number(res.headers.get("Retry-After")) || 0;
          const backoff = retryAfter > 0 ? retryAfter * 1000 : Math.min(2000, 400 * Math.pow(2, attempt));
          attempt += 1;
          if (attempt > maxRetries) {
            throw new Error(`Request failed ${status}: ${text || res.statusText}`);
          }
          await sleep(backoff);
          continue;
        }

        // Non-retryable error
        throw new Error(`Request failed ${status}: ${text || res.statusText}`);
      } catch (err) {
        lastError = err;
        attempt += 1;
        if (attempt > maxRetries) break;
        // small backoff before final retry
        await sleep(Math.min(1500, 300 * Math.pow(2, attempt)));
      }
    }
    throw lastError ?? new Error("Unknown request error");
  })();

  inflight.set(cacheKey, task);
  try {
    const result = await task;
    return result as T;
  } finally {
    inflight.delete(cacheKey);
  }
}

// Minimal Reddit listing types (partial)
export interface RedditChild<T = any> { data: T }
export interface RedditListing<T = any> { data: { children: Array<RedditChild<T>>; after?: string | null; before?: string | null } }

export type PostPreview = {
  title: string;
  url: string;
  sub_reddit: string;
};

export const redditApi = {
  // Fetch a subreddit listing (hot by default)
  getSubredditListing(
    subreddit: string,
  opts?: { limit?: number; sort?: "hot" | "new" | "top" | "rising"; t?: "hour" | "day" | "week" | "month" | "year" | "all"; after?: string | null; count?: number }
  ) {
    const params = new URLSearchParams();
    if (opts?.limit) params.set("limit", String(opts.limit));
    if (opts?.t) params.set("t", opts.t);
    if (typeof opts?.count === "number") params.set("count", String(opts.count));
  if (opts?.after) params.set("after", opts.after);
    const sort = opts?.sort ?? "hot";
    const qs = params.toString();
    const path = `/r/${subreddit}/${sort}.json${qs ? `?${qs}` : ""}`;
    return getJSON<RedditListing>(path);
  },

  // Fetch the frontpage listing (e.g., /hot.json)
  getFrontpageListing(
  opts?: { limit?: number; sort?: "hot" | "new" | "top" | "rising"; t?: "hour" | "day" | "week" | "month" | "year" | "all"; after?: string | null; count?: number }
  ) {
    const params = new URLSearchParams();
    if (opts?.limit) params.set("limit", String(opts.limit));
    if (opts?.t) params.set("t", opts.t);
  if (typeof opts?.count === "number") params.set("count", String(opts.count));
  if (opts?.after) params.set("after", opts.after);
    const sort = opts?.sort ?? "hot";
    const qs = params.toString();
  const path = `/r/popular/${sort}.json${qs ? `?${qs}` : ""}`;
    return getJSON<RedditListing>(path);
  },

  // Popular subreddits (supports simple pagination via `after`)
  getPopularSubreddits(limitOrOpts: number | { limit?: number; after?: string | null } = 5) {
    const params = new URLSearchParams();
    if (typeof limitOrOpts === "number") {
      if (limitOrOpts) params.set("limit", String(limitOrOpts));
    } else {
      if (limitOrOpts.limit) params.set("limit", String(limitOrOpts.limit));
      if (limitOrOpts.after) params.set("after", String(limitOrOpts.after));
    }
    const qs = params.toString();
    return getJSON<RedditListing>(`/subreddits/popular.json${qs ? `?${qs}` : ""}`);
  },

  // User listing (mixed posts/comments)
  getUserListing(
    username: string,
  opts?: { limit?: number; sort?: "hot" | "new" | "top" | "rising"; t?: "hour" | "day" | "week" | "month" | "year" | "all"; after?: string | null; count?: number }
  ) {
    const params = new URLSearchParams();
    if (opts?.limit) params.set("limit", String(opts.limit));
    if (opts?.t) params.set("t", opts.t);
  if (typeof opts?.count === "number") params.set("count", String(opts.count));
  if (opts?.after) params.set("after", opts.after);
    // Reddit's /user/{name}.json doesn't fully support sort in path; keep params for parity
    const qs = params.toString();
    return getJSON<RedditListing>(`/user/${username}.json${qs ? `?${qs}` : ""}`);
  },

  // Convenience mapper for trending previews
  async getTrendingPreviews(subreddit: string, limit = 4): Promise<PostPreview[]> {
  // Use top posts endpoint explicitly
  const listing = await this.getSubredditListing(subreddit, { sort: "top", limit });
    const children = listing?.data?.children ?? [];
    return children.slice(0, limit).map((item) => {
      const d: any = item.data || {};
      return {
        title: d.title ?? "",
        url: d.url_overridden_by_dest ?? d.url ?? "#",
        sub_reddit: d.subreddit_name_prefixed ?? "",
      } as PostPreview;
    });
  },

  getSubredditAbout(subreddit: string) {
    return getJSON<any>(`/r/${subreddit}/about.json`);
  },

  getUserAbout(username: string) {
    return getJSON<any>(`/user/${username}/about.json`);
  },

  getUserTrophies(username: string) {
    return getJSON<any>(`/user/${username}/trophies.json`);
  },
};
