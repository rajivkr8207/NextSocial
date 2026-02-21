import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'


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
    element: <h1>welcome to 4 layer of Architecture of frontend backend</h1>
  },
])