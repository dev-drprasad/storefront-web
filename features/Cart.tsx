"use client";

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useCart } from "./hooks/useCart";

interface Props {}

export function Cart(props: Props) {
  const { items } = useCart();

  return (
    <Listbox>
      {Object.values(items).map((item) => (
        <ListboxItem key={item.itemId}>
          <div className="flex justify-between">
            {item.itemId}
            {item.price * item.quantity}
          </div>
        </ListboxItem>
      ))}
    </Listbox>
  );
}
