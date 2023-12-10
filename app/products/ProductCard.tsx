"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import { Image } from "@nextui-org/image";
import { Product } from "../types";
import { Link } from "@nextui-org/link";

type Props = {
  product: Product;
};

export default function ProductCard(props: Props) {
  const { product } = props;
  console.log("product :>> ", product);
  return (
    <Card className="max-w-[600px] p-4">
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative h-full col-span-6 md:col-span-4">
            <Image
              alt={product.name}
              className="object-cover"
              shadow="md"
              src={`http://localhost:8080/media/${product.imageUrls[0]}`}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8 h-40 justify-between">
            <h1 className="relative w-full flex-none text-lg font-semibold text-foreground line-clamp-3">
              <Link
                className="relative w-full flex-none text-lg font-semibold text-foreground line-clamp-3"
                href={`/products/${product.slug}`}
                title={product.name}
              >
                {product.name}
              </Link>
            </h1>
            <div className="relative flex flex-wrap items-baseline">
              <span className="relative text-lg font-semibold text-foreground">
                ₹{product.sellPrice}
              </span>
              <span className="relative line-through font-semibold text-default-400 ml-3">
                ₹350
              </span>
              <span className="relative font-normal text-success ml-3">
                20% off
              </span>
            </div>
            <div className="flex space-x-4 ">
              <Button color="primary">Buy</Button>
              <Button color="primary" variant="light">
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
