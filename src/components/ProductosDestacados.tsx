import type { Product } from '../interfaces/Producto'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'

interface ProductosDestacadosProps {
    productosDestacados: Product[]
}

const ProductosDestacados = ({ productosDestacados }: ProductosDestacadosProps) => {
  return (
          <div className='m-auto w-[90%]'>
            <Swiper
              spaceBetween={40}
              slidesPerView={2}
              navigation={true}
              pagination={{ clickable: true}}
              className='mySwiper'
              modules={[Pagination, Navigation]}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                768: {
                slidesPerView: 3,
                spaceBetween: 30,
                },
                1024: {
                slidesPerView: 4,
                spaceBetween: 40,
                },
              }}
            >
              {productosDestacados.map(producto => (
                <SwiperSlide key={producto.id}>
                  <div className='bg-white shadow-lg h-auto flex flex-col items-start mt-4 p-6 hover:scale-95 transition duration-1000 border-t-5 border-red-400'>
                    <img src={producto.image_url} alt='Pizza imagen' className='w-full h-[120px] rounded-xs inset-shadow-indigo-500'/>
                    <h1 className='font-bold text-lg mt-2'>{producto.nombre}</h1>  
                    <p className='text-[14px] text-gray-500 '>{producto.descripcion.slice(0, 25)}...</p>
                    <p className='bg-yellow-500 font-bold p-2 text-[14px] rounded-xl mt-1'>{producto.tamaño}</p>
                    <p className='font-bold text-[16px] text-xl mt-4'>desde <span className='text-red-400 text-xl'>S/{producto.precio}</span></p>
                    <Link to={`/pizzas/${producto.nombre}`} >
                      <button className='mt-1 bg-red-400 lg:text-[14px] text-white font-600 font-mono p-2 rounded-lg cursor-pointer hover:bg-red-700 hover:font-bold transition duration-500'>
                      Ver detalle
                      </button>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
  )
}

export default ProductosDestacados
