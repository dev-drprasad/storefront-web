"use client";

import { AuthDialog } from "@/components/AuthDialog";
import { UserAvatar } from "@/features";
import { useSession } from "next-auth/react";

export function NavBarRight() {
  const { status } = useSession();

  if (status === "loading") {
    return null;
  }

  return status === "authenticated" ? <UserAvatar /> : <AuthDialog />;
}
