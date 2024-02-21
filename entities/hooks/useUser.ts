import { useSession } from "next-auth/react";
import { User } from "../types";

export function useUser() {
  const { status, data: session } = useSession();

  if (status !== "authenticated") {
    throw new Error("user is not authenticated");
  }

  const { user } = session;

  if (!user) {
    throw new Error("user is not defined in session");
  }

  if (!hasAll(user)) {
    throw new Error("one or more attributes are missing in user");
  }

  const { name, email, image: imageUrl } = user;

  return { name, email, imageUrl } satisfies User;
}

// https://stackoverflow.com/a/59873045
type NonNullableProps<T, K extends keyof NonNullable<T>> = NonNullable<T> & {
  [k in K]-?: Exclude<NonNullable<T>[k], null | undefined>;
};

function hasAll<T extends object, K extends keyof NonNullable<T>>(
  obj: T
): obj is NonNullableProps<T, K> {
  let key: keyof typeof obj;
  for (key in obj) {
    if (!Object.hasOwn(obj, key)) {
      continue;
    }
    if (!obj[key]) return false;
  }
  return true;
}
