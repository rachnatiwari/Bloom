import * as React from "react";
import moment from "moment";
import { useEffect, useState } from "react";
import { ChatBubbleLeftIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import subredditIcon from "../images/subreddit_icon.png";
import userIcon from "../images/user_icon.png";
import premiumIcon from "../images/premium.png";
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

interface CommentCardProps {
  votes: number | string;
  subreddit: string;
  author: string;
  username: string;
  post_commented_on: string;
  created_at: number;
  body: string;
}

const CommentCard: React.FC<CommentCardProps> = (props) => {
  const votes = parseFloat(props.votes as string);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [subreddit, setSubreddit] = useState<SubredditInfo | null>(null);

  useEffect(() => {
    if (!subreddit) fetchSubreddit();
    if (!user) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          post_karma: raw.total_karma - (raw.comment_karma + raw.awardee_karma + raw.awarder_karma),
          created_at: raw.created_utc,
        });
      })
      .catch(() => {
        setUser({
          snoovatar_img: "",
          icon_img: "",
          name: props.author,
          comment_karma: 0,
          awardee_karma: 0,
          awarder_karma: 0,
          post_karma: 0,
          created_at: Math.floor(Date.now() / 1000),
        });
      });
  }

  return (
    <div className="my-4 bg-white rounded-lg flex flex-col border border-gray-200 p-4">
      <div className="flex items-center text-sm text-gray-600">
        <ChatBubbleLeftIcon className="h-5 w-5 text-gray-400 mr-2" />
        <a href={`/user/${props.username}`} className="font-medium text-gray-800 hover:underline">
          {props.username}
        </a>
        <span className="mx-1">commented on</span>
        <a href="#" className="text-blue-600 hover:underline">
          {props.post_commented_on}
        </a>
        <span className="mx-1">-</span>
        <a href={`/${props.subreddit}`} className="text-gray-800 hover:underline" title={subreddit?.name || props.subreddit}>
          {props.subreddit}
        </a>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        {votes} Point{votes > 1 ? "s" : ""} -
        <span title={moment.unix(props.created_at).format("LLLL") + ", Indian Standard Time"} className="ml-1">
          {moment.unix(props.created_at).fromNow()}
        </span>
      </div>

      <div className="mt-3 text-gray-800">{props.body}</div>

      {user && (
        <div className="mt-4 p-3 border rounded-lg bg-gray-50">
          <div className="flex items-center">
            <img
              src={user.snoovatar_img || user.icon_img || userIcon}
              alt={`u/${user.name}`}
              className="rounded-full w-12 h-12 mr-3"
            />
            <div>
              <div className="font-semibold flex items-center">
                {user.name}
                {!user.snoovatar_img && (
                  <img src={premiumIcon} alt="premium user" className="w-4 h-4 ml-2" />
                )}
              </div>
              <div className="text-xs text-gray-500">u/{user.name} - {moment.unix(user.created_at).fromNow()}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs mt-3">
            <div>
              <div className="font-semibold text-gray-900">
                {user.post_karma > 1000 ? (user.post_karma / 1000).toFixed(1) + "k" : user.post_karma}
              </div>
              <div className="flex items-center text-gray-600">Post Karma</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {user.comment_karma > 1000 ? (user.comment_karma / 1000).toFixed(1) + "k" : user.comment_karma}
              </div>
              <div className="flex items-center text-gray-600">Comment Karma</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {user.awardee_karma > 1000 ? (user.awardee_karma / 1000).toFixed(1) + "k" : user.awardee_karma}
              </div>
              <div className="flex items-center text-gray-600">
                Awardee Karma
                <a
                  href="https://www.reddithelp.com/en/categories/reddit-101/reddit-basics/what-karma"
                  className="ml-1 text-gray-400 hover:text-gray-600"
                  title="What is Karma?"
                >
                  <InformationCircleIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {user.awarder_karma > 1000 ? (user.awarder_karma / 1000).toFixed(1) + "k" : user.awarder_karma}
              </div>
              <div className="flex items-center text-gray-600">
                Awarder Karma
                <a
                  href="https://www.reddithelp.com/en/categories/reddit-101/reddit-basics/what-karma"
                  className="ml-1 text-gray-400 hover:text-gray-600"
                  title="What is Karma?"
                >
                  <InformationCircleIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <button className="mt-3 bg-pink-600 text-white rounded-full px-4 py-1 text-xs font-bold hover:bg-pink-700">Follow</button>
        </div>
      )}

      <div className="mt-3 flex gap-4 text-sm text-gray-500">
        <button className="hover:text-gray-700">Reply</button>
        <button className="hover:text-gray-700">Share</button>
      </div>
    </div>
  );
};

export default CommentCard;
