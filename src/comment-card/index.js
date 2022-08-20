import "./comment-card.css";
import moment from "moment";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useState, useEffect } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const SubredditTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "400",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const UserTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background:
      "linear-gradient(to bottom, rgb(48,122,204) 0%, rgb(48,122,204) 35%, #fff 35%, #fff 100%)",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "600",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

function CommentCard(props) {
  let votes = parseFloat(props.votes);
  const [user, setUser] = useState({});
  const [subreddit, setSubreddit] = useState({});

  useEffect(() => {
    if (!subreddit.name) {
      fetchSubreddit();
    }
    if (!user.name) {
      fetchUser();
    }
  });

  async function fetchSubreddit() {
    fetch("https://www.reddit.com/" + props.subreddit + "/about.json")
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        let raw_data = data.data;
        let subreddit_info = {
          icon: raw_data.icon_img ? raw_data.icon_img : raw_data.header_img,
          name: raw_data.title,
          members: raw_data.subscribers,
          active_users: raw_data.accounts_active
            ? raw_data.accounts_active
            : raw_data.active_user_count,
          description: raw_data.public_description,
          link: raw_data.display_name_prefixed,
        };
        setSubreddit(subreddit_info);
      });
  }

  async function fetchUser() {
    fetch("https://www.reddit.com/user/" + props.author + "/about.json")
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        let raw_data = data.data;
        let user_info = {
          snoovatar_img: raw_data.snoovatar_img,
          icon_img: raw_data.icon_img,
          name: raw_data.name,
          comment_karma: raw_data.comment_karma,
          awardee_karma: raw_data.awardee_karma,
          awarder_karma: raw_data.awarder_karma,
          post_karma:
            raw_data.total_karma -
            (raw_data.comment_karma +
              raw_data.awardee_karma +
              raw_data.awarder_karma),
          created_at: raw_data.created_utc,
        };
        setUser(user_info);
      });
  }

  return (
    <div className="comment-card">
      <div className="comment-card-component comment_card_nav">
        <div className="comment-icon">
          <ChatBubbleOutlineIcon color="lightgray" />
        </div>
        <div>
          <a href={"/user" + props.username} className="comment_card_username">
            {props.username}
          </a>{" "}
          commented on{" "}
          <a href="#" className="post_commented_on">
            {props.post_commented_on}
          </a>
          {" - "}
          <SubredditTooltip
            title={
              <div className="subreddit_tooltip">
                <div className="subreddit_tooltip_navbar">
                  <div style={{ width: "15%" }}>
                    <img
                      src={
                        subreddit.icon
                          ? subreddit.icon
                          : require("../images/subreddit_icon.png")
                      }
                      alt="subreddit Icon"
                      style={{
                        maxWidth: "85%",
                        maxHeight: "85%",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <div className="subreddit_tooltip_name">
                    <a href={props.subreddit}>{props.subreddit}</a>
                  </div>
                </div>
                <div className="subreddit_tooltip_users">
                  <div className="subreddit_tooltip_members">
                    <div
                      style={{
                        fontWeight: "500",
                        fontSize: "1.05rem",
                        color: "black",
                      }}
                    >
                      {subreddit.members > 1000
                        ? (subreddit.members / 1000000).toFixed(1) + "m"
                        : subreddit.members}
                    </div>{" "}
                    Members
                  </div>
                  <div className="subreddit_tooltip_online">
                    <div
                      style={{
                        fontWeight: "500",
                        fontSize: "1.05rem",
                        color: "black",
                      }}
                    >
                      {subreddit.active_users > 1000
                        ? (subreddit.active_users / 1000).toFixed(1) + "k"
                        : subreddit.active_users}
                    </div>{" "}
                    Online
                  </div>
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: "400" }}>
                  {subreddit.description}
                </div>
                <button className="subreddit_tooltip_button">
                  <a
                    href={props.subreddit}
                    className="subreddit_tooltip_button"
                  >
                    View Community
                  </a>
                </button>
              </div>
            }
          >
            <a href={props.subreddit} className="comment_card_subreddit">
              {props.subreddit}
            </a>
          </SubredditTooltip>{" "}
          - Posted by{" "}
          <UserTooltip
            title={
              <div style={{ padding: "3%" }}>
                <img
                  src={user.snoovatar_img ? user.snoovatar_img : (user.icon_img? user.icon_img:require('../../src/images/user_icon.png'))}
                  alt={"u/" + user.name}
                  className="snootar_image"
                />
                <div className="snoovatar_username">
                  {user.name}
                  {!user.snoovatar_img && (
                    <img
                      src={require("../images/premium.png")}
                      alt="premium user"
                      style={{ maxWidth: "10%" }}
                    />
                  )}
                </div>
                <div className="snoovatar_user_details">
                  u/{user.name} - {moment.unix(user.created_at).fromNow()}
                </div>
                <div className="snoovatar_karma">
                  <div className="left">
                    <div
                      style={{
                        fontSize: "1.01rem",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {user.post_karma > 1000
                        ? (user.post_karma / 1000).toFixed(1) + "k"
                        : user.post_karma}
                    </div>
                    <div>Post Karma</div>
                    <div
                      style={{
                        fontSize: "1.01rem",
                        marginTop: "5%",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {user.awardee_karma > 1000
                        ? (user.awardee_karma / 1000).toFixed(1) + "k"
                        : user.awardee_karma}
                    </div>
                    <div>
                      Awardee Karma{" "}
                      <a href="https://www.reddithelp.com/en/categories/reddit-101/reddit-basics/what-karma">
                        <InfoOutlinedIcon fontSize="small" color="grey" />
                      </a>
                    </div>
                  </div>
                  <div className="right">
                    <div
                      style={{
                        fontSize: "1.01rem",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {user.comment_karma > 1000
                        ? (user.comment_karma / 1000).toFixed(1) + "k"
                        : user.comment_karma}
                    </div>
                    <div>Comment Karma</div>
                    <div
                      style={{
                        fontSize: "1.01rem",
                        marginTop: "5%",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {user.awarder_karma > 1000
                        ? (user.awarder_karma / 1000).toFixed(1) + "k"
                        : user.awarder_karma}
                    </div>
                    <div>
                      Awarder Karma
                      <a href="https://www.reddithelp.com/en/categories/reddit-101/reddit-basics/what-karma">
                        <InfoOutlinedIcon fontSize="small" color="grey" />
                      </a>
                    </div>
                  </div>
                </div>
                <button className="subreddit_tooltip_button">Follow</button>
              </div>
            }
          >
            <a href={"/user" + props.author} style={{ color: "gray" }}>
            u/{props.author}
          </a>
          </UserTooltip>

        </div>
      </div>
      <div className="comment-card-component">
        <div className="comment_card_body">
        <UserTooltip
            title={
              <div style={{ padding: "3%" }}>
                <img
                  src={user.snoovatar_img ? user.snoovatar_img : (user.icon_img? user.icon_img:require('../../src/images/user_icon.png'))}
                  alt={"u/" + user.name}
                  className="snootar_image"
                />
                <div className="snoovatar_username">
                  {user.name}
                  {!user.snoovatar_img && (
                    <img
                      src={require("../images/premium.png")}
                      alt="premium user"
                      style={{ maxWidth: "10%" }}
                    />
                  )}
                </div>
                <div className="snoovatar_user_details">
                  u/{user.name} - {moment.unix(user.created_at).fromNow()}
                </div>
                <div className="snoovatar_karma">
                  <div className="left">
                    <div
                      style={{
                        fontSize: "1.01rem",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {user.post_karma > 1000
                        ? (user.post_karma / 1000).toFixed(1) + "k"
                        : user.post_karma}
                    </div>
                    <div>Post Karma</div>
                    <div
                      style={{
                        fontSize: "1.01rem",
                        marginTop: "5%",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {user.awardee_karma > 1000
                        ? (user.awardee_karma / 1000).toFixed(1) + "k"
                        : user.awardee_karma}
                    </div>
                    <div>
                      Awardee Karma{" "}
                      <a href="https://www.reddithelp.com/en/categories/reddit-101/reddit-basics/what-karma">
                        <InfoOutlinedIcon fontSize="small" color="grey" />
                      </a>
                    </div>
                  </div>
                  <div className="right">
                    <div
                      style={{
                        fontSize: "1.01rem",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {user.comment_karma > 1000
                        ? (user.comment_karma / 1000).toFixed(1) + "k"
                        : user.comment_karma}
                    </div>
                    <div>Comment Karma</div>
                    <div
                      style={{
                        fontSize: "1.01rem",
                        marginTop: "5%",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {user.awarder_karma > 1000
                        ? (user.awarder_karma / 1000).toFixed(1) + "k"
                        : user.awarder_karma}
                    </div>
                    <div>
                      Awarder Karma
                      <a href="https://www.reddithelp.com/en/categories/reddit-101/reddit-basics/what-karma">
                        <InfoOutlinedIcon fontSize="small" color="grey" />
                      </a>
                    </div>
                  </div>
                </div>
                <button className="subreddit_tooltip_button">Follow</button>
              </div>
            }
          >
          <a href={"/user" + props.username} style={{ color: "black" }}>
            {props.username}
          </a>
          </UserTooltip>
          {" "}
          {props.votes} Point{props.votes > 1 ? "s" : ""} -{" "}
          <BootstrapTooltip
            disableFocusListener
            disableTouchListener
            placement="top"
            enterDelay={500}
            title={
              moment.unix(props.created_at).format("LLLL") +
              ", Indian Standard Time"
            }
          >
            <span>{moment.unix(props.created_at).fromNow()}</span>
          </BootstrapTooltip>
          <div className="comment_card_text">{props.body}</div>
          <div className="comment_card_body_footer">
            <span>Reply</span> <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
