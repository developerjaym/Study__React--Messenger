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
import CreateGame from './Games/CreateGame/CreateGame';
import GameDetail from './Games/GameDetail/GameDetail';
import Games from './Games/Games';
import './index.css';
import MainMenu from './MainMenu/MainMenu';
import Profile from './Profile/Profile';
import reportWebVitals from './reportWebVitals';
import GoogleSearch from './Search/Google/GoogleSearch';

const gameLoader = async () => {
  return chatAppHttpClient.getAllGamesForUser()
}

const router = createHashRouter([
  {
    path:"/",
    element: <App/>,
    children: [
      {
        path:"/",
        element: <MainMenu/>,
      },
      {
        path:"/friends",
        element: <Friends/>,
      },
      {
        path:"/friends/create",
        element: <CreateFriend/>,
      },
      {
        path:"/friends/:id",
        element: <FriendDetail/>,
        loader: async ({request, params}) => {
          // TODO
          return new Promise((resolve, reject) => resolve({"username": "bananna"}))
        }
      },
      {
        path:"/chats",
        element: <Chats/>,
        // loader: quizLoader
      },
      {
        path:"/chats/create",
        element: <CreateChat/>,
      },
      {
        path:"/chats/:id",
        element: <ChatDetail/>,
        loader: async ({request, params}) => {
          // TODO
          return new Promise((resolve, reject) => resolve({
            id: 1,
            updatedAt: "2022-12-22",
            users: [
              {
                id: 1,
                username: "bananna",
              },
              {
                id: 2,
                username: "bballmike",
              },
            ],
            messages: [
              {
                id: 1,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },
              {
                id: 2,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },
              {
                id: 3,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              }
              ,{
                id: 4,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 5,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 6,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 7,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 8,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 9,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 10,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 11,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 12,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 13,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 14,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World middleish",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 15,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 16,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 17,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 18,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 19,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 20,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 21,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World",
                author: {
                  id: 1,
                  username: "bananna"
                }
              },{
                id: 22,
                timestamp: "2022-12-23T17:00:00.000Z",
                content: "Hello, World last",
                author: {
                  id: 1,
                  username: "bananna"
                }
              }
            ]
          }))
        }
      },
      {
        path:"/games",
        element: <Games/>,
        loader: gameLoader
      },
      {
        path:"/games/create",
        element: <CreateGame/>      },
      {
        path:"/games/:id",
        element: <GameDetail/>,
        loader: async ({request, params}) => {
          const allGames = await gameLoader()
          return allGames.find(game => game.name === params.id)
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
