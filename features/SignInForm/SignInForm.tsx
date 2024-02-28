"use client";

import { PasswordField } from "@/components";
import { MailIcon } from "@/components/icons";
import { Input } from "@nextui-org/input";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  id: string;
  onSubmitStatusChange?: (isSigningIn: boolean) => void;
}

export function SignInForm(props: Props) {
  const { onSubmitStatusChange, id } = props;
  const { fields, onSubmit, errors, isSigningIn } = useSignInForm();

  useEffect(() => {
    onSubmitStatusChange?.(isSigningIn);
  }, [isSigningIn, onSubmitStatusChange]);

  return (
    <form id={id} noValidate onSubmit={onSubmit}>
      <Input
        autoFocus
        className="mb-4"
        classNames={{
          input:
            "bg-transparent" /* TODO: default `!bg-transparent` not working, so added again */,
        }}
        startContent={
          <MailIcon className="text-default-400 pointer-events-none" />
        }
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
        type="email"
        autoComplete="username"
        isRequired
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        {...fields.email}
      />
      <PasswordField
        label="New Password"
        placeholder="Enter new password"
        autoComplete="current-password"
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        {...fields.password}
      />
    </form>
  );
}

interface IFormData {
  email: string;
  password: string;
}

function useSignInForm() {
  const {
    register,
    handleSubmit: getHandleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    mode: "onBlur",
  });

  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (formData: IFormData) => {
    const { email, password } = formData;

    setIsSigningIn(true);
    await signIn("credentials", {
      email,
      password,
      _mode: "signIn",
      callbackUrl: "/",
    });
    setIsSigningIn(false);
  };

  const email = register("email", { required: "You must enter email" });
  const password = register("password", {
    required: "You must enter password",
    minLength: {
      value: 8,
      message: "Password must have at least 8 characters",
    },
  });

  return {
    errors,
    fields: {
      email,
      password,
    },
    onSubmit: getHandleSubmit(handleSubmit),
    isSigningIn,
  };
}
