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
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { LockIcon, MailIcon } from "./icons";
import { useSession, signIn } from "next-auth/react";

const SignupDialog = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { status, data: session } = useSession();

  const {
    register,
    handleSubmit: getHandleSubmit,
    formState,
  } = useForm({
    mode: "onBlur",
  });

  const handleSubmit = (data) => {};

  const emailRegister = register("email", { required: true });
  const passwordRegister = register("password", { required: true });

  return (
    <>
      <Button onPress={onOpen} variant="light" color="primary">
        Signup
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <form id="signup-form" onSubmit={getHandleSubmit(handleSubmit)}>
                  <Input
                    autoFocus
                    classNames={{
                      input:
                        "bg-transparent" /* TODO: default `!bg-transparent` not working, so added again */,
                    }}
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Email"
                    placeholder="Enter your email"
                    variant="bordered"
                    type="email"
                    isRequired
                    {...emailRegister}
                  />
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    classNames={{
                      input:
                        "bg-transparent" /* TODO: default `!bg-transparent` not working, so added again */,
                    }}
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                    isRequired
                    {...passwordRegister}
                  />
                </form>
                <Button color="primary" onClick={() => signIn("google")}>
                  Sign-in using Google
                </Button>
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
