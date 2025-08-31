import * as React from "react";
import { useEffect, useState } from "react";
// import "./user.css";
import moment from "moment";
import { TrophyIcon, CakeIcon } from "@heroicons/react/24/outline";
import { redditApi } from "../lib/api";

interface SidebarProps { username: string }

type UserInfo = {
  snoovatar_img?: string;
  icon_img?: string;
  name: string;
  comment_karma: number;
  awardee_karma: number;
  awarder_karma: number;
  total_karma: number;
  post_karma: number;
  created_at: number;
  pref_show_snoovatar?: boolean;
};

type Trophy = { name: string; description?: string; icon_img: string };

export default function Sidebar(props: SidebarProps) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [toggleoptions, setToggleoptions] = useState(false);
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [toggletrophies, setToggletrophies] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
    if (trophies.length === 0) {
      fetchTrophies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchUser() {
    redditApi.getUserAbout(props.username)
      .then((data) => {
        let raw_data = data.data;
        let user_info: UserInfo = {
          snoovatar_img: raw_data.snoovatar_img,
          icon_img: raw_data.icon_img,
          name: raw_data.name,
          comment_karma: raw_data.comment_karma,
          awardee_karma: raw_data.awardee_karma,
          awarder_karma: raw_data.awarder_karma,
          total_karma: raw_data.total_karma,
          post_karma:
            raw_data.total_karma -
            (raw_data.comment_karma +
              raw_data.awardee_karma +
              raw_data.awarder_karma),
          created_at: raw_data.created_utc,
          pref_show_snoovatar: raw_data.pref_show_snoovatar,
        };
        setUser(user_info);
      })
      .catch(() => {});
  }

  async function fetchTrophies() {
    redditApi
      .getUserTrophies(props.username)
      .then((data) => {
        let raw_data = data.data;
        let trophies_info: Trophy[] = [];
        raw_data.trophies.map((item: any) => {
          let trophy: Trophy = {
            name: item.data.name,
            description: item.data.description,
            icon_img: item.data.icon_40,
          };
          trophies_info.push(trophy);
        });
        setTrophies(trophies_info);
      })
      .catch(() => {});
  }

  function handleToggle() {
    setToggleoptions(!toggleoptions);
  }

  function handleToggleTrophies() {
    setToggletrophies(!toggletrophies);
  }

  return (
    <div className="user-sidebar">
      <div className="sidebar-box user-info">
        {user && (
          <img
            src={user.snoovatar_img ? user.snoovatar_img : (user.icon_img || "")}
            alt={props.username}
            className="sidebar_snoovatarimg"
          />
        )}
        <div className="sidebar_username">{props.username}</div>
        {user && (
          <div className="sidebar_title">
            u/{props.username} - {moment.unix(user.created_at).fromNow()}
          </div>
        )}
        <button
          className="create_avatar_button"
          style={{
            maxWidth: "90%",
            marginLeft: "5%",
            padding: "2%",
            fontSize: "0.99rem",
          }}
        >
          Create your own avatar {">"}
        </button>
        <div className="sidebar_user_info">
          <div className="left">
            <div style={{ fontWeight: "600", color: "black" }}>Karma</div>
            <div className="flex items-center gap-1 text-gray-700">
              <TrophyIcon className="w-4 h-4 text-blue-600" /> {user?.total_karma ?? 0}
            </div>
          </div>
          <div className="right">
            <div style={{ fontWeight: "600", color: "black" }}>Cake Day</div>
            <div className="flex items-center gap-1 text-gray-700">
              <CakeIcon className="w-4 h-4 text-blue-600" /> {user ? moment.unix(user.created_at).format("LL") : ""}
            </div>
          </div>
        </div>
        <button className="sidebar_follow_button">Follow</button>
        {toggleoptions ? (
          <div style={{ marginTop: "3%" }}>
            <div className="sidebar_toggleoptions">
              <span>Send Message</span>
            </div>
            {user?.pref_show_snoovatar && (
              <div className="sidebar_toggleoptions">
                <span>View Snoovatar</span>
              </div>
            )}
            <div className="sidebar_toggleoptions">
              <span>Report User</span>
            </div>
            <div className="sidebar_moreoptions">
              <span onClick={() => handleToggle()}>Fewer Options</span>
            </div>
          </div>
        ) : (
          <div className="sidebar_moreoptions">
            <span onClick={() => handleToggle()}>More Options</span>
          </div>
        )}
      </div>
      <div className="sidebar-box trophy-case">
        <div style={{ paddingBottom: "4%", fontWeight: "bold" }}>
          Trophy Case {"("}
          {trophies.length}
          {")"}
        </div>
        {trophies.map((trophy, index) => {
          if (index < 3) {
            return (
              <div className="userpage_trophies" key={index}>
                <div className="userpage_trophy_image">
                  <img src={trophy.icon_img} alt={trophy.name} />
                </div>
                <div className="userpage_trophy_details">
                  <div className="userpage_trophy_name">{trophy.name}</div>
                  {trophy.description && (
                    <div className="userpage_trophy_description">
                      {trophy.description}
                    </div>
                  )}
                </div>
              </div>
            );
          }
          return null;
        })}
        { trophies.length>3 &&
        (toggletrophies?
          (<>
          {trophies.map((trophy, index) => {
          if (index > 2) {
            return (
              <div className="userpage_trophies" key={`more-${index}`}>
                <div className="userpage_trophy_image">
                  <img src={trophy.icon_img} alt={trophy.name} />
                </div>
                <div className="userpage_trophy_details">
                  <div className="userpage_trophy_name">{trophy.name}</div>
                  {trophy.description && (
                    <div className="userpage_trophy_description">
                      {trophy.description}
                    </div>
                  )}
                </div>
              </div>
            );
          }
          return null;
        })}
          <div className="sidebar_moreoptions">
          <span onClick={() => handleToggleTrophies()}>View Less</span>
        </div>
        </>):
          (<div className="sidebar_moreoptions">
          <span onClick={() => handleToggleTrophies()}>View More</span>
        </div>))
        }
      </div>
    </div>
  );
}
