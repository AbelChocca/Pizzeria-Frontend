import React, { useState } from 'react'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { login } = useAuth();
  const nagivate = useNavigate();

  const [email, SetEmail] = useState<string>('');
  const [password, SetPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      nagivate('/home');
    } catch (err) {
      alert('Error al inicar session');
    }
  }

  return (
    <div>
      <Header></Header>
      <div className='flex flex-col items-center min-h-screen min-w-screen'>
        <div className='flex items-center space-x-4 mt-20'>
            <img src='https://cdn-icons-png.flaticon.com/512/1404/1404945.png' className='w-15 h-15' alt='Pizza Icono'></img>
            <h1 className='text-2xl font-bold font-mono'>Pizzeria Angelita Login</h1>
        </div> 
        <form onSubmit={handleSubmit} className='flex flex-wrap gap-4 justify-center items-center flex-col p-4'>
            <label>Email</label>  
                <input
                value={email}
                onChange={e => SetEmail(e.target.value)}
                className='bg-gray-100 p-1 w-80'
                type='email' />
            <label >Contraseña</label>
                <input 
                value={password}
                onChange={e => SetPassword(e.target.value)}
                type='password'
                className='bg-gray-100 p-1 w-80'
                />
            <button 
            className='bg-red-300 p-2 mt-5 rounded-xl cursor-pointer'
            type='submit'
            >Iniciar sesión</button>
        </form>
      </div>
    </div>
  )
}

export default Login
