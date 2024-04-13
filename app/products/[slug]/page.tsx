import React from "react";
import ProductDetailCard from "./ProductDetailCard";
import { getBackendURLPrefix } from "@/backend/utils";
import { Product } from "@/app/types";
import { MDXRemote } from "next-mdx-remote/rsc";

interface URLParams {
  slug: string;
}

interface Props {
  params: URLParams;
}

const getProductBySlug = async (slug: string) => {
  const res = await fetch(`${getBackendURLPrefix()}/products/${slug}`);
  const products = await res.json();
  return products as Product;
};

const ProductDetail = async (props: Props) => {
  const {
    params: { slug },
  } = props;

  const product = await getProductBySlug(slug);

  return (
    <div className="flex flex-col gap-8">
      <ProductDetailCard product={product} />

      <div className="p-4 rounded-lg border border-default-200">
        <MDXRemote
          components={{
            a: (props) => props.children,
            h3: (props) => (
              <h3 className="text-lg font-bold mb-4 mt-8">{props.children}</h3>
            ),
            h4: (props) => (
              <h4 className="text-md font-bold mb-4 mt-8">{props.children}</h4>
            ),
            ul: (props) => (
              <ul className="list-inside list-disc">{props.children}</ul>
            ),
            pre: (props) => <pre className="mt-2 mb-2">{props.children}</pre>,
          }}
          source={product.descriptionMarkdown}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
