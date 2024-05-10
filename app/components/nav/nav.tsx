"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";
import UserCard from "../user-card";
import { hasCookie } from "cookies-next";
import LangSelect from "./lang-select";
import { ThemeSwitcher } from "../ThemeSwitcher";
export default function Nav({ lang }: any) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Dashboard", "My courses", "Profile", "Site", "Log Out"];
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      className="fixed top-0 py-2 w-full "
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Image src="/logo.png" width={70}></Image>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="/">{lang.home}</Link>
        </NavbarItem>
        {hasCookie("token") && (
          <NavbarItem>
            <Link href="/dashboard">{lang.dashboard}</Link>
          </NavbarItem>
        )}

        <NavbarItem>
          <Link href="https://vet4wb.com">Site</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!hasCookie("token") ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">{lang.login}</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                {lang.signup}
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <UserCard></UserCard>
          </NavbarItem>
        )}
        <NavbarItem>
          {/* <LangSelect></LangSelect> */}
          <ThemeSwitcher></ThemeSwitcher>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="gap-10 pt-10">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
