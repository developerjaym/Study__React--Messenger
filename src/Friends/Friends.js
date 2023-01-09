import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Page from "../Page/Page";
import Search from "../Search/Search";
import FriendMenuItem from "./FriendMenuItem/FriendMenuItem";
import "./Friends.css";

export default function Friends() {
  const navigate = useNavigate();
  const allFriends = useLoaderData();
  const [friends, setFriends] = useState({all: allFriends, hidden: []})
  const friendMenuList = friends.all.filter(friend => !friends.hidden.includes(friend)).map((friend) => (
    <FriendMenuItem key={friend.username} friend={friend} />
  ));
  return (
    <Page pageTitle="Friends" backRoute="/">
      <Search label="Search friends" onSearch={(search) => {
        setFriends({...friends, hidden: friends.all.filter(friend => !friend.username.toLowerCase().includes(search.term.toLowerCase()))}) 
      }} />
      <div className="friends__list">
        <button
          className="friends__option"
          onClick={() => {
            navigate("/friends/create")
          }}
        >
          +Add new friend
        </button>
        {friendMenuList}
      </div>
    </Page>
  );
}
