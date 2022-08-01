import { useEffect, useState } from "react";
import "./trending.css";
import TrendingPost from "./trendingPost";

function TrendingToday() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchAPI() {
      fetch("https://www.reddit.com/r/technews.json")
        .then((res) => {
          if (res.ok) return res.json();
          throw res;
        })
        .then((data) => {
          let raw_data = data.data.children;
          raw_data = raw_data.slice(0, 4);
          let arr = [];
          raw_data.map((item) => {
            let post = {};
            post.title = item.data.title;
            post.url = item.data.url_overridden_by_dest;
            post.sub_reddit = item.data.subreddit_name_prefixed;
            arr.push(post);
          });
          setPosts(arr);
        });
    }
    fetchAPI();
  }, []);

  return (
    <div className="trending-navbar">
      <div
        style={{ marginBottom: "1%", fontSize: "0.9rem", fontWeight: "500" }}
      >
        Trending today
      </div>
      {posts.length>0 ? <div className="trending-content">
        <span className="trending-post" style={{ marginLeft: "0%" }}>
          <TrendingPost post={posts[0]} />
        </span>
        <span className="trending-post">
          <TrendingPost post={posts[1]} />
        </span>
        <span className="trending-post">
          <TrendingPost post={posts[2]} />
        </span>
        <span className="trending-post" style={{ marginRight: "0%" }}>
          <TrendingPost post={posts[3]} />
        </span>
      </div>: null}
    </div>
  );
}

export default TrendingToday;
