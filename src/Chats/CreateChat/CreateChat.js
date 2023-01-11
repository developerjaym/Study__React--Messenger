import { useRef, useState } from "react";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import { Icons } from "../../Extras/Icons";
import { chatAppHttpClient } from "../../Extras/Utilities";
import Page from "../../Page/Page";
import "./CreateChat.css";

export default function CreateChat() {
  // TODO get the list of all friends
  // TODO make a bunch of checkboxes for each friend
  // TODO let the user check next to friends they want to chat with
  // TODO send the request to the back end
  // TODO navigate user to chat details page
  const [addedFriends, setAddedFriends] = useState([]);
  const navigate = useNavigate();
  const allFriends = useLoaderData().map(friend => friend.username);
  const [candidates, setCandidates] = useState([...allFriends]);
  const ref = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    chatAppHttpClient.createChat(addedFriends, (result) => {
        console.log('result', result)
        navigate(`/chats/${result.id}`)
    })
  };
  const addFriend = (e) => {
    const newFriend = ref.current.value;
    setCandidates((c) => {
      c.splice(c.indexOf(newFriend), 1);
      return c;
    });
    setAddedFriends((af) => [...af, newFriend]);
  };
  return (
    <Page pageTitle="Create Chat" backRoute="/chats">
      <form className="form" onSubmit={onSubmit}>
        <label className="friend__chosen-area">
          Chosen Friends
          {addedFriends.map((f) => (
            <div className="chip" key={f}>
              {f}
              <button type="button" className="button button--icon button--small" onClick={(e) => {
                setCandidates([...candidates, f]);
                setAddedFriends(af => {
                    af.splice(af.indexOf(f), 1)
                    return af
                })
              }}>
                {Icons.DELETE}
              </button>
            </div>
          ))}
        </label>
        <label className="label">
          Name
          <div className="friend__selector">
            <select className="input" ref={ref}>
              {candidates.map((user) => (
                <option key={user}>{user}</option>
              ))}
            </select>
            <button type="button" className="button button--icon" disabled={!candidates.length} onClick={addFriend}>+</button>
          </div>
          <p className="form__error"></p>
        </label>
        <button className="button button--submit" type="submit">
          Start Chatting
        </button>
      </form>
    </Page>
  );
}
