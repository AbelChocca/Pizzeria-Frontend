import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import RequireAuth from '../hooks/requireAuth'
import Carrito from '../components/Carrito'
import PizzaDetailPage from '../pages/PizzaDetailPage'

const RoutesConfig = () => {
  return (
    <Routes>
        <Route index path='/' element={<Layout/>}></Route>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/pizzas/:pizzaNombre' element={<PizzaDetailPage />} />

        <Route element={<RequireAuth />}>
          <Route path='/carrito' element={<Carrito />} />
        </Route>
    </Routes>
  )
}

export default RoutesConfig
