import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useSession } from "next-auth/react";

interface Props {
  children: () => React.ReactNode;
  header: React.ReactNode;
}

export function ProtectedCard(props: Props) {
  const { status } = useSession();
  return (
    <Card className="mb-4" isDisabled={status !== "authenticated"}>
      <CardHeader className="flex justify-between">{props.header}</CardHeader>
      <CardBody className="p-4">
        {status === "authenticated" ? (
          props.children()
        ) : (
          <div className="text-center">Login to proceed</div>
        )}
      </CardBody>
    </Card>
  );
}
