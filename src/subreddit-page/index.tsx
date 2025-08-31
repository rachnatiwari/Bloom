import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../navbar/index";
import Posts from "./posts";
import Sidebar from "./sidebar";
// import './subreddit.css';
import Banner from "./banner";
import { redditApi } from "../lib/api";


type SubredditInfo = {
  display_name: string;
  title: string;
  primary_color?: string;
  full_name: string;
  active_users?: number;
  subcribers?: number;
  description?: string;
  banner_img?: string;
  banner_background_color?: string;
  created_at?: number;
};

function SubredditPage() {
  let params = useParams();
  const [subreddit, setSubreddit] = useState(params.subreddit_name);
  const [subredditInfo, setSubredditInfo] = useState<Partial<SubredditInfo>>({});

  useEffect(() => {
    if (!subredditInfo.display_name) {
      fetchSubreddit();
    }

  },[]);

  async function fetchSubreddit() {
    redditApi.getSubredditAbout(String(subreddit))
      .then((data) => {
        let raw_data = data.data;
        let subreddit_info: SubredditInfo = {
          display_name: raw_data.display_name,
          title: raw_data.title,
          primary_color: raw_data.primary_color? raw_data.primary_color:raw_data.key_color,
          full_name: raw_data.display_name_prefixed,
          active_users: raw_data.active_user_count? raw_data.active_user_count: raw_data.accounts_active,
          subcribers: raw_data.subscribers,
          description: raw_data.public_description,
          banner_img: raw_data.banner_img,
          banner_background_color: raw_data.banner_background_color,
          created_at: raw_data.created_utc
        };
        console.log('subreddit-info : '+JSON.stringify(subreddit_info));
        setSubredditInfo(subreddit_info);
        document.title = subreddit_info.title || document.title;
      })
      .catch(() => {});
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
  <Posts subreddit={subreddit || ""}/>
  <Sidebar subreddit={subreddit || ""} />
      </div>
    </>
  );
}

export default SubredditPage;
