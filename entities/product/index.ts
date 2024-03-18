import { getBackendURLPrefix } from "@/backend/utils";
import { Product } from "./types";

export type { Product };

export const fetchProducts = async () => {
  const res = await fetch(`${getBackendURLPrefix()}/products`);
  const products = await res.json();
  return products as Product[];
};
