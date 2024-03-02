"use client";

import { IncDecButtons } from "@/features/IncDecButtons";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <IncDecButtons
      value={value}
      onIncreament={increase}
      onDecreament={decrease}
    />
  );
};

export default QuantityInput;
