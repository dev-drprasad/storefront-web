"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Auth as BaseAuth } from "@/widgets/Auth";
import { ViewMode } from "@/widgets/authViewMode";
import { useSession } from "next-auth/react";

export function Auth() {
  const { status } = useSession();

  if (status === "authenticated") return null;

  return (
    <Card>
      <CardHeader>Login / Signup</CardHeader>
      <CardBody className="p-4">
        <BaseAuth defaultMode={ViewMode.SIGNIN} vertical />
      </CardBody>
    </Card>
  );
}
