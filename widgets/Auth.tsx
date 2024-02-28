"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";

import { signIn } from "next-auth/react";
import { SignupForm } from "@/features/SignupForm";
import { SignInForm } from "@/features/SignInForm";
import { Divider } from "@nextui-org/divider";
import { ViewMode } from "./authViewMode";

interface Props {
  onSubmitStatusChange?: (isSubmitting: boolean) => void;
  defaultMode?: ViewMode;
  vertical?: boolean;
}

export function Auth(props: Props) {
  const { onSubmitStatusChange, defaultMode, vertical } = props;

  const { isSignIn, isSignUp, showSignIn, showSignUp } = useMode(defaultMode);

  const containerClassName = vertical
    ? "flex flex-row flex-row-reverse w-full justify-evenly"
    : "";

  return (
    <div
      className={`flex gap-2 ${containerClassName}`}
      style={
        vertical
          ? { flexDirection: "row-reverse", justifyContent: "space-evenly" }
          : { flexDirection: "column" }
      } // flex-row-reverse, justify-evenly not working
    >
      <div>
        <Button color="primary" onClick={() => signIn("google")} fullWidth>
          Continue with Google
        </Button>
      </div>
      <div className="text-center relative my-2">
        <span
          className={`p-2 rounded-full border border-default-200 text-default-500 bg-default-100/100 ${
            vertical ? "absolute top-1/2 -translate-x-1/2" : ""
          }`}
        >
          Or
        </span>
        <Divider
          className={`absolute ${
            vertical
              ? "left-1/2 -translate-x-1/2"
              : "top-1/2 -translate-y-1/2 -z-10"
          }`}
          orientation={vertical ? "vertical" : undefined}
        />
      </div>
      <div>
        {isSignUp && (
          <>
            <small className="text-center text-default-500">
              Enter your email and new password to create your account
            </small>
            <SignupForm
              id="auth-form"
              onSubmitStatusChange={onSubmitStatusChange}
            />
            <Button
              className="underline text-default-500"
              variant="light"
              onClick={showSignIn}
              fullWidth
            >
              Already have an account ? Sign In
            </Button>
          </>
        )}
        {isSignIn && (
          <>
            <small className="text-center text-default-500">
              Enter your email and password to sign in to your account
            </small>
            <SignInForm
              id="auth-form"
              onSubmitStatusChange={onSubmitStatusChange}
            />
            <Button
              className="underline text-default-500"
              variant="light"
              onClick={showSignUp}
              fullWidth
            >
              Want to create an account ? Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function useMode(defaultMode?: ViewMode) {
  const [mode, setMode] = useState<ViewMode | undefined>(defaultMode);
  const showSignUp = () => setMode(ViewMode.SIGNUP);
  const showSignIn = () => setMode(ViewMode.SIGNIN);
  const showNothing = () => setMode(undefined);

  return {
    isSignUp: mode === ViewMode.SIGNUP,
    isSignIn: mode === ViewMode.SIGNIN,
    showSignIn,
    showSignUp,
    showNothing,
  };
}
