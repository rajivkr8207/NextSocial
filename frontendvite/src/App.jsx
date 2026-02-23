import { RouterProvider } from "react-router";
import { ToastContainer } from 'react-toastify';
import { router } from "./app.routes";
import './features/shared/global.scss'
import AuthProvider from "./features/auth/AuthContext";
const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App