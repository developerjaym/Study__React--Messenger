import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toaster, ToastMoods } from "../Extras/Toast/Toaster";
import Page from "../Page/Page";
import Search from "../Search/Search";
import AppMenuItem from "./AppMenuItem/AppMenuItem";
import "./Apps.css";

export default function Apps() {
    const navigate = useNavigate()
    useEffect(() => {
        toaster.createToast('Welcome to the App Store!', ToastMoods.happy)

    }, [])
    const {all, installed} = useLoaderData()
    const [apps, setApps] = useState({
      all,
      hidden: []
    })
    const appMenuList = apps.all.filter(app => !apps.hidden.includes(app)).map(app => (<AppMenuItem app={app} isInstalled={installed.map(installedApp => installedApp.id).includes(app.id)} key={app.name} className="app__option"/>))

    return (<Page pageTitle="App Store" backRoute="/">
    <Search label="Search Apps" onSearch={result => setApps({...apps, hidden: apps.all.filter(app => !app.description.toLowerCase().includes(result.term.toLowerCase()) && !app.name.toLowerCase().includes(result.term.toLowerCase()))})}/>
    <div className="apps__list">
        <button
          className="apps__option"
          onClick={() => {
            navigate("/apps/create")
          }}
        >
          +Publish new app
        </button>
        {appMenuList}
      </div>
    </Page>)
}