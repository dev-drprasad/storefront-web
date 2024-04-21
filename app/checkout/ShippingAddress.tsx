"use client";

import {
  ShippingAddressForm,
  type IShippingAddressForm,
  type IFormData,
} from "@/features/ShippingAddressForm";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useSession } from "next-auth/react";

interface Props {
  states: { name: string; stateCode: string }[];
  register: IShippingAddressForm["register"];
  errors: IShippingAddressForm["errors"];
}

export function ShippingAddress(props: Props) {
  const { states, register, errors } = props;
  const { status } = useSession();
  return (
    <Card isDisabled={status !== "authenticated"}>
      <CardHeader>Shipping Address</CardHeader>
      <CardBody className="p-4">
        {status === "authenticated" ? (
          <ShippingAddressForm
            states={states}
            register={register}
            errors={errors}
          />
        ) : (
          <div className="text-center">Login to proceed</div>
        )}
      </CardBody>
    </Card>
  );
}

export type { IFormData as ShippingAddressFormValues };
