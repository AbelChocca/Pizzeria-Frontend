import { useState, useEffect } from "react"
import type { Product } from "../interfaces/Producto"
import Header from "../components/Header"
import api from "../api/config"
import Loading from "../components/Loading"
import useAuth from "../hooks/useAuth"
import Carrito from "../components/Carrito"
import useCart from "../hooks/useCart"
import { useParams, useNavigate } from "react-router-dom"

const PizzaDetailPage: React.FC = () => {
    const { user } = useAuth();
    const { cart } = useCart();
    const { agregarItemCarrito } = useCart();
    const navigate = useNavigate();

    const [pizza, setPizza ] = useState<Product | null >(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [advertencia, setAdvertencia] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [info, setInfo] = useState<boolean>(false);
    const [cantidad, setCantidad] = useState<number>(1);
    const { pizzaNombre } = useParams<{ pizzaNombre: string }>();

    const fetchPizzaDetails = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await api.get(`/productos/${pizzaNombre}`)
            setPizza(res.data);
        }
        catch (err) {
            setError(true);
            console.log('Error al encontrar el producto por su identificacion: ', err);
            setPizza(null);
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        fetchPizzaDetails();
    }, [pizzaNombre])

    const handlePedido = async ({ producto_id, cantidad }: { producto_id: number, cantidad: number}) => {
        if (!user) {
            navigate('/login');
            return;
        }

        const existingItem = cart?.find(item => item.producto?.id == producto_id);

        if (existingItem){
            await agregarItemCarrito({producto_id, cantidad});
            return;
        }

        if ((cart?.length ?? 0) >= 3) {
            setAdvertencia(true);
            return;
        }

        // Agregar al carrito
        await agregarItemCarrito({producto_id, cantidad});
        return;
    }
 
  return (
    <div>
      <Header></Header>
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        {isLoading && !error && (
            <div className="flex flex-col items-center justify-center w-full">  
                <Loading />
                <p>Cargando producto..</p>
            </div>
        )}
        {!isLoading && !error && pizza && (
            <div className="w-200 h-100 flex flex-wrap rounded-xl drop-shadow-xl">
                <img alt="Imagen de la Pizza" className="w-[50%] h-full rounded-xl" src={pizza.image_url} />
                <div className="flex flex-col justify-between w-[50%] bg-gray-100 p-4">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-red-400 font-bold text-2xl">{pizza.nombre}</h1>
                            <p className="m-2">{pizza.descripcion}</p>
                            <p className="m-2 mt-4">Tamaño: <span className="bg-yellow-400 rounded-lg p-1 text-center">{pizza.tamaño}</span></p>
                        </div>
                        <div>
                            <button 
                            onClick={() => setInfo(true)}
                            className="bg-gray-600 text-white rounded-full text-center h-6 w-6 cursor-pointer"
                            >?</button>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <p className="font-bold m-2">desde <span className="text-red-400 text-2xl">S/{pizza.precio}</span></p>
                            <div className="w-22 h-10  flex justify-around items-center">
                                <button
                                onClick={() => setCantidad(prev => prev - 1)}
                                disabled={cantidad <= 1 ? true : false} 
                                className="font-bold bg-gray-200 p-2 rounded-full cursor-pointer hover:scale-95 transition duration-500">{'<'}</button>
                                <p className="text-2xl">{cantidad}</p>
                                <button 
                                className="font-bold bg-gray-200 p-2 rounded-full cursor-pointer hover:scale-95 transition duration-500"
                                onClick={() => setCantidad(prev => prev + 1)}
                                disabled={cantidad >= 3 ? true : false}>{'>'}</button>
                            </div>
                        </div>
                        <button 
                        onClick={() => handlePedido({
                            producto_id: pizza.id,
                            cantidad: cantidad
                        })}
                        className="bg-red-400 text-white p-2 m-2 rounded-lg w-full font-bold cursor-pointer hover:scale-95 transition duration-1000">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        )}
        {info && (
            <div className="flex justify-center items-center fixed inset-0 bg-black/30">
                <div className="bg-white w-80 h-35 p-5 flex flex-col items-center text-center rounded-lg">
                    <p>Para añadir productos a tu carrito, por favor inicia sesión o regístrate.</p>
                    <button 
                    onClick={() => setInfo(false)}
                    className="bg-blue-400 text-white p-2 m-2 rounded-lg cursor-pointer">Aceptar</button>
                </div>
            </div>
        )}
      </div>
      {advertencia && (
        <div className="flex justify-center items-center fixed inset-0 bg-black/30">
            <div className="bg-white w-80 h-35 p-5 flex flex-col items-center text-center rounded-lg">
                <p className="font-bold">No puede agregar más de 3 pedidos al carrito</p>
                <button className="bg-red-400 text-white m-2 p-2 rounded-lg cursor-pointer" onClick={() => setAdvertencia(false)}>
                Aceptar
                </button>
            </div>
        </div>
      )}
       {user && <Carrito />}
    </div>
  )
}

export default PizzaDetailPage
