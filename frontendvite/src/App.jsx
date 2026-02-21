import { RouterProvider } from "react-router";
import AuthProvider from "./features/auth/auth.context"
import { ToastContainer } from 'react-toastify';
import { router } from "./app.routes";
import './features/shared/global.scss'
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