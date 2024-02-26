import { useCallback, useState } from "react";

export function useBoolean(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);

  return [value, toggle, setTrue, setFalse] satisfies [
    boolean,
    VoidFn,
    VoidFn,
    VoidFn
  ];
}
