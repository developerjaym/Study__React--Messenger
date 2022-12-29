import { useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { toaster, ToastMoods } from "../Extras/Toast/Toaster";
import Page from "../Page/Page";
import GameMenuItem from "./GameMenuItem/GameMenuItem";
import "./Games.css";

export default function Games() {
    const navigate = useNavigate()
    useEffect(() => {
        toaster.createToast('Welcome to Games!', ToastMoods.happy)

    }, [])
    const games = useLoaderData()
    const gameMenuList = games.map(game => (<GameMenuItem game={game} key={game.name} className="game__option"/>))

    return (<Page pageTitle="Games">
    <div className="games__list">
        <button
          className="games__option"
          onClick={() => {
            navigate("/games/create")
          }}
        >
          +Add new game
        </button>
        {gameMenuList}
      </div>
    </Page>)
}