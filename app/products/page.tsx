import ProductCard from "@/features/ProductCard/ProductCard";
import Categories from "@/features/Categories";
import { Category } from "@/types";
import { getBackendURLPrefix } from "@/backend/utils";
import { fetchProducts } from "@/entities/product";

const getCategories = async () => {
  const res = await fetch(`${getBackendURLPrefix()}/product-categories`);
  const categories = await res.json();
  return categories as Category[];
};

export default async function ProductsPage() {
  const products = await fetchProducts();
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
