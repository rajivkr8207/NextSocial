import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Home from './features/post/pages/Home'
import PostLayout from './features/post/PostLayout'
import CreatePost from './features/post/pages/CreatePost'
import Profile from './features/auth/pages/Profile'
import Explore from './features/user/pages/Explore'
import UserLayout from './features/user/UserLayout'
import Notifications from './features/user/pages/Notifcation'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import UserProfile from './features/user/pages/UserProfile'
import Search from './features/user/pages/SearchUser'
import PostDetails from './features/post/pages/PostDetails'
export const router = createBrowserRouter([
  // ---------- PUBLIC ----------
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  },

  // ---------- PROTECTED ----------
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <PostLayout />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "create",
            element: <CreatePost />
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "post/:id",
            element: <PostDetails />
          },
          {
            element: <UserLayout />,
            children: [
              {
                path: "explore",
                element: <Explore />
              },
              {
                path: "search",
                element: <Search />
              },
              {
                path: "notification",
                element: <Notifications />
              },
              {
                path: "profile/:id",
                element: <UserProfile />
              }
            ]
          }
        ]
      }
    ]
  }
])