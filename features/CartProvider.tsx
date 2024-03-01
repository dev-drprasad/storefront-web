import { useCart } from "./hooks/useCart";
import { CartContext } from "./context";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useCart();

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}
