"use client";

import { createContext } from "react";
import { useCart } from "./hooks/useCart";

export const CartContext = createContext<
  ReturnType<typeof useCart> | undefined
>(undefined);
