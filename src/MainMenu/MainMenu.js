import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Icons } from "../Extras/Icons";
import Page from "../Page/Page";
import Search from "../Search/Search";
import "./MainMenu.css";
export default function MainMenu() {
  const navigate = useNavigate()
  const usersApps = useLoaderData()
  const usersAppsOptions = usersApps.map(userApp => (<Link key={userApp.id} to={`apps/${userApp.id}`} className="menu__item">
  {userApp.image ? <img className="item__icon" src={userApp.image} alt={`Logo for ${userApp.name}`} height="28" width="28"/> :  <span className="item__icon">{Icons.GAME}</span>}
  <label className="item__title">{userApp.name}</label>
</Link>))
  return (
    <Page transparent={true}>
      <div className="menu">
        <nav className="menu__area menu__area--others">
          <Link to="apps" className="menu__item">
            <span className="item__icon">{Icons.GAME}</span>
            <label className="item__title">App Store</label>
          </Link>
          {usersAppsOptions}
        </nav>


        <nav className="menu__area menu__area--favorites">
          <Link to="chats" className="menu__item">
            <span className="item__icon">{Icons.MESSAGE}</span>
            <label className="item__title">Chat</label>
          </Link>
          <Link to="friends" className="menu__item">
            <span className="item__icon">{Icons.FRIENDS}</span>
            <label className="item__title">Friends</label>
          </Link>
          <Link to="profile" className="menu__item">
            <span className="item__icon">{Icons.PROFILE}</span>
            <label className="item__title">Profile</label>
          </Link>
        </nav>
        <Search label="Search Google" onSearch={search => navigate({pathname: '/search', search: `?term=${search.term}`})}/>
      </div>
    </Page>
  );
}
