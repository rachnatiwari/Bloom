// import "./subreddit.css";
import * as React from "react";
import Card from "../card";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NavBar, { type PostSort } from "../posts/navbar";
import CommentCard from "../comment-card";
import { redditApi, type RedditListing } from "../lib/api";

type PostsProps = { subreddit: string; username?: string };

function Posts(props: PostsProps) {
  let [posts, setPosts] = useState<any[]>([]);
  const [after, setAfter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<PostSort>("hot");

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    // reset when sort changes
    setPosts([]);
    setAfter(null);
    fetchAPI();
  }, [sort]);

  async function fetchAPI(next?: boolean) {
    try {
      setLoading(true);
      setError(null);
  const data: RedditListing = await redditApi.getSubredditListing(props.subreddit, { sort, after: next ? after : null, count: posts.length });
      const raw_data = data.data.children;
  console.debug("Subreddit fetched:", { sr: props.subreddit, next: !!next, beforeCount: posts.length, received: raw_data.length, afterToken: data.data.after });
      const arr: any[] = next ? [...posts] : posts.length > 0 ? posts : [];

      raw_data.forEach((item: any) => {
        const post: any = {};
        post.kind = item.kind;
        post.title = item.data.title;
        post.id = item.data.id;
        post.saved = item.data.saved;
        post.subreddit = item.data.subreddit_name_prefixed;
        post.votes = item.data.ups;
        post.author = item.data.author;
        post.comments = item.data.num_comments;
        post.global_link = item.data.url;
        post.created_at = item.data.created_utc;
        post.links = item.data.link_flair_text;
        post.image = item.data.url_overridden_by_dest;
        post.desc = item.data.selftext;
        post.post_commented_on = item.data.link_title;
        post.body = item.data.body;
        post.video = item.data.is_video
          ? {
              url: item.data.media?.reddit_video?.["fallback_url"],
              height: item.data.media?.reddit_video?.["height"],
              width: item.data.media?.reddit_video?.["width"],
            }
          : null;
        post.display_link =
          item.data.post_hint === "link" || item.data.post_hint === undefined
            ? item.data.url_overridden_by_dest
            : null;
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
      console.error("Failed to load subreddit posts", e);
      setError(e?.message || "Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function fetchMoreData() {
    if (!loading && after) fetchAPI(true);
  }

  return (
    <div className="posts">
  <NavBar active={sort} onChange={setSort} />
      {error && posts.length === 0 && (
        <div className="p-4 border rounded text-red-700 bg-red-50 my-2">{error}</div>
      )}
      {/* <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        // refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
      > */}
      {/* {console.log('inside infinite scroll - '+posts.length)} */}
  {posts &&
    posts.map((post, idx) => {
          return post.kind === "t3" ? (
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
              subreddit_page={true}
            />
          ) : (
            <CommentCard
              key={`${post.id || idx}-c-${idx}`}
              subreddit={post.subreddit}
              author={post.author}
              votes={post.votes}
              created_at={post.created_at}
              post_commented_on={post.post_commented_on}
              username={props.username ?? ""}
              body={post.body}
            />
          );
        })}
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
      {/* </InfiniteScroll> */}
    </div>
  );
}

export default Posts;
