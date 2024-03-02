import { Product } from "@/app/types";
import { ProductDetailBuyActions } from "./ProductDetailBuyActions";

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
      <ProductDetailBuyActions
        productTitle={product.name}
        productId={product.slug}
        price={product.sellPrice}
      />
    </div>
  );
};

export default ProductDetailInfo;
