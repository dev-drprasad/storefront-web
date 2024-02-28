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

export function SignupForm(props: Props) {
  const { onSubmitStatusChange, id } = props;
  const { fields, onSubmit, errors, isSigningUp } = useSignUpForm();

  useEffect(() => {
    onSubmitStatusChange?.(isSigningUp);
  }, [isSigningUp, onSubmitStatusChange]);

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
        autoComplete="new-password"
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        {...fields.password}
      />
      <PasswordField
        label="Confirm Password"
        placeholder="Confirm new password"
        disableVisibityChange
        autoComplete="new-password"
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        {...fields.confirmPassword}
      />
    </form>
  );
}

interface IFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

function useSignUpForm() {
  const {
    register,
    handleSubmit: getHandleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormData>({
    mode: "onBlur",
  });

  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = async (formData: IFormData) => {
    const { email, password, confirmPassword } = formData;

    setIsSigningUp(true);
    await signIn("credentials", {
      email,
      password,
      confirmPassword,
      _mode: "signUp",
      callbackUrl: "/",
    });
    setIsSigningUp(false);
  };

  const email = register("email", { required: "You must enter email" });
  const password = register("password", {
    required: "You must enter password",
    minLength: {
      value: 8,
      message: "Password must have at least 8 characters",
    },
  });
  const confirmPassword = register("confirmPassword", {
    required: "You must confirm password",
    validate: (confirmedPassword: string) => {
      if (watch("password") !== confirmedPassword) {
        return "Your passwords do not match";
      }
    },
  });

  return {
    errors,
    fields: {
      email,
      password,
      confirmPassword,
    },
    onSubmit: getHandleSubmit(handleSubmit),
    isSigningUp,
  };
}
