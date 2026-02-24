import { RouterProvider } from "react-router";
import { Bounce, ToastContainer } from 'react-toastify';
import { router } from "./app.routes";
import './features/shared/global.scss'
import AuthProvider from "./features/auth/AuthContext";
import PostProvider from "./features/post/PostContext";
const App = () => {
  return (
    <>
      <AuthProvider>
        <PostProvider>

          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </PostProvider>
      </AuthProvider>
    </>
  )
}

export default App