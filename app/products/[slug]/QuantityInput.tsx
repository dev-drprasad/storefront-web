"use client";

import { classnames } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { useState } from "react";

interface Props {
  defaultValue: number;
  onChange: (value: number) => void;
  min?: number;
}

const useQuantityInputValue = (params: Props) => {
  const { defaultValue, min = 1 } = params;
  const [value, setValue] = useState(defaultValue);

  return {
    value,
    increase: () => setValue((v) => v + 1),
    decrease: () => (value > min ? setValue((v) => v - 1) : undefined),
  };
};

const QuantityInput = (props: Props) => {
  const { onChange } = props;
  const { value, increase, decrease } = useQuantityInputValue(props);

  return (
    <span className={`bg-default-100 p-2 ${classnames.border}`}>
      <span>Quantity: </span>
      <Button size="sm" onClick={decrease} isIconOnly>
        −
      </Button>
      <span className="w-16 inline-block text-center">{value}</span>
      <Button size="sm" onClick={increase} isIconOnly>
        +
      </Button>
    </span>
  );
};

export default QuantityInput;
