import { useState, useEffect, useMemo, createContext, type ReactNode, useContext } from "react"
import api from "../api/config";
import useAuth from "./useAuth";
import type { CartItemProps, CartContextType } from "../interfaces/CartItem";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState<CartItemProps[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        if (!user) { 
            setCart(null);
            setLoading(false);
            setError("Debes iniciar sesión para ver tu carrito.");
            return;
        }
        setLoading(true);
        setError(null);
        try{
            const response = await api.get('/carrito/', { withCredentials: true })
            setCart(response.data)
        } catch (err) {
            console.error('Error al cargar el carrito', err);
            setCart(null);
        } finally {
            setLoading(false);
        }
    }
    const agregarItemCarrito = async ({ producto_id, cantidad }: { producto_id: number, cantidad: number}) => {
        if (!user) { 
            setError("Debes iniciar sesión para agregar productos al carrito.");
            return;
        }
        setLoading(true);
        try {
            const res = await api.post('/carrito/', { producto_id, cantidad }, { withCredentials: true });
            console.log('Pedido agregado al carrito asincronicamente!');
            setCart(res.data);
        } catch (err) {
            console.log('Error al agregar producto al carrito', err);
        } finally {
            setLoading(false);
        }
    }
    const eliminarItemCarrito = async (item_cart_id: number ) => {
        if (!user) { 
            setError("Debes iniciar sesión para eliminar productos del carrito.");
            return;
        }
        setLoading(true);
        try {
            const res = await api.delete(`/carrito/${item_cart_id}`, { withCredentials: true });
            setCart(res.data);
            console.log('Producto del carrito eliminado correctamente')
        } catch (err) {
            console.log('Error al agregar producto al carrito', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [user])

    const costoTotal = useMemo(() => {
        if (!cart || cart.length == 0) {
            return 0;
        }

        const calculatedTotal = cart.reduce((sum, item) => {
            if (item.producto && typeof item.producto.precio == 'number') {
                return sum + (item.cantidad * item.producto.precio);
            }
            return sum
        }, 0)

        return calculatedTotal
    }, [cart])


  return (
    <CartContext.Provider value={{ 
        cart,
        loading,
        error,
        agregarItemCarrito,
        eliminarItemCarrito,
        costoTotal
    }}>
        {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un cartProvider")
    }
    return context
}

export default useCart;
