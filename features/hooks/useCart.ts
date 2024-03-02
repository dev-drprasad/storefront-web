import { useEffect, useState } from "react";

interface CartItem {
  itemId: string;
  quantity: number;
  price: number;
  productTitle: string;
}

type Cart = Record<string, CartItem>;

export function useCart() {
  const [items, setItems] = useState<Cart>(() => getInitialValueFromLS());

  const update = (itemId: string, quantityAdjustment: number) => {
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

  useEffect(() => setValueInLS(items), [items]);

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
