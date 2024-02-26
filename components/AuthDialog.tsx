"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import { useSession, signIn } from "next-auth/react";
import { UserAvatar } from "@/features";
import { SignupForm } from "@/features/SignupForm";
import { SignInForm } from "@/features/SignInForm";
import { Divider } from "@nextui-org/divider";

const SignupDialog = () => {
  const [isPrimaryLoading, setIsPrimaryLoading] = useState(false);
  const { isSignIn, isSignUp, showSignIn, showSignUp, showNothing } = useMode();
  const { status } = useSession();

  if (status === "authenticated") {
    return <UserAvatar />;
  }

  return (
    <>
      <Button onPress={showSignIn} variant="light" color="primary">
        Sign in
      </Button>
      <Button onPress={showSignUp} variant="light" color="primary">
        Sign up
      </Button>

      <Modal
        isOpen={isSignIn || isSignUp}
        onOpenChange={showNothing}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                {isSignIn && "Welcome Back"}
                {isSignUp && "Create new account"}
              </ModalHeader>
              <ModalBody>
                <Button color="primary" onClick={() => signIn("google")}>
                  Continue with Google
                </Button>
                <div className="text-center relative my-2">
                  <span className="p-2 rounded-full border border-default-200 text-default-500 bg-default-100/100">
                    Or
                  </span>
                  <Divider className="absolute top-1/2 -translate-y-1/2 -z-10" />
                </div>
                {isSignUp && (
                  <>
                    <small className="text-center text-default-500">
                      Enter your email and new password to create your account
                    </small>
                    <SignupForm
                      id="auth-form"
                      onSubmitStatusChange={setIsPrimaryLoading}
                    />
                    <Button
                      className="underline text-default-500"
                      variant="light"
                      onClick={showSignIn}
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
                      onSubmitStatusChange={setIsPrimaryLoading}
                    />
                    <Button
                      className="underline text-default-500"
                      variant="light"
                      onClick={showSignUp}
                    >
                      Want to create an account ? Sign Up
                    </Button>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  form="auth-form"
                  color="primary"
                  type="submit"
                  isLoading={isPrimaryLoading}
                >
                  {isSignUp && "Sign up"}
                  {isSignIn && "Sign in"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

function useMode() {
  const [mode, setMode] = useState<"signIn" | "signUp">();
  const showSignUp = () => setMode("signUp");
  const showSignIn = () => setMode("signIn");
  const showNothing = () => setMode(undefined);

  return {
    isSignUp: mode === "signUp",
    isSignIn: mode === "signIn",
    showSignIn,
    showSignUp,
    showNothing,
  };
}

export default SignupDialog;
