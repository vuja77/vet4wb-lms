"use client";
import React from "react";
import { Listbox, ListboxItem, Navbar } from "@nextui-org/react";
import { IconWrapper } from "./IconWrapper";

import { BookIcon } from "../../icons/BookIcon";
import { LayoutIcon } from "../../icons/LayoutIcon";
import { CalendarIcon } from "../../icons/CalendarIcon";
import { FileIcon } from "../../icons/FileIcon";
import { ThemeSwitcher } from "../../ThemeSwitcher";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function CourseSideBar() {
  const pathname = usePathname();
  return (
    <>
      <Listbox
        aria-label="User Menu"
        className="p-0 gap-0  data-[menu-open=true]:border-none sticky  inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/40 max-w-[270px] pt-[100px] max-md:hidden"
        itemClasses={{
          base: "px-3 rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
        }}
      >
        <ListboxItem
          key="issues"
          className="px-10"
          startContent={
            <IconWrapper className="bg-success/10 text-success">
              <LayoutIcon />
            </IconWrapper>
          }
        >
          <Link href={"/admin/course/" + pathname.split("/")[3]}>
            Course
          </Link>
        </ListboxItem>
        <ListboxItem
          key="pull_requests"
          className="px-10"
          startContent={
            <IconWrapper className="bg-primary/10 text-primary">
              <BookIcon />
            </IconWrapper>
          }
        >
          <Link
            href={"/admin/course/" + pathname.split("/")[3] + "/statistics"}
          >
            Statistics
          </Link>
        </ListboxItem>
        <ListboxItem
          key="discussions"
          className="px-10"
          startContent={
            <IconWrapper className="bg-secondary/10 text-secondary">
              <CalendarIcon />
            </IconWrapper>
          }
        >
          <Link href={"/admin/course/" + pathname.split("/")[3] + "/users"}>
            Users
          </Link>
        </ListboxItem>

        <ListboxItem
          key="releases"
          className="group h-auto py-3 px-10"
          startContent={
            <IconWrapper className="bg-primary/10 text-primary">
              <BookIcon />
            </IconWrapper>
          }
          textValue="Certificate"
        >
          <Link href={"/admin/course/" + pathname.split("/")[3] + "/certificate"}>
            Certificate
          </Link>
        </ListboxItem>

        <ListboxItem key="theme">
          <ThemeSwitcher></ThemeSwitcher>
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
