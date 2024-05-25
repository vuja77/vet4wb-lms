"use client";
import React from "react";
import { Button, Listbox, ListboxItem, Navbar } from "@nextui-org/react";
import { IconWrapper } from "./IconWrapper";

import { BookIcon } from "../icons/BookIcon";
import { LayoutIcon } from "../icons/LayoutIcon";
import UserCard from "../user-card";
import { CalendarIcon } from "../icons/CalendarIcon";
import { FileIcon } from "../icons/FileIcon";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();
  return (
    <>
      <Listbox
        aria-label="User Menu"
        className="p-0 px-5 gap-4 space-y-5   sticky  inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/10 max-w-[270px] pt-[100px] max-md:hidden border-r dark:border-gray-400/20"
        itemClasses={{
          base: "px-3 rounded-none gap-3 h-12 data-[hover=true]:bg-transparent",
        }}
        classNames={{ list: "space-y-2" }}
      >
        <ListboxItem
          key="issues"
          className={`${
            pathname === "/dashboard" && "bg-primary text-white"
          } rounded-2xl  `}
          href="/dashboard"
          startContent={
            <IconWrapper
              className={`${
                pathname === "/dashboard" && "bg-transparent text-white"
              } bg-success/10 text-success`}
            >
              <LayoutIcon />
            </IconWrapper>
          }
        >
          All courses
        </ListboxItem>

        <ListboxItem
          key="discussions"
          href="/my-course"
          className={`${
            pathname === "/my-course" && "bg-primary text-white"
          } rounded-2xl  `}
          startContent={
            <IconWrapper className={`${
              pathname === "/my-course" && "bg-transparent text-white"
            } bg-success/10 text-success`}>
              <BookIcon></BookIcon>
            </IconWrapper>
          }
        >
          My courses
        </ListboxItem>
        <ListboxItem
          key="actions"
          href="/profile"
          className={`${
            pathname === "/certificates" && "bg-primary text-white"
          } rounded-2xl  `}
          startContent={
            <IconWrapper className={`${
              pathname === "/certificates" && "bg-transparent text-white"
            } bg-success/10 text-success`}>
              <BookIcon></BookIcon>
            </IconWrapper>
          }
        >
          Certificates
        </ListboxItem>
        <ListboxItem
          key="actions"
          className={`${
            pathname === "/profile" && "bg-primary text-white"
          } rounded-2xl  `}
          href="/profile"
          startContent={
            <IconWrapper className={`${
              pathname === "/profile" && "bg-transparent text-white"
            } bg-success/10 text-success`}>
              <BookIcon></BookIcon>
            </IconWrapper>
          }
        >
          Profile
        </ListboxItem>
        <ListboxItem
          key="actions"
          className="h-[250px]  w-full justify-self-end relative top-[50%] flex flex-col hover:bg-transparent  hover:backdrop-blur-0 justify-center items-center text-center"
        >
          <div className="w-full gap-5 p-5 flex  justify-center flex-col items-center text-center rounded-2xl  bg-white/10 backdrop-blur-md border-1  dark:border-gray-400/20 pb-12">
            <h1 className="font-medium text-xl">Have a question?</h1>
            <p className="text-wrap text-center text-small">
            If you have any questions, please contact us!
            </p>
          </div>
          <Button
            variant="shadow"
            className="bg-primary z-10 relative top-[-25px] justify-self-center text-white rounded-full"
          >
            Contact us
          </Button>
        </ListboxItem>
      </Listbox>
    </>
  );
}
