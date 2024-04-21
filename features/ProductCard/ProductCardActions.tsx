import { Button } from "@nextui-org/button";
import { useContext } from "react";
import { CartContext } from "../context";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
  price: number;
  productTitle: string;
}

export function ProductCardActions(props: Props) {
  const { productId, productTitle, price } = props;
  const { upsertItem } = useContext(CartContext)!;
  const router = useRouter();
  const handleAddCart = () => {
    upsertItem({
      itemId: productId,
      quantity: 1,
      price,
      productTitle,
    });
  };

  const handleBuy = () => {
    handleAddCart();
    router.push("/checkout");
  };

  return (
    <div className="flex space-x-4 ">
      <Button color="primary" onClick={handleBuy}>
        Buy
      </Button>
      <Button color="primary" variant="light" onClick={handleAddCart}>
        Add to cart
      </Button>
    </div>
  );
}
