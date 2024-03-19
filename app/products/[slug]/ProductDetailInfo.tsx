import { ProductDetailBuyActions } from "./ProductDetailBuyActions";
import Money from "@/entities/money";
import Product, { IProduct } from "@/entities/product";
import { formatPercentage } from "@/shared/utils";

interface Props {
  product: IProduct;
}

const ProductDetailInfo = (props: Props) => {
  const { product } = props;

  return (
    <div className="grid">
      <div>
        <h1 className="text-2xl font-semibold text-foreground line-clamp-3">
          {product.name}
        </h1>
        <span className="font-semibold text-default-400">
          SKU: {product.id}
        </span>
        <div className="relative flex flex-wrap items-baseline">
          <span className="relative text-lg font-semibold text-foreground">
            {Money.format(product.sellPrice)}
          </span>
          <span className="relative line-through font-semibold text-default-400 ml-3">
            {Money.format(product.mrp)}
          </span>
          <span className="relative font-normal text-success ml-3">
            {formatPercentage(Product.getDiscountPercentage(product))}
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
