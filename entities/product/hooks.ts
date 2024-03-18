import { useEffect, useState } from "react";
import { Product, fetchProducts } from ".";

export function useProducts() {
  const [[data, loading], setState] = useState<
    [Product[] | undefined, boolean]
  >([undefined, true]);

  useEffect(() => {
    setState([undefined, true]);
    fetchProducts()
      .then((products) => {
        setState([products, false]);
      })
      .catch(() => {
        setState([undefined, false]);
      });
  }, []);

  return { data, loading };
}
