import { Product } from "@/app/types";
import ProductDetailImage from "./ProductDetailImage";
import ProductDetailInfo from "./ProductDetailInfo";

interface Props {
  product: Product;
}

const ProductDetailCard = (props: Props) => {
  const { product } = props;
  return (
    <div className="grid grid-cols-2 gap-8">
      <ProductDetailImage imageUrls={product.imageUrls} alt={product.name} />
      <ProductDetailInfo product={product} />
    </div>
  );
};

export default ProductDetailCard;
