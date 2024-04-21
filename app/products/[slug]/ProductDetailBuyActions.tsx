"use client";

import { Button } from "@nextui-org/button";
import QuantityInput from "./QuantityInput";
import { useContext, useState } from "react";
import { CartContext } from "@/features/context";
import { classnames } from "@/components/primitives";

interface Props {
  productId: number;
  price: number;
  productTitle: string;
}

export function ProductDetailBuyActions(props: Props) {
  const { productId, price, productTitle } = props;

  const [quantity, setQuantiy] = useState(1);
  const { upsertItem } = useContext(CartContext)!;

  const handleAddCart = () => {
    upsertItem({
      itemId: productId,
      quantity,
      price,
      productTitle,
    });
  };

  return (
    <div className="mb-8 grid grid-cols-3 gap-4 content-start">
      <span className={`bg-default-100 p-2 ${classnames.border}`}>
        <span>Quantity: </span>
        <QuantityInput onChange={setQuantiy} defaultValue={1} />
      </span>
      <Button size="lg" className="mr-8" onClick={handleAddCart}>
        Add to cart
      </Button>
      <Button size="lg" color="primary">
        Buy
      </Button>
    </div>
  );
}
