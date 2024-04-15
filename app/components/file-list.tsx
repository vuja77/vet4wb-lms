import React, { useEffect, useState } from "react";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { IconWrapper } from "./Sidebar/IconWrapper";
import { ItemCounter } from "./Sidebar/ItemCounter";
import { LayoutIcon } from "./icons/LayoutIcon";
import { BookIcon } from "./icons/BookIcon";
import { PlayCircleIcon } from "./icons/PlayIcon";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import ScormModal from "./scorm-modal";
import VideoModal from "./video-modal";
import { getCookie } from "cookies-next";

export default function FileList({ data }: { data: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
  console.log(getCookie("lang") )
  })
  return (
    <Listbox
      aria-label="User Menu"
      onAction={(key) => alert(key)}
      className="p-0 gap-0 w-full divide-y divide-default-300/50 dark:divide-default-100/80  overflow-visible rounded-medium pb-5"
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
    >
      {//@ts-ignore
      data.filter((e:any) => e.langague === getCookie("lang")).map((e: any, index: any) => {
        if (e.type === "scorm") {
          return (
            <ListboxItem
              key="issues"
              className="w-full"
              onPress={onOpen}
              endContent={<ScormModal data={e}></ScormModal>}
              startContent={
                <IconWrapper className="bg-success/10 text-success">
                  <BookIcon />
                </IconWrapper>
              }
            >
              {e.file_path}
            </ListboxItem>
          );
        } else if (e.type === "video") {
          return (
            <ListboxItem
              key="issues"
              className="w-full"
              endContent={<VideoModal data={e}></VideoModal>}
              startContent={
                <IconWrapper className="bg-success/10 text-success">
                  <PlayCircleIcon></PlayCircleIcon>
                </IconWrapper>
              }
            >
              {e.file_path}
            </ListboxItem>
          );
        }
      })}
    </Listbox>
  );
}
