import React, { useEffect, useState } from "react";
// import "./trending.css";
import TrendingPost from "./trendingPost";
import { redditApi, type PostPreview } from "../lib/api";

function TrendingToday() {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  useEffect(() => {
    const sr = process.env.REACT_APP_TRENDING_SUBREDDIT || "technews";
    redditApi
      .getTrendingPreviews(sr, 4)
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <div className="mb-6">
      <div className="mb-2 text-sm font-medium text-gray-900">
        Trending today in TechNews
      </div>
      {posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {posts.slice(0, 4).map((post, idx) => (
            <div key={idx}>
              <TrendingPost post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrendingToday;
