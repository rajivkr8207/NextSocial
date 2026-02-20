import AppRoutes from "./AppRoutes"
import AuthProvider from "./features/auth/auth.context"
import { ToastContainer } from 'react-toastify';
import './style.scss'
const App = () => {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App