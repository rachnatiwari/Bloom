import "../posts.css";
import moment from "moment";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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

const AwardToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgb(48,122,204)",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    background:
      "linear-gradient(to bottom, rgb(48,122,204) 0%, rgb(48,122,204) 35%, #fff 35%, #fff 100%)",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

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

const SnoovatarTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background:
      "linear-gradient(to bottom, rgb(48,122,204) 0%, rgb(48,122,204) 20%, #fff 20%, #fff 100%)",
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
    background: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "600",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function CardNav(props) {
  const [subreddit, setSubreddit] = useState({});
  const [user, setUser] = useState({});

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
        console.log(user_info);
        setUser(user_info);
      });
  }

  return (
    <div className="card-nav">
      <div style={{ width: "4%", marginTop: "0.4%" }}>
        <img
          src={
            subreddit.icon
              ? subreddit.icon
              : require("../../images/subreddit_icon.png")
          }
          alt="subreddit Icon"
          style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "50%" }}
        />
      </div>
      <div style={{ width: "87%" }}>
        <SubredditTooltip
          title={
            <div className="subreddit_tooltip">
              <div className="subreddit_tooltip_navbar">
                <div style={{ width: "15%" }}>
                  <img
                    src={
                      subreddit.icon
                        ? subreddit.icon
                        : require("../../images/subreddit_icon.png")
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
                <a href={props.subreddit} className="subreddit_tooltip_button">
                  View Community
                </a>
              </button>
            </div>
          }
        >
          <a
            href={"/" + props.subreddit}
            style={{ fontWeight: "bold" }}
            className="underline-link"
          >
            {props.subreddit}
          </a>
        </SubredditTooltip>
        <span style={{ color: "gray" }}>
          {" "}
          · Posted by{" "}
          {/* {user.snoovatar_img ? (
            <SnoovatarTooltip
              title={
                <div style={{ padding: "3%" }}>
                  <img
                    src={user.snoovatar_img}
                    alt={"u/" + user.name}
                    className="snootar_image"
                  />
                  <div className="snoovatar_username">{user.name}</div>
                  <div className="snoovatar_user_details">
                    u/{user.name} - {moment.unix(user.created_at).fromNow()}
                  </div>
                  <button className="create_avatar_button">
                    Create your own avatar {">"}
                  </button>
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
                          <InfoOutlinedIcon fontSize="small" color='grey' />
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
                          <InfoOutlinedIcon fontSize="small" color='grey' />
                        </a>
                      </div>
                    </div>
                  </div>
                  <button className="subreddit_tooltip_button">Follow</button>
                </div>
              }
            >
              <a
                href={"/user/" + props.author}
                className="post-author-name underline-link"
              >
                u/{props.author}
              </a>
            </SnoovatarTooltip>
          ) : (<UserTooltip
            title={
              <div style={{ padding: "3%" }}>
                <img
                  src={user.icon_img}
                  alt={"u/" + user.name}
                  className="snootar_image"
                />
                <div className="snoovatar_username">{user.name}</div>
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
                        <InfoOutlinedIcon fontSize="small" color='grey' />
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
                        <InfoOutlinedIcon fontSize="small" color='grey' />
                      </a>
                    </div>
                  </div>
                </div>
                <button className="subreddit_tooltip_button">Follow</button>
              </div>
            }
          >
            <a
                href={"/user/" + props.author}
                className="post-author-name underline-link"
              >
                u/{props.author}
              </a>
          </UserTooltip>)} */}
          <UserTooltip
            title={
              <div style={{ padding: "3%" }}>
                <img
                  src={user.snoovatar_img ? user.snoovatar_img : user.icon_img}
                  alt={"u/" + user.name}
                  className="snootar_image"
                />
                <div className="snoovatar_username">
                  {user.name}
                  {!user.snoovatar_img && (
                    <img
                      src={require("../../images/premium.png")}
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
            <a
              href={"/user/" + props.author}
              className="post-author-name underline-link"
            >
              u/{props.author}
            </a>
          </UserTooltip>{" "}
          -{" "}
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
        </span>
        {props.awardings.map((award) => {
          return (
            <AwardToolTip
              title={
                <div className="tooltip">
                  <div>
                    <img
                      src={award.image}
                      alt={award.name}
                      className="award-image"
                    />
                  </div>
                  <div className="award-text">
                    <div className="award-name">{award.name}</div>
                    <div className="award-description">{award.description}</div>
                    <a
                      href="https://www.reddithelp.com/en/categories/reddit-101/reddit-basics/what-are-awards"
                      className="award-link"
                    >
                      How do I reward?
                    </a>
                  </div>
                </div>
              }
            >
              <img src={award.image} alt={award.name} className="award-image" />
            </AwardToolTip>
          );
        })}
      </div>
      <button className="post-join">Join</button>
    </div>
  );
}

export default CardNav;
