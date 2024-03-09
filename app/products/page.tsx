import ProductCard from "./ProductCard";
import { Product } from "../types";
import Categories from "./Categories";
import { Category } from "@/types";
import { getBackendURLPrefix } from "@/backend/utils";

const getProducts = async () => {
  const res = await fetch(`${getBackendURLPrefix()}/products`);
  const products = await res.json();
  return products as Product[];
};

const getCategories = async () => {
  const res = await fetch(`${getBackendURLPrefix()}/product-categories`);
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
