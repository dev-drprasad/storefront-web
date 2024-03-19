import { getBackendURLPrefix } from "@/backend/utils";
import { IProduct } from "./types";

export type { IProduct };

export const fetchProducts = async () => {
  const res = await fetch(`${getBackendURLPrefix()}/products`);
  const products = await res.json();
  return products as IProduct[];
};

function getDiscountPercentage(product: IProduct) {
  return ((product.mrp - product.sellPrice) / product.mrp) * 100;
}

const Product = {
  getDiscountPercentage,
};

export default Product;
