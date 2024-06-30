"use client";
import React from "react";
import {
  Button,
  Listbox,
  ListboxItem,
  Navbar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { IconWrapper } from "./IconWrapper";

import { BookIcon } from "../icons/BookIcon";
import { LayoutIcon } from "../icons/LayoutIcon";
import UserCard from "../user-card";
import { CalendarIcon } from "../icons/CalendarIcon";
import { FileIcon } from "../icons/FileIcon";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LayoutDashboardIcon,
  LucideGraduationCap,
  UsersIcon,
} from "lucide-react";

export default function AdminSideBar({ lang }: any) {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Listbox
        aria-label="User Menu"
        className="p-0 px-5 gap-4 space-y-5   sticky  inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/10 max-w-[240px] pt-[100px] max-md:hidden border-r dark:border-gray-400/20"
        itemClasses={{
          base: "px-3 rounded-none gap-3 h-12 data-[hover=true]:bg-transparent",
        }}
        classNames={{ list: "space-y-2" }}
      >
        <ListboxItem
          key="issues"
          className={`${
            pathname === "/admin/dashboard" && "bg-primary text-white"
          } rounded-2xl  `}
          href="/admin/dashboard"
          startContent={
            <IconWrapper
              className={`${
                pathname === "/admin/dashboard" && "bg-transparent text-white"
              } bg-success/10 text-success`}
            >
              <LayoutDashboardIcon size={17} />
            </IconWrapper>
          }
        >
          Dashobard
        </ListboxItem>

        <ListboxItem
          key="discussions"
          href="/admin/users"
          className={`${
            pathname === "/admin/users" && "bg-primary text-white"
          } rounded-2xl  `}
          startContent={
            <IconWrapper
              className={`${
                pathname === "/admin/users" && "bg-transparent text-white"
              } bg-success/10 text-success`}
            >
              <UsersIcon size={18}></UsersIcon>
            </IconWrapper>
          }
        >
          Users
        </ListboxItem>
 
        
      </Listbox>
    </>
  );
}
