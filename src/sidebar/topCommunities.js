import "./sidebar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TopCommunities() {
  const [community, setCommunity] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      fetch("https://www.reddit.com/subreddits/popular.json?limit=5")
        .then((res) => {
          if (res.ok) return res.json();
          throw res;
        })
        .then((data) => {
          let raw_data = data.data.children;
          let arr = [];
          raw_data.map((item) => {
            let post = {};
            post.title = item.data.display_name_prefixed;
            post.icon_img = item.data.icon_img;
            post.sub_reddit = item.data.subreddit_name_prefixed;
            post.url = 'https://www.reddit.com'+item.data.url
            arr.push(post);
          });
          setCommunity(arr);
        });
    }
    fetchAPI();
  }, []);

  return (
    <div className="sidebar-box top-community">
      <div className="header">
        <span>Today's Popular Communities</span>
      </div>
      {community &&
        community.map((subreddit,index) => {
          return (
            <div className="community-card">
              <a href={subreddit.url} >
              <span className="sr-no">{index+1}</span>
              <span className="arrow">^</span>
              <span>
                <img
                  src={subreddit.icon_img? subreddit.icon_img: require("../images/subreddit_icon.png")}
                  alt="Community Icon"
                  style={{ maxWidth: "10%"}}
                  className="community-icon"
                />
              </span>
              {subreddit.title}
              </a>
              <button className="join-community">Join</button>
            </div>
          );
        })}
      <a href="https://www.reddit.com/subreddits/popular">
        <button
          style={{ backgroundColor: "rgb(48,122,204)", marginTop: "5%" }}
          className="sidebar-button"
        >
          View All
        </button>
      </a>
      <div className="other-tags">
        <a href="https://www.reddit.com/subreddits/leaderboard/">Top</a>
        <a href="https://www.reddit.com/subreddits/leaderboard/near-you/">
          Near You
        </a>
        <a href="https://www.reddit.com/subreddits/leaderboard/gaming/">
          Gaming
        </a>
        <a href="https://www.reddit.com/subreddits/leaderboard/news/">News</a>
      </div>
    </div>
  );
}

export default TopCommunities;
