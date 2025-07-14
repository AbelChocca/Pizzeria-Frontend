import { useState } from "react"
import useAuth from "../hooks/useAuth"
import useCart from "../hooks/useCart";
import Loading from "./Loading";

const Carrito = () => {
  const { user } = useAuth();
  const { loading, cart, eliminarItemCarrito, costoTotal } = useCart();
  const [isOpen, setOpened] = useState<boolean>(false);

  if (!user) return;

  return (
    <>
    {isOpen ? (
      <div className="fixed bottom-0 right-0 z-50 m-10 bg-white w-100 h-100 shadow-xl border-t-4 border-red-400 flex flex-col justify-between">
        <div className="w-full h-auto p-2 border-b-4 border-red-400 flex justify-between">
          <div className="flex items-center space-x-4">
            <img 
            className="w-10 h-10"
            src="https://cdn-icons-png.flaticon.com/512/1404/1404945.png" 
            alt="pizzaIcon" />
            <h1 className="text-xl font-mono">Carrito de compras</h1>
          </div>
          <button 
          onClick={() => setOpened(false)}
          className="m-2 font-bold text-red-400 hover:bg-gray-200 hover:scale-120 p-1 transition duration-1000 cursor-pointer rounded-full">X</button>
        </div>
        <div className="flex flex-col p-4 items-center">
          {loading && <Loading />}
          {!loading && cart?.length == 0 ? (
            <p>No hay pedidos agregados a su carrito.</p>
          ) : (
            <div>
              {cart?.map(pedido => (
                <div
                className="w-80 h-20 shadow-lg border-t-4 border-red-400 flex"
                key={pedido.id}>
                  <img 
                  className="w-20 h-full"
                  alt="imagenPedido" 
                  src={pedido.producto?.image_url} />
                  <div className="flex flex-col">
                    <h1 className="ml-1 font-mono">{pedido.producto?.nombre}</h1>
                    <p className="ml-1 font-bold">precio/u: <span className="text-red-400">S/{pedido.producto?.precio}</span></p>
                    <p className="ml-1 text-[14px]">Cantidad: <span className="font-bold text-lg">{pedido.cantidad}</span></p>
                  </div>
                  <div className="m-auto">
                    <button 
                    onClick={() => eliminarItemCarrito(pedido.id)}
                    className="bg-red-400 p-1 rounded-lg">
                      <img 
                      alt="ImagenDelete"
                      className="w-5 h-5 hover:-translate-y-5 transition duration-1000 cursor-pointer"
                      src="https://cdn-icons-png.flaticon.com/512/860/860829.png" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart && (
          <div className="w-full border-red-400 border-t-4 h-20 flex justify-between p-4 items-center">
            <p className=" font-bold">Cant. Pedidos: {cart?.length}</p>
            <p className="font-bold">Costo total: <span className="text-red-900 text-xl">S/{costoTotal}</span></p>
          </div>
          )}
      </div>
    ) : (
      <div className="fixed bottom-0 right-0 m-10 z-50 bg-white p-4 rounded-full shadow-xl cursor-pointer">
      <img
      onClick={() => setOpened(true)}
      className="w-12 h-12 hover:-translate-y-5 transition duration-1000"
      alt="Carrito" 
      src="https://cdn-icons-png.flaticon.com/512/106/106772.png" />
    </div>
  )
  }
  </>
  )
}

export default Carrito
