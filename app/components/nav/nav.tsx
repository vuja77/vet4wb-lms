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
import { getCookie, hasCookie } from "cookies-next";
import LangSelect from "./lang-select";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { link } from "fs";
import { usePathname } from "next/navigation";
export default function Nav({ lang }: any) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const pathname = usePathname();
  const menuItems = getCookie("token")
    ? [
        { name: "Dashboard", link: "/dashboard" },
        { name: "My courses", link: "/my-course" },
        { name: "Certificates", link: "/certificates" },
        { name: "Profile", link: "/profile" },
        { name: "Activities", link: "https://vet4wb.com/news/" },
      ]
    : [{ name: "Activities", link: "https://vet4wb.com/news/" }];
  console.log(pathname.split("/"));
  if (pathname.includes("login") || pathname === "/register") {
    return <></>;
  } else {
    return (
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        shouldHideOnScroll
        className={`fixed top-0 py-2 w-full backdrop-blur-0 bg-transparent dark:text-white`}
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

        <NavbarContent className="hidden dark:text-white sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link href="/" className="dark:text-white">{lang.home}</Link>
          </NavbarItem>
          {hasCookie("token") && (
            <NavbarItem>
              <Link href="/dashboard" className="dark:text-white">{lang.dashboard}</Link>
            </NavbarItem>
          )}

          <NavbarItem>
            <Link href="https://vet4wb.com/news/" className="dark:text-white">{lang.activities}</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {!hasCookie("token") ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href="/login">{lang.login}</Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  color="primary"
                  href="/register"
                  variant="flat"
                >
                  {lang.signup}
                </Button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem>
              <UserCard lang={lang}></UserCard>
            </NavbarItem>
          )}
          <NavbarItem>
            {/* <LangSelect></LangSelect>   */}
            <ThemeSwitcher></ThemeSwitcher>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="gap-10 pt-10">
          <NavbarMenuItem key={"pocetna"}>
            <Link
              color={pathname.split("/")[1] === "" ? "primary" : "secondary"}
              className="w-full"
              href={"/"}
              size="lg"
            >
              {lang.home}
            </Link>
          </NavbarMenuItem>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  pathname.split("/")[1].includes(item.link)
                    ? "primary"
                    : "secondary"
                }
                className="w-full"
                href={item.link}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    );
  }
}
