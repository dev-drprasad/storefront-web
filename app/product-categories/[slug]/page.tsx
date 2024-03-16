import ProductCard from "@/features/ProductCard";
import { Product } from "../../types";
import Categories from "@/features/Categories";
import { Category } from "@/types";
import { getBackendURLPrefix } from "@/backend/utils";

const getProductsByCategorySlug = async (slug: string) => {
  const res = await fetch(
    `${getBackendURLPrefix()}/products?categorySlug=${slug}`
  );
  const products = await res.json();
  return products as Product[];
};

const getCategories = async () => {
  const res = await fetch(`${getBackendURLPrefix()}/product-categories`);
  const categories = await res.json();
  return categories as Category[];
};

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductCategoriesPage(props: Props) {
  const {
    params: { slug },
  } = props;
  const products = await getProductsByCategorySlug(slug);
  const categories = await getCategories();

  return (
    <div className="flex">
      <Categories
        className="flex-none"
        categories={categories}
        selected={slug}
      />
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
