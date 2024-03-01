import { useState } from "react";

interface CartItem {
  itemId: string;
  quantity: number;
  price: number;
}

type Cart = Record<string, CartItem>;

export function useCart() {
  const [items, setItems] = useState<Cart>({});

  const update = (itemId: string, quantityAdjustment: number) => {
    const existingItem = items[itemId];
    if (!existingItem) return;

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

  return {
    items: items as Readonly<Cart>,
    upsertItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  };
}
