"use client";
import React from "react";
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

const SignupDialog = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { status, data: session } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <UserAvatar />
      ) : (
        <Button onPress={onOpen} variant="light" color="primary">
          Signup
        </Button>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>
              <ModalBody>
                <Button
                  className="mb-4"
                  color="primary"
                  onClick={() => signIn("google")}
                >
                  Sign-in using Google
                </Button>
                <SignupForm />
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button form="signup-form" color="primary" type="submit">
                  Signup
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignupDialog;
