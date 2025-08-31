import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../navbar/index";
import LeftMenu from "../leftmenu";
import Posts from "./posts";
import Sidebar from "./sidebar";
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
  banner_url?: string | undefined;
  icon_url?: string | undefined;
  banner_background_color?: string;
  created_at?: number;
};

function SubredditPage() {
  let params = useParams();
  const subreddit = params.subreddit_name;
  const [subredditInfo, setSubredditInfo] = useState<Partial<SubredditInfo>>(
    {}
  );

  useEffect(() => {
    if (!subredditInfo.display_name) {
      fetchSubreddit();
    }
  }, []);

  async function fetchSubreddit() {
    redditApi
      .getSubredditAbout(String(subreddit))
      .then((data) => {
        let raw_data = data.data;
        // Choose best available images and sanitize URLs (Reddit returns &amp; often)
        const clean = (u: any): string => (typeof u === "string" && u.length > 0 ? u.replace(/&amp;/g, "&") : "");
        const banner_url = clean(
          raw_data.banner_background_image || raw_data.banner_img || raw_data.header_img || ""
        );
        const icon_url = clean(
          raw_data.community_icon || raw_data.icon_img || raw_data.header_img || ""
        );
        let subreddit_info: SubredditInfo = {
          display_name: raw_data.display_name,
          title: raw_data.title,
          primary_color: raw_data.primary_color
            ? raw_data.primary_color
            : raw_data.key_color,
          full_name: raw_data.display_name_prefixed,
          active_users: raw_data.active_user_count
            ? raw_data.active_user_count
            : raw_data.accounts_active,
          subcribers: raw_data.subscribers,
          description: raw_data.public_description,
          banner_img: raw_data.banner_img,
          banner_url,
          icon_url,
          banner_background_color: raw_data.banner_background_color,
          created_at: raw_data.created_utc,
        };
        console.log("subreddit-info : " + JSON.stringify(subreddit_info));
        setSubredditInfo(subreddit_info);
        document.title = subreddit_info.title || document.title;
      })
      .catch(() => {});
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <LeftMenu />
      <main className="w-full max-w-6xl mx-auto flex flex-col gap-6 px-4 py-8" style={{ paddingLeft: 0 }}>
        <Banner
    banner_img={subredditInfo.banner_img}
    banner_url={subredditInfo.banner_url}
          banner_background_color={subredditInfo.banner_background_color}
          title={subredditInfo.title}
          display_name={subredditInfo.display_name}
    icon_url={subredditInfo.icon_url}
        />
        <div className="flex flex-row gap-8">
          <div className="flex-1">
            <Posts subreddit={subreddit || ""} />
          </div>
          <aside className="w-80 hidden lg:block">
            <Sidebar subreddit={subreddit || ""} />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default SubredditPage;
