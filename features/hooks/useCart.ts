import { useEffect, useRef, useState } from "react";

interface CartItem {
  itemId: number;
  quantity: number;
  price: number;
  productTitle: string;
}

type Cart = Record<string, CartItem>;

export function useCart() {
  const mountedRef = useRef(false);
  const [items, setItems] = useState<Cart>({});

  const update = (itemId: number, quantityAdjustment: number) => {
    const existingItem = items[itemId];
    if (!existingItem) return;

    const updatedQuantity = existingItem.quantity + quantityAdjustment;
    if (updatedQuantity <= 0) {
      return;
    }

    setItems({
      ...items,
      [existingItem.itemId]: {
        ...existingItem,
        quantity: existingItem.quantity + quantityAdjustment,
      },
    });
  };

  const upsertItem = (item: CartItem) => {
    const existingItem = items[item.itemId];

    if (!existingItem) {
      setItems({ ...items, [item.itemId]: item });
      return;
    }

    update(existingItem.itemId, item.quantity);
  };

  const increaseQuantity = (itemId: string) => update(itemId, 1);

  const decreaseQuantity = (itemId: string) => update(itemId, -1);

  const removeItem = (itemId: string) => {
    const { [itemId]: _, ...updateItems } = items;
    setItems(updateItems);
  };

  useEffect(() => {
    if (!mountedRef.current) return;
    // lets wait for initial value from local storage to set
    setValueInLS(items);
  }, [items]);

  // in nextjs we can't use useState functional arg to derive initial value due text doesn't match error
  useEffect(() => {
    setItems(getInitialValueFromLS());
  }, []);

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  return {
    items: items as Readonly<Cart>,
    upsertItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  };
}

function getInitialValueFromLS(): Cart {
  if (typeof window === "undefined") return {}; // server-side rendering)

  const value = window.localStorage.getItem("cart");
  if (!value) return {};
  try {
    return JSON.parse(value);
  } catch (err) {
    console.error(err);
    return {};
  }
}

function setValueInLS(cart: Cart) {
  if (typeof window === "undefined") return; // server-side rendering)
  window.localStorage.setItem("cart", JSON.stringify(cart));
}
