"use client";
import React, { useState } from "react";
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
  Card,
  CardBody,
} from "@nextui-org/react";
import { IconWrapper } from "./IconWrapper";

import { BookIcon } from "../icons/BookIcon";
import { LayoutIcon } from "../icons/LayoutIcon";
import UserCard from "../user-card";
import { CalendarIcon } from "../icons/CalendarIcon";
import { FileIcon } from "../icons/FileIcon";
import { usePathname } from "next/navigation";
import {
  FilesIcon,
  LayoutDashboard,
  LayoutDashboardIcon,
  LucideGraduationCap,
  UserIcon,
} from "lucide-react";
import { Config } from "@/Config";
import { getCookie } from "cookies-next";
import axios from "axios";
import toast from "react-hot-toast";

export default function SideBar({ lang }: any) {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [message, setMessage] = useState("");
  async function sendReport() {
    try {
      const response = await axios.post(
        `${Config.API_URL}/reports`,
        { message: message },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      onClose();
      toast.custom((t) => (
        <Card className="inset-x-0 backdrop-blur-md p-2 rounded-full data-[menu-open=true]:backdrop-blur-lg backdrop-saturate-150 bg-background/20">
          <CardBody>
            <p>👏, Report sent</p>
          </CardBody>
        </Card>
      ));
      return response.data;
    } catch (error) {
      console.error("Error sending report:", error);
      throw error;
    }
  }
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
            pathname === "/dashboard" && "bg-primary text-white"
          } rounded-2xl  `}
          href="/dashboard"
          startContent={
            <IconWrapper
              className={`${
                pathname === "/dashboard" && "bg-transparent text-white"
              } bg-success/10 text-success`}
            >
              <LayoutDashboardIcon size={17} />
            </IconWrapper>
          }
        >
          {lang && lang.all_courses}
        </ListboxItem>

        <ListboxItem
          key="discussions"
          href="/my-course"
          className={`${
            pathname === "/my-course" && "bg-primary text-white"
          } rounded-2xl  `}
          startContent={
            <IconWrapper
              className={`${
                pathname === "/my-course" && "bg-transparent text-white"
              } bg-success/10 text-success`}
            >
              <BookIcon></BookIcon>
            </IconWrapper>
          }
        >
          {lang && lang.my_courses}
        </ListboxItem>
        <ListboxItem
          key="actions"
          href="/certificates"
          className={`${
            pathname === "/certificates" && "bg-primary text-white"
          } rounded-2xl  `}
          startContent={
            <IconWrapper
              className={`${
                pathname === "/certificates" && "bg-transparent text-white"
              } bg-success/10 text-success`}
            >
              <LucideGraduationCap size={17} />
            </IconWrapper>
          }
        >
          {lang && lang.certificates}
        </ListboxItem>
        <ListboxItem
          key="actions"
          className={`${
            pathname === "/profile" && "bg-primary text-white"
          } rounded-2xl  `}
          href="/profile"
          startContent={
            <IconWrapper
              className={`${
                pathname === "/profile" && "bg-transparent text-white"
              } bg-success/10 text-success`}
            >
              <UserIcon size={17} />
            </IconWrapper>
          }
        >
          {lang && lang.profile}
        </ListboxItem>
        <ListboxItem
          key="actions"
          className={`${
            pathname === "/my-files" && "bg-primary text-white"
          } rounded-2xl`}
          href="/my-files"
          startContent={
            <IconWrapper
              className={`${
                pathname === "/my-files" && "bg-transparent text-white"
              } bg-success/10 text-success`}
            >
              <FilesIcon size={17}></FilesIcon>
            </IconWrapper>
          }
        >
          My files
        </ListboxItem>
        <ListboxItem
          key="actions"
          className="h-[250px]  w-full justify-self-end relative top-[35%] flex flex-col hover:bg-transparent  hover:backdrop-blur-0 justify-center items-center text-center"
        >
          <div className="w-full gap-5 p-5 flex  justify-center flex-col items-center text-center rounded-2xl  bg-white/10 backdrop-blur-md border-1  dark:border-gray-400/20 pb-12">
            <h1 className="font-medium text-xl">
              {lang && lang.have_a_question}
            </h1>
            <p className="text-wrap text-center text-small">
              {lang && lang.have_a_question2}
            </p>
          </div>
          <Button
            onPress={onOpen}
            variant="shadow"
            className="bg-primary z-10 relative top-[-25px] justify-self-center text-white rounded-full"
          >
            {lang.contact_us}
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Contact support
                  </ModalHeader>
                  <ModalBody>
                    <Textarea
                      variant="faded"
                      label="Your question"
                      placeholder="
                      Describe your problem"
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      className="w-full"
                      type="submit"
                      onPress={() => sendReport()}
                    >
                      Send report
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </ListboxItem>
      </Listbox>
    </>
  );
}
