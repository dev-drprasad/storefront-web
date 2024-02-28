import { Input, InputProps } from "@nextui-org/input";
import { ForwardedRef, forwardRef } from "react";

export const InputField = forwardRef(function Input_(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { classNames, variant, ...restProps } = props;
  const updatedClassNames = {
    ...classNames,
    base: "mb-2",
    input:
      "bg-transparent" /* TODO: default `!bg-transparent` not working, so added again */,
  };
  return (
    <Input
      {...restProps}
      ref={ref}
      classNames={updatedClassNames}
      variant={variant || "bordered"}
    />
  );
});
