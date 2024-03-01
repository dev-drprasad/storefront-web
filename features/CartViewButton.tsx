"use client";

import { useContext } from "react";
import { CartContext } from "./context";
import { Button } from "@nextui-org/button";
import { CartIcon } from "@/components/icons";
import { Badge } from "@nextui-org/badge";

export function CartViewButton() {
  const { items } = useContext(CartContext)!;

  return (
    <Badge color="danger" content={Object.keys(items).length} shape="circle">
      <Button isIconOnly>
        <CartIcon />
      </Button>
    </Badge>
  );
}
