import { Product } from "@/app/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import QuantityInput from "./QuantityInput";

interface Props {
  product: Product;
}

const ProductDetailInfo = (props: Props) => {
  const { product } = props;

  return (
    <div className="grid">
      <div>
        <h1 className="text-lg font-semibold text-foreground line-clamp-3">
          {product.name}
        </h1>
        <span className="font-semibold text-default-400">
          SKU: {product.id}
        </span>
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
      </div>
      <div className="mb-8 grid grid-cols-3 gap-4 content-start">
        <QuantityInput defaultValue={1} />
        <Button size="lg" className="mr-8">
          Add to cart
        </Button>
        <Button size="lg" color="primary">
          Buy
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
