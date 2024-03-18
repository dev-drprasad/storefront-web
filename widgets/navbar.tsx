import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";
// import { ThemeSwitch } from "@/components/theme-switch";
import SiteLogo from "../components/SiteLogo";
import { NavBarRight } from "./NavBarRight";
import { CartViewButton } from "@/features/CartViewButton";
import { Search } from "@/features/Search";

export function Navbar() {
  return (
    <NextUINavbar maxWidth="full" position="sticky" height={"5rem"}>
      <NavbarContent className="w-2/3" as="div">
        <NavbarBrand className="flex-grow-0">
          <NextLink
            className="flex justify-start items-center gap-1 w-16"
            href="/"
          >
            <SiteLogo />
          </NextLink>
        </NavbarBrand>
        <div className="flex-grow text-center">
          <Search className="w-2/3" />
        </div>
        <div className="flex gap-8">
          {/* <ThemeSwitch /> */}

          <CartViewButton />
          <NavBarRight />
        </div>
      </NavbarContent>
    </NextUINavbar>
  );
}
