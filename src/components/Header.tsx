import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Menu from './Menu'

const Header = () => {
    const { user, logout } = useAuth();
  return (
    <header className='w-full h-15 flex items-center bg-white border-b-4 border-red-400 justify-around'>
        <div className='flex items-center space-x-2 m-2'>
            <img
                src='https://cdn-icons-png.flaticon.com/512/1404/1404945.png'
                className='w-10 h-10'
                alt='Pizzeria Icons'
            ></img>
            <h1 className='font-bold font-mono'>Angelita Pizzeria</h1>
        </div>
        <ul className='flex p-2 space-x-12'>
            <Link to="/home">
                <img src='/icons/HomeIcon.webp' className='w-8 h-8 hover:scale-110 transition duration-1000'/>
            </Link>
            <Link to="/contactos">
                <img src='/icons/ContactoIcon.webp' className='w-8 h-8 hover:scale-110 transition duration-1000'/>
            </Link>   
        </ul>
            {user ? 
            <div>
                <Menu logout={logout} />
            </div> :
            <div className='flex space-x-2 text-white p-2'>
                <Link to="/login">
                    <button className='bg-red-400 p-1 rounded-xs cursor-pointer transform hover:scale-95 duration-1000'>Iniciar Sesión</button>
                </Link>
                <Link to="/register">
                    <button className='bg-red-400 p-1 rounded-xs cursor-pointer transform hover:scale-95 duration-1000'>Registrarse</button>
                </Link>
            </div>
            }
    </header>
  )
}

export default Header
