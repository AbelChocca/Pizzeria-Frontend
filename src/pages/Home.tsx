import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import SliderImages from '../components/SliderImages'
import api from '../api/config'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import ProductosDestacados from '../components/ProductosDestacados'
import type { Product } from '../interfaces/Producto'
import Carrito from '../components/Carrito'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
  const [productosDestacados, setProductosDestacados] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);
  const { user } = useAuth();
  // Estados para filtrar productos
  const [value, setValue] = useState('');
  const [productos, setProductos] = useState<Product[]>([]);

  // GET productos all/filtrados
  useEffect(() => {
    const filtrarProductos = async () => {
      try {
        const response = await api.get(`/productos/?q=${encodeURIComponent(value)}`);
        setProductos(response.data);
      }
      catch (err) {
        console.error('Error al cargar los productos: ', err);
      } 
    }

    const timeoutId = setTimeout(() => {
      filtrarProductos();
    }, 300)

    return () => clearTimeout(timeoutId);

  }, [value])
  // GET productos destacados
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await api.get('/productos/destacados')
        setProductosDestacados(response.data)
        setError(false);
      } 
      catch (err) {
        console.log('Error al cargar todos los productos:', err);
        setError(true);
      }
      finally {
        setCargando(false);
      }
    }

    obtenerProductos();
  }, [])

  const busquedaHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  return (
    <div>
      <Header></Header>
      <SliderImages />
      <h1 className='font-600 p-4 underline decoration-red-300 font-mono text-xl text-center'>Productos destacados</h1>
      {error && 
      <p>Error al cargar los datos</p>}
      {!error && !cargando && 
        <ProductosDestacados productosDestacados={productosDestacados} />
      }
    <div className='w-full mt-10 border-t-4 border-red-400'>
      <div className='flex w-full items-center space-x-4 border-b-4 border-red-400'>
        <img
          src='https://cdn-icons-png.flaticon.com/512/1404/1404945.png'
          className='w-10 h-10 m-4'
          alt='Pizzeria Icons'
        ></img>
        <h1 className='text-2xl '>Todos los productos</h1>
      </div>
      <div>
        <div className='flex w-full p-4 items-center'>
          <h1 className='bg-red-400 text-white p-5 text-[16px] font-mono m-4'>Filtrar busqueda</h1>
          <input 
          value={value}
          onChange={busquedaHandle}
          type='text' 
          className='w-[70%] h-10 p-6 border-1' 
          placeholder='Buscar producto por nombre o descripción' />
        </div>
        <div className='grid lg:grid-cols-4 gap-4 w-full justify-items-center md:grid-cols-3'>
          {productos.map(producto => (
            <div key={producto.id} className='grid border-2 border-red-400 w-64 h-82 font-mono p-4 content-between'>
              <img className='h-[130px] w-full rounded-lg' src={producto.image_url} />
              <div>
                <h1 className='text-[15px] mt-2 font-bold'>{producto.nombre}</h1>
                <p className='text-[11px] text-gray-600'>{producto.descripcion}</p>
                <h2 className='mt-1 bg-yellow-500 text-[12px] font-bold p-1 w-[70px] text-center rounded-lg'>{producto.tamaño}</h2>
              </div>
              <div>
                <div className='flex gap-2 text-center font-bold'>desde <p className='text-red-400 text-xl'>S/{producto.precio}</p></div>
                <Link to={`/pizzas/${producto.nombre}`} >
                  <button className='mt-1 w-full text-cennter bg-red-400 p-1 rounded-lg text-white'>Ver detalle
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

     {user && <Carrito />}
    </div>
  )
}

export default Home
