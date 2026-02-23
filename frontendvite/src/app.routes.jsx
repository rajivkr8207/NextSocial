import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Home from './features/post/pages/Home'
import PostLayout from './features/post/PostLayout'
import CreatePost from './features/post/pages/CreatePost'
import Profile from './features/auth/pages/Profile'


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: <PostLayout />,
    children: [
      {
        path:"",
        element: <Home />
      },
      {
        path:"create",
        element: <CreatePost />
      },
      {
        path:"profile",
        element: <Profile />
      }
    ]
  },
])