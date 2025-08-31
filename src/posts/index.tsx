
import * as React from "react";
import NavBar, { type PostSort } from "./navbar";
import Card from "../card";
import { useEffect, useState } from "react";
import { redditApi, type RedditListing } from "../lib/api";
// import InfiniteScroll from "react-infinite-scroll-component";

function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [after, setAfter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<PostSort>("hot");

  useEffect(() => {
    // initial load
    fetchAPI();
  }, []);

  useEffect(() => {
    // when sort changes, reset and refetch first page
    setPosts([]);
    setAfter(null);
    fetchAPI();
  }, [sort]);

  async function fetchAPI(next?: boolean) {
    try {
      setLoading(true);
      setError(null);
  const data: RedditListing = await redditApi.getFrontpageListing({ sort, after: next ? after : null, count: posts.length });
      const raw_data = data.data.children;
  console.debug("Frontpage fetched:", { next: !!next, beforeCount: posts.length, received: raw_data.length, afterToken: data.data.after });
      const arr: any[] = next ? [...posts] : posts.length > 0 ? posts : [];
      raw_data.forEach((item: any) => {
        const post: any = {};
        post.title = item.data.title;
        post.id = item.data.id;
        post.saved = item.data.saved;
        post.subreddit = item.data.subreddit_name_prefixed;
        post.votes = item.data.ups;
        post.author = item.data.author;
        post.comments = item.data.num_comments;
  // permalink is unused in Card; keeping only global_link
        post.global_link = item.data.url;
        post.created_at = item.data.created_utc;
        post.subreddit_subscribers = item.data.subreddit_subscribers;
        post.links = item.data.link_flair_text;
        post.image = item.data.url_overridden_by_dest;
        post.desc = item.data.selftext;
        post.video = item.data.is_video
          ? {
              url: item.data.media?.reddit_video?.["fallback_url"],
              height: item.data.media?.reddit_video?.["height"],
              width: item.data.media?.reddit_video?.["width"],
            }
          : null;
        post.display_link = item.data.post_hint === 'link' ? item.data.url_overridden_by_dest : null;
        post.awardings = [];
        item.data.all_awardings?.forEach((award: any) => {
          const post_award: any = {};
          post_award.image = award.icon_url;
          post_award.name = award.name;
          post_award.description = award.description;
          post.awardings.push(post_award);
        });
        arr.push(post);
      });
      setPosts(arr);
      setAfter(data.data.after ?? null);
    } catch (e: any) {
      console.error("Failed to load frontpage posts", e);
      setError(e?.message || "Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col gap-4 w-full">
  <NavBar active={sort} onChange={setSort} />
  <div className="flex flex-col gap-4">
        {error && posts.length === 0 && (
          <div className="p-4 border rounded text-red-700 bg-red-50">
            {error}
          </div>
        )}
        {posts &&
          posts.map((post, idx) => (
            <Card
              key={`${post.id || idx}-${idx}`}
              title={post.title}
              saved={post.saved}
              subreddit={post.subreddit}
              votes={post.votes}
              author={post.author}
              comments={post.comments}
              global_link={post.global_link}
              created_at={post.created_at}
              image={post.image}
              desc={post.desc}
              video={post.video}
              display_link={post.display_link}
              awardings={post.awardings}
            />
          ))}
        <div className="flex justify-center py-4">
          {after ? (
            <button
              disabled={loading}
              onClick={() => fetchAPI(true)}
              className="px-4 py-2 rounded bg-pink-600 text-white disabled:opacity-50 hover:bg-pink-700"
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}

export default Posts;
