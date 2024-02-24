import { Input, InputProps } from "@nextui-org/input";
import { LockIcon, EyeIcon, EyeOffIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { ForwardedRef, forwardRef, useState } from "react";

interface IProps extends InputProps {
  disableVisibityChange?: boolean;
}

export const PasswordField = forwardRef(function PasswordField_(
  props: IProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [isVisible, toggleVisibility] = useBoolean();
  const { placeholder, className, label, disableVisibityChange, ...restProps } =
    props;

  const lockIconEl = (
    <LockIcon className="text-default-400 pointer-events-none" />
  );

  const showPasswordButton = (
    <Button
      variant="light"
      aria-label={isVisible ? "Hide Password" : "Show Password"}
      onClick={toggleVisibility}
      isIconOnly
    >
      {isVisible ? <EyeOffIcon /> : <EyeIcon />}
    </Button>
  );

  return (
    <Input
      ref={ref}
      {...restProps}
      className={`${className} mb-4`}
      startContent={lockIconEl}
      endContent={!disableVisibityChange ? showPasswordButton : undefined}
      classNames={{
        mainWrapper: "mb-4",
        input:
          "bg-transparent" /* TODO: default `!bg-transparent` not working, so added again */,
      }}
      label={label}
      placeholder={placeholder}
      type={isVisible ? "text" : "password"}
      variant="bordered"
      isRequired
    />
  );
});

function useBoolean(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  return [
    value,
    () => setValue((v) => !v),
    () => setValue(true),
    () => setValue(false),
  ] as [boolean, VoidFn, VoidFn, VoidFn];
}
