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
          primary_color: raw_data.primary_color? raw_data.primary_color:raw_data.key_color,
          full_name: raw_data.display_name_prefixed,
          active_users: raw_data.active_user_count? raw_data.active_user_count: raw_data.accounts_active,
          subcribers: raw_data.subscribers,
          description: raw_data.public_description,
          banner_img: raw_data.banner_img,
          banner_background_color: raw_data.banner_background_color,
          created_at: raw_data.created_at
        };
        console.log('subreddit-info : '+JSON.stringify(subreddit_info));
        setSubredditInfo(subreddit_info);
        document.title = subreddit_info.title
      });
  }
  return (
    <>
      <NavBar />
      <Banner
        banner_img = {subredditInfo.banner_img}
        banner_background_color = {subredditInfo.banner_background_color}
        title = {subredditInfo.title}
        display_name = {subredditInfo.display_name}
      />
      <div className="subreddit-content">
        <Posts subreddit={subreddit}/>
        <Sidebar subreddit={subreddit} />
      </div>
    </>
  );
}

export default SubredditPage;
