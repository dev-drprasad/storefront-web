"use client";

import {
  ShippingAddressForm,
  type IFormData,
} from "@/features/ShippingAddressForm";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Checkbox } from "@nextui-org/checkbox";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Form = ReturnType<typeof useForm<IFormData>>;
type Register = Form["register"];
interface Props {
  states: { name: string; stateCode: string }[];
  register: Register;
  errors?: Form["formState"]["errors"];
}

export function BillingAddress(props: Props) {
  const { states, register, errors } = props;
  const { status } = useSession();
  const [isSameAsShippingAddress, setIsSameAsShippingAddress] = useState(true);

  return (
    <Card isDisabled={status !== "authenticated"}>
      <CardHeader className="flex justify-between">
        Billing Address
        <Checkbox
          onValueChange={setIsSameAsShippingAddress}
          isSelected={isSameAsShippingAddress}
          disabled={status !== "authenticated"}
        >
          Same as shipping address
        </Checkbox>
      </CardHeader>

      <CardBody className="p-4">
        {status === "authenticated" ? (
          !isSameAsShippingAddress && (
            <ShippingAddressForm
              states={states}
              errors={errors}
              register={register}
            />
          )
        ) : (
          <div className="text-center">Login to proceed</div>
        )}
      </CardBody>
    </Card>
  );
}

export type { IFormData as BillingAddressFormValues };
