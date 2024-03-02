"use client";

import { useContext, useState } from "react";
import { CartContext } from "./context";
import { Button } from "@nextui-org/button";
import { CartIcon } from "@/components/icons";
import { Badge } from "@nextui-org/badge";
import { useRouter } from "next/navigation";
import { Cart } from "./Cart";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

export function CartViewButton() {
  const router = useRouter();
  const { items } = useContext(CartContext)!;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Badge color="danger" content={Object.keys(items).length} shape="circle">
        <Button onClick={() => setOpen(true)} isIconOnly>
          <CartIcon />
        </Button>
      </Badge>

      <Modal
        placement="top"
        isOpen={open}
        onOpenChange={setOpen}
        style={{ height: "calc(100% - 8rem)" }}
        classNames={{ wrapper: "justify-end" }}
      >
        <ModalContent>
          <ModalHeader>Cart</ModalHeader>
          <ModalBody>
            <Cart />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                setOpen(false);
                router.push("/checkout");
              }}
              fullWidth
            >
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
