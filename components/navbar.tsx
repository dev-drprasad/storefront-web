import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";

import SignupDialog from "./SignupDialog";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      size="lg"
      classNames={{
        inputWrapper: "w-2/3 mx-auto bg-default-200",
      }}
      endContent={
        <Button isIconOnly>
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        </Button>
      }
      placeholder="Search..."
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="w-2/3" as="div">
        <NavbarBrand>
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        {searchInput}
        <div className="flex">
          <ThemeSwitch />
          <Button variant="light" color="primary">
            Login
          </Button>
          <SignupDialog />
        </div>
      </NavbarContent>
    </NextUINavbar>
  );
};
