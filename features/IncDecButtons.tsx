import { Button } from "@nextui-org/button";

interface Props {
  value: number;
  onIncreament: () => void;
  onDecreament: () => void;
}

export function IncDecButtons(props: Props) {
  const { onIncreament, onDecreament, value } = props;
  return (
    <div className="inline-block">
      <Button size="sm" onClick={onDecreament} variant="ghost" isIconOnly>
        −
      </Button>
      <span className="px-2 inline-block text-center">{value}</span>
      <Button size="sm" onClick={onIncreament} variant="ghost" isIconOnly>
        +
      </Button>
    </div>
  );
}
