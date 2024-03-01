"use client";

import { Button } from "@nextui-org/button";
import QuantityInput from "./QuantityInput";
import { useContext, useState } from "react";
import { CartContext } from "@/features/context";

interface Props {
  itemId: string;
  price: number;
}

export function ProductDetailBuyActions(props: Props) {
  const { itemId, price } = props;

  const [quantity, setQuantiy] = useState(1);
  const { upsertItem } = useContext(CartContext)!;

  const handleAddCart = () => {
    upsertItem({
      itemId: itemId,
      quantity,
      price,
    });
  };

  return (
    <div className="mb-8 grid grid-cols-3 gap-4 content-start">
      <QuantityInput onChange={setQuantiy} defaultValue={1} />
      <Button size="lg" className="mr-8" onClick={handleAddCart}>
        Add to cart
      </Button>
      <Button size="lg" color="primary">
        Buy
      </Button>
    </div>
  );
}
