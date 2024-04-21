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
        {product.bulletPoints.length > 0 && (
          <div className="my-16">
            <div className="font-semibold">About this item:</div>
            <ul className="list-inside list-disc">
              {product.bulletPoints.map((bulletPoint) => (
                <li key={bulletPoint}>{bulletPoint}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <div className="relative flex flex-wrap items-baseline mb-8">
          <span className="relative text-2xl font-semibold text-foreground">
            {Money.format(product.sellPrice)}
          </span>
          <span className="relative line-through font-semibold text-default-400 ml-3">
            {Money.format(product.mrp)}
          </span>
          <span className="relative font-normal text-success ml-3">
            {formatPercentage(Product.getDiscountPercentage(product))}
          </span>
        </div>

        <ProductDetailBuyActions
          productTitle={product.name}
          productId={product.slug} // why `slug` ?
          price={product.sellPrice}
        />
      </div>
    </div>
  );
};

export default ProductDetailInfo;
