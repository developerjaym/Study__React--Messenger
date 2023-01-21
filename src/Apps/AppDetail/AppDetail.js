import { useLoaderData } from "react-router-dom";
import Page from "../../Page/Page";
import "./AppDetail.css";

export default function AppDetail() {
  const app = useLoaderData();
  return (
    <Page pageTitle="Apps" backRoute="/apps">
      <iframe
        src={app.link}
        title={app.name}
        className="app-detail__frame"
        allow="clipboard-write; clipboard-read"
      ></iframe>
    </Page>
  );
}
