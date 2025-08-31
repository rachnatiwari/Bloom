import * as React from "react";
import NavBar from "../navbar/index";
import { redditApi, type RedditListing } from "../lib/api";
import subredditIcon from "../images/subreddit_icon.png";
import * as Tooltip from "@radix-ui/react-tooltip";

type Community = {
  id: string;
  name: string; // r/reactjs
  title: string;
  icon: string;
  subscribers: number;
  description: string;
  url: string; // /r/reactjs/
};

function formatNumber(n: number) {
  try {
    return new Intl.NumberFormat().format(n || 0);
  } catch {
    return String(n ?? 0);
  }
}

function formatCompact(n: number) {
  try {
    return new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }).format(n || 0);
  } catch {
    return formatNumber(n);
  }
}

function usePopularCommunities(initialLimit = 25) {
  const [items, setItems] = React.useState<Community[]>([]);
  const [after, setAfter] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async (reset = false) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const opts = reset
        ? { limit: initialLimit, after: null as string | null }
        : { limit: initialLimit, after };
      const listing: RedditListing = await redditApi.getPopularSubreddits(opts);
      const next = listing?.data?.children ?? [];
      const mapped: Community[] = next.map((c: any) => {
        const d = c.data || {};
        return {
          id: d.id,
          name: d.display_name_prefixed,
          title: d.title || d.display_name_prefixed,
          icon: d.community_icon || d.icon_img || "",
          subscribers: d.subscribers || 0,
          description: d.public_description || "",
          url: d.url || `/r/${d.display_name}/`,
        } as Community;
      });
      setItems((prev) => (reset ? mapped : [...prev, ...mapped]));
      setAfter(listing?.data?.after ?? null);
    } catch (e: any) {
      setError(e?.message || "Failed to load communities.");
    } finally {
      setLoading(false);
    }
  }, [after, initialLimit, loading]);

  React.useEffect(() => {
    document.title = "Popular Communities";
    // initial load
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { items, after, loading, error, load };
}

export default function PopularSubredditsPage() {
  const { items, after, loading, error, load } = usePopularCommunities(25);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="w-full max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-4">Popular Communities</h1>
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 border rounded">{error}</div>
        )}
        <Tooltip.Provider delayDuration={150} skipDelayDuration={200}>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((c) => (
              <HoverableCommunityItem key={c.id} community={c} />
            ))}
          </ul>
        </Tooltip.Provider>
        <div className="mt-6 flex justify-center">
          {after ? (
            <button
              className="rounded bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-50"
              disabled={loading}
              onClick={() => load(false)}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          ) : (
            <div className="text-sm text-gray-500">{loading ? "Loading..." : "No more communities"}</div>
          )}
        </div>
      </main>
    </div>
  );
}

type HoverableProps = { community: Community };

function HoverableCommunityItem({ community: c }: HoverableProps) {
  const [open, setOpen] = React.useState(false);
  const [about, setAbout] = React.useState<any | null>(null);
  const [aboutError, setAboutError] = React.useState<string | null>(null);
  const fetchedRef = React.useRef(false);

  const subredditName = React.useMemo(() => {
    // c.name is like "r/reactjs"; c.url is like "/r/reactjs/"
    if (c.name?.startsWith("r/")) return c.name.slice(2);
    const m = c.url?.match(/\/r\/([^/]+)/);
    return m ? m[1] : "";
  }, [c.name, c.url]);

  React.useEffect(() => {
    if (open && !fetchedRef.current && subredditName) {
      fetchedRef.current = true;
      redditApi
        .getSubredditAbout(subredditName)
        .then((data) => {
          setAbout(data?.data ?? null);
        })
        .catch((e: any) => setAboutError(e?.message || "Failed to load"));
    }
  }, [open, subredditName]);

  const online = about?.active_user_count ?? about?.accounts_active ?? null;
  const subscribers = about?.subscribers ?? c.subscribers;
  const description = about?.public_description || c.description || "";

  return (
    <Tooltip.Root open={open} onOpenChange={setOpen}>
      <Tooltip.Trigger asChild>
        <li
          className="h-full flex items-start gap-3 bg-accent rounded p-3 cursor-pointer"
          tabIndex={0}
        >
          <img
            src={c.icon || subredditIcon}
            alt={`${c.name} icon`}
            className="w-12 h-12 rounded-full object-cover border flex-shrink-0 bg-white"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = subredditIcon as any;
            }}
          />
          <div className="min-w-0 flex-1">
            <a href={`https://www.reddit.com${c.url}`} className="text-sm font-semibold hover:underline">
              {c.name}
            </a>
            <div className="text-xs text-gray-600">{c.title}</div>
            <div className="text-xs text-gray-500 mt-1">{formatNumber(c.subscribers)} subscribers</div>
          </div>
          <div className="flex items-center gap-2">
            <a
              className="text-sm text-pink-600 hover:underline"
              href={`https://www.reddit.com${c.url}`}
            >
              View
            </a>
          </div>
        </li>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="right" align="start" sideOffset={8} className="z-50">
          <div className="w-80 rounded-xl bg-[#111215] text-white shadow-xl border border-black/30 p-4">
            <div className="flex items-start gap-3">
              <img
                src={c.icon || subredditIcon}
                alt={`${c.name} icon`}
                className="w-10 h-10 rounded-full object-cover border bg-white"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = subredditIcon as any;
                }}
              />
              <div>
                <div className="font-semibold">{c.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div>
                <div className="text-lg font-semibold">{formatCompact(subscribers || 0)}</div>
                <div className="text-xs text-gray-400">Members</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-300 line-clamp-3">{description}</p>
            {aboutError && (
              <div className="mt-2 text-xs text-red-400">{aboutError}</div>
            )}
            <a
              href={`${c.url}`}
              className="mt-4 block text-center w-full rounded-full bg-[#2f6df6] hover:bg-[#1f5ae3] transition-colors px-4 py-2 text-sm font-medium"
            >
              View Community
            </a>
          </div>
          <Tooltip.Arrow className="fill-black" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
