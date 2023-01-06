import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../Page/Page";
import Search from "../Search/Search";
import FriendMenuItem from "./FriendMenuItem/FriendMenuItem";
import "./Friends.css";

export default function Friends() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState({all: [
    {
      id: 1,
      username: "bananna",
    },
    {
      id: 2,
      username: "bballmike",
    },
  ],
  hidden: [

  ]
})
  const friendMenuList = friends.all.filter(friend => !friends.hidden.includes(friend)).map((friend) => (
    <FriendMenuItem key={friend.id} friend={friend} />
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
