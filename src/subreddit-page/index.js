import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../navbar";
import Posts from "./posts";
import Sidebar from "./sidebar";
import './subreddit.css';
import Banner from "./banner";


function SubredditPage() {
  let params = useParams();
  const [subreddit, setSubreddit] = useState(params.subreddit_name);
  const [subredditInfo, setSubredditInfo] = useState({});

  useEffect(() => {
    if (!subredditInfo.display_name) {
      fetchSubreddit();
    }

  },[]);

  async function fetchSubreddit() {
    await fetch("https://www.reddit.com/r/" + subreddit + "/about.json")
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        let raw_data = data.data;
        let subreddit_info = {
          display_name: raw_data.display_name,
          title: raw_data.title,
          primary_color: raw_data.key_color? raw_data.key_color:raw_data.primary_color,
          full_name: raw_data.display_name_prefixed,
          active_users: raw_data.active_user_count? raw_data.active_user_count: raw_data.accounts_active,
          subcribers: raw_data.subscribers,
          description: raw_data.public_description,
          banner_img: raw_data.mobile_banner_image?raw_data.mobile_banner_image:raw_data.banner_img,
          banner_background_color: raw_data.banner_background_color,
          created_at: raw_data.created_at,
          icon_img: raw_data.icon_img,
          user_flair_color: raw_data.user_flair_background_color,
        };
        console.log('subreddit-info : '+JSON.stringify(subreddit_info));
        setSubredditInfo(subreddit_info);
        document.title = subreddit_info.title
      });
  }
  return (
    <div style={{background:subredditInfo.user_flair_color, opacity:'0.85'}}>
      <NavBar />
      <Banner
        banner_img = {subredditInfo.banner_img}
        banner_background_color = {subredditInfo.banner_background_color}
        title = {subredditInfo.title}
        display_name = {subredditInfo.display_name}
        icon_img = {subredditInfo.icon_img}
        primary_color={subredditInfo.primary_color}
      />
      <div className="subreddit-content">
        <Posts subreddit={subreddit}/>
        <Sidebar subreddit={subredditInfo} />
      </div>
    </div>
  );
}

export default SubredditPage;
