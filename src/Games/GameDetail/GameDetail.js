import { useLoaderData } from "react-router-dom";
import Page from "../../Page/Page";
import "./GameDetail.css";

export default function GameDetail() {
  const game = useLoaderData();
  return (
    <Page pageTitle="Games" backRoute="/games">
      <iframe
        src={game.link}
        title={game.name}
        className="game-detail__frame"
      ></iframe>
    </Page>
  );
}
