import { Select, SelectItem, SelectProps } from "@nextui-org/select";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";

interface Props extends Omit<SelectProps, "children"> {
  states: { name: string; stateCode: string }[];
}

export const StateSelectField = forwardRef(function StateSelectField_(
  props: Props,
  ref: ForwardedRef<HTMLSelectElement>
) {
  const { states, onChange, onBlur, ...restProps } = props;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stateCode: string = event.target?.value || "";
    if (states.find((state) => state.stateCode === stateCode)) {
      setSelectedKeys([stateCode]);
      onChange?.(event);
    }
  };

  return (
    <Select
      {...restProps}
      label="State"
      autoComplete="shipping address-level1"
      isRequired
      onChange={handleOnChange}
      onBlur={onBlur}
      selectedKeys={selectedKeys}
      ref={ref}
    >
      {states.map((state) => (
        <SelectItem key={state.stateCode} value={state.stateCode}>
          {state.name}
        </SelectItem>
      ))}
    </Select>
  );
});
