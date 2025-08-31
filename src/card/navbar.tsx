import * as React from "react";
import { useEffect, useState } from "react";
import subredditIcon from "../images/subreddit_icon.png";
import userIcon from "../images/user_icon.png";
import { redditApi } from "../lib/api";

type SubredditInfo = {
  icon: string;
  name: string;
  members: number;
  active_users: number;
  description: string;
  link: string;
};

type UserInfo = {
  snoovatar_img: string;
  icon_img: string;
  name: string;
  comment_karma: number;
  awardee_karma: number;
  awarder_karma: number;
  post_karma: number;
  created_at: number;
};

interface CardNavProps {
  subreddit: string;
  author: string;
  created_at: number;
  awardings: Array<{ image: string; name?: string; description?: string }>;
  subreddit_page?: boolean;
}

const CardNav: React.FC<CardNavProps> = (props) => {
  const [subreddit, setSubreddit] = useState<SubredditInfo | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!subreddit) fetchSubreddit();
    if (!user) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function timeAgo(unix: number) {
    const now = Date.now() / 1000;
    const diff = now - unix;
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  function fetchSubreddit() {
    redditApi
      .getSubredditAbout(props.subreddit.replace(/^\//, ""))
      .then((data) => {
        const raw = data.data;
        setSubreddit({
          icon: raw.icon_img || raw.header_img || subredditIcon,
          name: raw.title,
          members: raw.subscribers,
          active_users: raw.accounts_active || raw.active_user_count,
          description: raw.public_description,
          link: raw.display_name_prefixed,
        });
      })
      .catch(() => {
        setSubreddit({
          icon: subredditIcon,
          name: props.subreddit,
          members: 0,
          active_users: 0,
          description: "",
          link: props.subreddit,
        });
      });
  }

  function fetchUser() {
    redditApi
      .getUserAbout(props.author)
      .then((data) => {
        const raw = data.data;
        setUser({
          snoovatar_img: raw.snoovatar_img,
          icon_img: raw.icon_img,
          name: raw.name,
          comment_karma: raw.comment_karma,
          awardee_karma: raw.awardee_karma,
          awarder_karma: raw.awarder_karma,
          post_karma:
            raw.total_karma - (raw.comment_karma + raw.awardee_karma + raw.awarder_karma),
          created_at: raw.created_utc,
        });
      })
      .catch(() => {
        setUser({
          snoovatar_img: "",
          icon_img: "",
          name: props.author.replace(/^u\//, ""),
          comment_karma: 0,
          awardee_karma: 0,
          awarder_karma: 0,
          post_karma: 0,
          created_at: Math.floor(Date.now() / 1000),
        });
      });
  }

  return (
    <div className="flex text-xs items-center w-full mt-1">
      {!props.subreddit_page && (
        <div className="w-5 mr-2">
          <img
            src={subreddit?.icon || subredditIcon}
            alt="subreddit Icon"
            className="rounded-full max-w-[90%] max-h-[90%]"
          />
        </div>
      )}
      <div className={props.subreddit_page ? "w-full" : "w-11/12"}>
        {!props.subreddit_page && (
          <a
            href={`/${props.subreddit}`}
            className="font-bold underline hover:no-underline mr-1"
            title={subreddit?.name || props.subreddit}
          >
            {props.subreddit}
          </a>
        )}
        <span className="text-gray-500">
          {props.subreddit_page ? "" : "· "}Posted by {" "}
          <a
            href={`/user/${props.author}`}
            className="underline hover:no-underline text-gray-700"
            title={`u/${user?.name || props.author}`}
          >
            u/{props.author}
          </a>
          {" "}- {timeAgo(props.created_at)}
        </span>
        <span className="ml-2 align-middle">
          {props.awardings?.map((award, idx) => (
            <img
              key={idx}
              src={award.image}
              alt={award.name || "award"}
              title={award.name || "award"}
              className="inline-block w-5 h-5 ml-1 align-middle"
            />
          ))}
        </span>
      </div>
      <a
        href={`/${props.subreddit}`}
        className="ml-auto bg-pink-600 text-white rounded-full px-4 py-1 text-xs font-bold hover:bg-pink-700"
      >
        Join
      </a>
    </div>
  );
};

export default CardNav;
