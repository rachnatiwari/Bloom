import * as React from "react";
import subredditIcon from "../images/subreddit_icon.png";
import { redditApi, type RedditListing } from "../lib/api";

type SubredditItem = {
  name: string; // display_name_prefixed (e.g., r/reactjs)
  icon: string; // icon_img
  description: string; // public_description (truncated in UI)
  url: string; // https://www.reddit.com + url
};

function truncate(text: string, max = 120) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max - 3) + "..." : text;
}

function TopCommunities() {
  const [subs, setSubs] = React.useState<SubredditItem[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchAPI() {
      try {
        setError(null);
        const data: RedditListing = await redditApi.getPopularSubreddits(5);
        const raw = data.data.children || [];
        const arr: SubredditItem[] = raw.slice(0, 5).map((item: any) => ({
          name: item.data.display_name_prefixed,
          icon: item.data.icon_img,
          description: item.data.public_description || "",
          url: "https://www.reddit.com" + item.data.url,
        }));
        setSubs(arr);
      } catch (e: any) {
        console.error("Failed to load popular subreddits", e);
        setError(e?.message || "Failed to load subreddits.");
      }
    }
    fetchAPI();
  }, []);

  return (
    <section className="rounded-lg bg-accent p-4 flex flex-col gap-3 shadow mt-4">
      <div className="text-base font-semibold">Today's Popular Subreddits</div>
      {error && subs.length === 0 && (
        <div className="p-3 text-sm text-red-700 bg-red-50 border rounded">{error}</div>
      )}
      <div className="flex flex-col gap-3">
        {subs.map((sr, idx) => (
          <div key={idx} className="flex items-start gap-3 bg-background rounded p-3 shadow-sm">
            <img
              src={sr.icon || subredditIcon}
              alt={`${sr.name} icon`}
              className="w-10 h-10 rounded-full object-cover border flex-shrink-0"
            />
            <div className="min-w-0">
              <a href={sr.url} className="block text-sm font-semibold hover:underline">
                {sr.name}
              </a>
              <div className="text-xs text-gray-600 break-words">{truncate(sr.description, 140)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <a
          href="/subreddits/popular"
          rel="noopener noreferrer"
          className="text-sm text-pink-600 hover:underline font-medium"
        >
          See more
        </a>
      </div>
    </section>
  );
}

export default TopCommunities;
