import { getBackendURLPrefix } from "@/backend/utils";
import { Product } from "./types";

export type { Product as IProduct };

export const fetchProducts = async () => {
  const res = await fetch(`${getBackendURLPrefix()}/products`);
  const products = await res.json();
  return products as Product[];
};

function getDiscountPercentage(product: Product) {
  return ((product.mrp - product.sellPrice) / product.mrp) * 100;
}

const Product = {
  getDiscountPercentage,
};

export default Product;
