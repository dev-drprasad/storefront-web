import { LockIcon, MailIcon } from "@/components/icons";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";

export function SignupForm() {
  const {
    register,
    handleSubmit: getHandleSubmit,
    formState,
  } = useForm({
    mode: "onBlur",
  });

  const handleSubmit = () => {};

  const emailRegister = register("email", { required: true });
  const passwordRegister = register("password", { required: true });

  return (
    <form id="signup-form" onSubmit={getHandleSubmit(handleSubmit)}>
      <Input
        autoFocus
        className="mb-4"
        classNames={{
          input:
            "bg-transparent" /* TODO: default `!bg-transparent` not working, so added again */,
        }}
        endContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mb-4" />
        }
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
        type="email"
        isRequired
        {...emailRegister}
      />
      <Input
        className="mb-4"
        endContent={
          <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        classNames={{
          mainWrapper: "mb-4",
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
  );
}
