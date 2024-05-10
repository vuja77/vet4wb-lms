"use client";
import React from "react";
import { Listbox, ListboxItem, Navbar } from "@nextui-org/react";
import { IconWrapper } from "./IconWrapper";

import { BookIcon } from "../icons/BookIcon";
import { LayoutIcon } from "../icons/LayoutIcon";
import UserCard from "../user-card";
import { CalendarIcon } from "../icons/CalendarIcon";
import { FileIcon } from "../icons/FileIcon";
import { ThemeSwitcher } from "../ThemeSwitcher";

export default function SideBar() {
  return (
    <>
      <Listbox
        aria-label="User Menu"
        className="p-0 gap-0  data-[menu-open=true]:border-none sticky  inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/10 max-w-[270px] pt-[100px] max-md:hidden"
        itemClasses={{
          base: "px-3 rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
        }}
      >
        <ListboxItem
          key="issues"
          className="px-10"
          href="/dashboard"
          startContent={
            <IconWrapper className="bg-success/10 text-success">
              <LayoutIcon />
            </IconWrapper>
          }
        >
          Dashboard
        </ListboxItem>

        <ListboxItem
          key="discussions"
          href="/my-course"
          className="px-10"
          startContent={
            <IconWrapper className="bg-secondary/10 text-secondary">
              <BookIcon></BookIcon>
            </IconWrapper>
          }
        >
          My courses
        </ListboxItem>
        <ListboxItem
          key="actions"
          className="px-10"
          href="/profile"
          startContent={
            <IconWrapper className="bg-warning/10 text-warning">
              <BookIcon></BookIcon>
            </IconWrapper>
          }
        >
          Profile
        </ListboxItem>
      </Listbox>

      <Listbox
        aria-label="User Menu"
        className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[250px] overflow-visible shadow-small pt-[60px] max-lg:w-[60px] hidden max-lg:flex flex-col items-center max-sm:hidden"
        itemClasses={{
          base: "rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
        }}
      >
        <ListboxItem
          key="issues"
          startContent={
            <IconWrapper className="bg-success/10 text-success">
              <LayoutIcon />
            </IconWrapper>
          }
        ></ListboxItem>
        <ListboxItem
          key="pull_requests"
          startContent={
            <IconWrapper className="bg-primary/10 text-primary">
              <BookIcon />
            </IconWrapper>
          }
        ></ListboxItem>
        <ListboxItem
          key="discussions"
          startContent={
            <IconWrapper className="bg-secondary/10 text-secondary">
              <CalendarIcon />
            </IconWrapper>
          }
        ></ListboxItem>
        <ListboxItem
          key="actions"
          startContent={
            <IconWrapper className="bg-warning/10 text-warning">
              <FileIcon></FileIcon>
            </IconWrapper>
          }
        ></ListboxItem>
        <ListboxItem
          key="projects"
          startContent={
            <IconWrapper className="bg-default/50 text-foreground">
              <BookIcon />
            </IconWrapper>
          }
        ></ListboxItem>
      </Listbox>
    </>
  );
}
