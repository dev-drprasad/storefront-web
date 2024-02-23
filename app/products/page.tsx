import { title } from "@/components/primitives";
import ProductCard from "./ProductCard";
import { getToken } from "next-auth/jwt";

import { Product } from "../types";
import Categories from "./Categories";
import { Category } from "@/types";
import { getServerSession } from "next-auth";

export const getProducts = async () => {
  const res = await fetch("http://localhost:8080/api/products");
  const products = await res.json();
  return products as Product[];
};

const getCategories = async () => {
  const res = await fetch("http://localhost:8080/api/categories");
  const categories = await res.json();
  return categories as Category[];
};

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();
  return (
    <div className="flex">
      <Categories className="flex-none" categories={categories} />
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
