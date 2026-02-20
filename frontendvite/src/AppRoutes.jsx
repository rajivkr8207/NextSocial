import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import { useAuth } from './features/auth/hooks/useAuth'


const AppRoutes = () => {
  const { user } = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>helllo home pages {user?.username} </h1>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes