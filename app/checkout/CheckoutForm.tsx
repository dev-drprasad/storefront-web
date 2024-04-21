"use client";

import { Controller, useForm } from "react-hook-form";
import {
  BillingAddress,
  type BillingAddressFormValues,
} from "./BillingAddress";
import {
  ShippingAddress,
  type ShippingAddressFormValues,
} from "./ShippingAddress";
import { ProtectedCard } from "./ProtectedCard";
import { ShippingAddressForm } from "@/features/ShippingAddressForm";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

interface Props {
  states: { name: string; stateCode: string }[];
}

export function CheckoutForm({ states }: Props) {
  const { fields, errors, watch, handleSubmit, unregister } = useCheckoutForm();

  const [isBillingAddrSameAsShipping, setIsBillingAddrSameAsShipping] =
    useState(true);

  const onSubmit = (values) => {
    console.log("values :>> ", values);
  };

  useEffect(() => {
    if (isBillingAddrSameAsShipping) {
      unregister("billingAddress");
    } else {
    }
  }, [unregister, isBillingAddrSameAsShipping]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <ProtectedCard header="Shipping Address">
        {() => (
          <ShippingAddressForm
            states={states}
            // @ts-expect-error
            register={fields.shippingAddress}
            errors={errors.shippingAddress}
          />
        )}
      </ProtectedCard>
      <ProtectedCard
        header={
          <>
            Billing Address
            <Checkbox
              onValueChange={setIsBillingAddrSameAsShipping}
              isSelected={isBillingAddrSameAsShipping}
              aria-label="Is billing address same as shipping address ?"
            >
              Same as shipping address
            </Checkbox>
          </>
        }
      >
        {() =>
          !isBillingAddrSameAsShipping && (
            <ShippingAddressForm
              states={states}
              // @ts-expect-error
              register={fields.billingAddress}
              errors={errors.billingAddress}
            />
          )
        }
      </ProtectedCard>
      <Button size="lg" color="primary" type="submit" fullWidth>
        Place Order
      </Button>
    </form>
  );
}

interface FormData {
  shippingAddress: ShippingAddressFormValues;
  isBillingAddrSameAsShipping: boolean;
  billingAddress: BillingAddressFormValues;
}

function useCheckoutForm() {
  const { register, watch, formState, handleSubmit, unregister } =
    useForm<FormData>();

  return {
    handleSubmit,
    errors: formState.errors,
    watch,
    fields: {
      shippingAddress: (property: keyof ShippingAddressFormValues, options) =>
        register(`shippingAddress.${property}`, options),
      billingAddress: (property: keyof ShippingAddressFormValues, options) =>
        register(`billingAddress.${property}`, options),
    },
    unregister,
  };
}
