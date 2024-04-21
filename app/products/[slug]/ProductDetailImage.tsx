"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useState } from "react";

interface Props {
  imageUrls: string[];
  alt: string;
}

const ProductDetailImage = (props: Props) => {
  const { imageUrls, alt } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <div className="flex">
      <div className="flex flex-col gap-4 px-4">
        {imageUrls.map((imageUrl, index) => (
          <Card
            shadow="sm"
            radius="lg"
            key={imageUrl}
            onClick={() => setCurrentImageIndex(index)}
            className={
              currentImageIndex === index
                ? "outline outline-4 rounded-[1.1rem] outline-primary-400"
                : ""
            }
            isPressable
          >
            <CardBody className="p-1">
              <Image
                shadow="sm"
                alt={`${alt} ${index + 1}`}
                className="object-cover w-[75px] h-[75px]"
                src={`/media/${imageUrl}`}
              />
            </CardBody>
          </Card>
        ))}
      </div>
      <Image
        shadow="sm"
        radius="lg"
        src={`/media/${imageUrls.at(currentImageIndex)}`}
        alt={alt}
        width={550}
        height={550}
        className={`object-contain w-[550px] h-[550px]`}
      />
    </div>
  );
};

export default ProductDetailImage;
