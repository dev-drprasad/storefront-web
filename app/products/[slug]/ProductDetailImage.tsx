import { Image } from "@nextui-org/image";

interface Props {
  imageUrls: string[];
  alt: string;
}

const ProductDetailImage = (props: Props) => {
  const { imageUrls } = props;
  return (
    <Image
      src={`http://localhost:8080/media/${imageUrls[0]}`}
      alt={props.alt}
    />
  );
};

export default ProductDetailImage;
