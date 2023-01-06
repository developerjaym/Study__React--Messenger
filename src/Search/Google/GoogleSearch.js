import { useSearchParams } from "react-router-dom";
import Page from "../../Page/Page";
import "./GoogleSearch.css";

export default function GoogleSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Page pageTitle="Google Results" backRoute="/">
      <iframe
        className="search__frame"
        src={`https://localstorage.tools/search/google.html#gsc.tab=0&gsc.q=${searchParams.get(
          "term"
        )}&gsc.sort=`}
        title="search"
      ></iframe>
    </Page>
  );
}
