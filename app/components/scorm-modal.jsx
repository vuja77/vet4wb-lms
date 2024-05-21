import React, { useEffect } from "react";
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
import { Config } from "@/Config";

export default function ScormModal({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "SetDataChunk") {
        console.log("Received data from iframe:", event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Open
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="min-w-[80%] min-h-[85vh]"
        classNames={{
          body: "py-6",
          backdrop: "bg-primary/20 backdrop-opacity-10",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <p>{data.file_path}</p>
        <p>{data.type}</p>
        <ModalContent className="min-h-[95vh]">
          {(onClose) => (
            <>
              {data.type === "scorm1" ? (
                <iframe
                  className="min-h-[95vh]"
                  src={
                    Config.STORAGE_URL +
                    "/files/" +
                    data.file_path +
                    "/scormcontent/index.html"
                  }
                ></iframe>
              ) : (
                <iframe
                  className="min-h-[95vh]"
                  src={
                    Config.STORAGE_URL +
                    "/files/" +
                    data.file_path +
                    "/res/index.html"
                  }
                ></iframe>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
