import { Link } from "react-router-dom";
import { Icons } from "../../Extras/Icons";
import "./GameMenuItem.css";

export default function GameMenuItem({game}) {
    return (
        <Link to={`/games/${game.name}`} className="game-menu__item">
          <div className="game__icon">{Icons.GAME}</div>
          <div className="game__name">{game.name}</div>
        </Link>
      );
}