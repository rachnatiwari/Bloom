import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../navbar";
import Posts from "./posts";
import Sidebar from "./sidebar";
import Card from "../card";
function UserPage() {
  let params = useParams();
  const [username, SetUsername] = useState(params.user_id);

  useEffect(() => {
    document.title = username;
  });

  return (
    <>
      <NavBar />
      <div className="userpage-content">
        <Posts username={username}/>
        <Sidebar username={username} />
      </div>
    </>
  );
}

export default UserPage;
