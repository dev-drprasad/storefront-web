"use client";

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { IncDecButtons } from "./IncDecButtons";
import { useContext } from "react";
import { CartContext } from "./context";
import { Button } from "@nextui-org/button";
import { TrashIcon } from "@/components/icons";
import Money from "@/entities/money";

interface Props {
  className?: string;
}

export function Cart(props: Props) {
  const { className = "" } = props;
  const { items, increaseQuantity, decreaseQuantity, removeItem } =
    useContext(CartContext)!;

  return (
    <Listbox className={className} variant="flat">
      {Object.values(items).map((item) => (
        <ListboxItem
          className="mb-4"
          key={item.itemId}
          classNames={{ title: "w-full" }}
          description={
            <div className="flex justify-between items-center gap-8 mt-2">
              <div className="flex gap-2 items-center">
                <IncDecButtons
                  value={item.quantity}
                  onIncreament={() => increaseQuantity(item.itemId)}
                  onDecreament={() => decreaseQuantity(item.itemId)}
                />
                * {Money.format(item.price)}
              </div>
              <Button
                size="sm"
                onClick={() => removeItem(item.itemId)}
                variant="ghost"
                color="danger"
                isIconOnly
              >
                <TrashIcon />
              </Button>
            </div>
          }
        >
          <div className="flex justify-between">
            {item.productTitle}
            <span>{Money.format(item.quantity * item.price)}</span>
          </div>
        </ListboxItem>
      ))}
    </Listbox>
  );
}
