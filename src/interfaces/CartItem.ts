import type { Product } from "./Producto";

export interface CartItemProps {
    id: number;
    producto: Product
    cantidad: number;
}

export interface CartContextType {
    cart: CartItemProps[] | null;
    loading: boolean;
    error: string | null;
    agregarItemCarrito: (item: { producto_id: number, cantidad: number}) => Promise<void>;
    eliminarItemCarrito: (item_cart_id: number) => Promise<void>;
    costoTotal: number;
}