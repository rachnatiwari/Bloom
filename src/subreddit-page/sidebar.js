import { useEffect, useState } from "react";
import "./subreddit.css";
import moment from "moment";
import CakeIcon from '@mui/icons-material/Cake';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';


export default function Sidebar(props) {
  const subredditInfo = props.subreddit
  console.log(JSON.stringify(subredditInfo.primary_color));
  return (
    <div className="user-sidebar">
      <div className="sidebar-box subreddit_info">
      <div className="about_community" style={{backgroundColor:subredditInfo.primary_color}}>About Community</div>
      <div className="subreddit_info_desc">
        <div>{subredditInfo.description}</div>
        <div className="subreddit_info_users">
          <div className="left">
            <div>{subredditInfo.subcribers}</div>
            <div>Members</div>
          </div>
          <div className="right">
            <div>{subredditInfo.active_users}</div>
            <div>Online</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
