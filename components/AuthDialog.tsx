"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import { Auth } from "@/widgets/Auth";
import { ViewMode } from "@/widgets/authViewMode";

export function AuthDialog() {
  const [isPrimaryLoading, setIsPrimaryLoading] = useState(false);
  const { isSignIn, isSignUp, showSignIn, showSignUp, showNothing } = useMode();

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
                <Auth
                  onSubmitStatusChange={setIsPrimaryLoading}
                  defaultMode={isSignIn ? ViewMode.SIGNIN : ViewMode.SIGNUP}
                />
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
}

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
