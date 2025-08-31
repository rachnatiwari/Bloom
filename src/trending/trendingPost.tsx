import React from "react";
import trendingBg from "../images/trending.png";

type Props = {
  post: { title: string; url: string; sub_reddit: string };
};

function TrendingPost({ post }: Props) {
  const trimmed = post.title.length > 81 ? post.title.substring(0, 81) + "..." : post.title;
  const subreddit_link = `https://www.reddit.com/${post.sub_reddit}`;
  return (
    <div
      className="relative h-44 rounded-xl overflow-hidden text-white"
      style={{ backgroundImage: `url(${trendingBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/0" />
      <div className="absolute inset-x-2 bottom-9">
        <a href={post.url} className="block text-sm font-medium leading-snug hover:underline">
          {trimmed}
        </a>
      </div>
      <div className="absolute left-3 bottom-2">
        <a href={subreddit_link} className="text-xs hover:underline">
          {post.sub_reddit}
        </a>
      </div>
    </div>
  );
}

export default TrendingPost;
