import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import App from './App';
import AuthPage from './Authentication/AuthPage';
import ChatDetail from './Chats/ChatDetail/ChatDetail';
import Chats from './Chats/Chats';
import CreateChat from './Chats/CreateChat/CreateChat';
import { chatAppHttpClient } from './Extras/Utilities';
import CreateFriend from './Friends/CreateFriend/CreateFriend';
import FriendDetail from './Friends/FriendDetail/FriendDetail';
import Friends from './Friends/Friends';
import CreateApp from './Apps/CreateApp/CreateApp';
import AppDetail from './Apps/AppDetail/AppDetail';
import Apps from './Apps/Apps';
import './index.css';
import MainMenu from './MainMenu/MainMenu';
import Profile from './Profile/Profile';
import reportWebVitals from './reportWebVitals';
import GoogleSearch from './Search/Google/GoogleSearch';


const router = createHashRouter([
  {
    path:"/",
    element: <App/>,
    children: [
      {
        path:"/",
        element: <MainMenu/>,
        loader: async ({request, params}) => chatAppHttpClient.getAllAppsForUser()
      },
      {
        path:"/friends",
        element: <Friends/>,
        loader: async ({request, params}) => chatAppHttpClient.getAllUsersFriends()
      },
      {
        path:"/friends/create",
        element: <CreateFriend/>,
        loader: async ({request, params}) => chatAppHttpClient.getAllUsers()
      },
      {
        path:"/friends/:username",
        element: <FriendDetail/>,
        loader: async ({request, params}) => chatAppHttpClient.getUser(params.username)
      },
      {
        path:"/chats",
        element: <Chats/>,
        loader: async ({request, params}) => chatAppHttpClient.getAllUsersChats()
      },
      {
        path:"/chats/create",
        element: <CreateChat/>,
        loader: async ({request, params}) => chatAppHttpClient.getAllUsersFriends()
      },
      {
        path:"/chats/:id",
        element: <ChatDetail/>,
        loader: async ({request, params}) => chatAppHttpClient.getChatById(params.id)
      },
      {
        path:"/apps",
        element: <Apps/>,
        loader: async () => {
          const all = await chatAppHttpClient.getAllApps()
          const installed = await chatAppHttpClient.getAllAppsForUser()
          return {installed, all}
        }
      },
      {
        path:"/apps/create",
        element: <CreateApp/>      },
      {
        path:"/apps/:id",
        element: <AppDetail/>,
        loader: async ({request, params}) => {
          const allApps = await chatAppHttpClient.getAllApps()
          const pertinent = allApps.find(app => app.id === Number(params.id))
          return pertinent
        }
      },

      {
        path:"/profile",
        element: <Profile/>
      },
      {
        path:"/search",
        element: <GoogleSearch/>
      },
    ],
    errorElement: <AuthPage/>
  },
  
  {
    path:"*",
    element: <Navigate to="/" replace/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
