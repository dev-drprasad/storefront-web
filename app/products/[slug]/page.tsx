import { Product } from "@/app/types";
import React from "react";

import ProductDetailCard from "./ProductDetailCard";

interface URLParams {
  slug: string;
}

interface Props {
  params: URLParams;
}

export const getProductBySlug = async (slug: string) => {
  const res = await fetch(`http://localhost:8080/api/products/${slug}`);
  const products = await res.json();
  return products as Product;
};

const ProductDetail = async (props: Props) => {
  const {
    params: { slug },
  } = props;

  const product = await getProductBySlug(slug);

  return (
    <div>
      <ProductDetailCard product={product} />
    </div>
  );
};

export default ProductDetail;
