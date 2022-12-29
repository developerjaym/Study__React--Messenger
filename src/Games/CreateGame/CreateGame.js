import Page from "../../Page/Page";
import "./CreateGame.css";

export default function CreateGame() {
  return (
    <Page pageTitle="Add game">
      <form>
        <label>
          Name
          <input />
        </label>
      </form>
    </Page>
  );
}
