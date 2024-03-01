"use client";

import { ShippingAddressForm } from "@/features/ShippingAddressForm";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";

interface Props {
  states: { name: string; stateCode: string }[];
}

export function BillingAddress(props: Props) {
  const { states } = props;
  const [isSameAsShippingAddress, setIsSameAsShippingAddress] = useState(true);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        Billing Address
        <Checkbox
          onValueChange={setIsSameAsShippingAddress}
          isSelected={isSameAsShippingAddress}
        >
          Same as shipping address
        </Checkbox>
      </CardHeader>
      {!isSameAsShippingAddress && (
        <CardBody className="p-4">
          <ShippingAddressForm states={states} />
        </CardBody>
      )}
    </Card>
  );
}
