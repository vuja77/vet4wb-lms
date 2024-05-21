import React from "react";
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

  let setup = async () => {
    window.SetDataChunk = (a) => {
      let b = JSON.parse(a).d;

      fetch("../api/set-value", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          scorm_filename: scormFilename,
          data: JSON.parse(a).d,
        }),
      })
        .then((response, error) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    window.GetDataChunk = () => {
      let result = null;

      const xhttp = new XMLHttpRequest();
      xhttp.onload = function () {
        let data = JSON.parse(this.responseText);
        result = JSON.stringify({ d: data[0].data });
      };
      xhttp.open("GET", "../api/get-value/" + scormFilename, false);
      xhttp.setRequestHeader("Authorization", `Bearer ${token}`);
      xhttp.send();
      console.log(aloo);
      return result;
    };

    window.ConcedeControl = window.history.back;

    console.log(document.getElementById("ifr").contentDocument.title);
  };

  setup();

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Open
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="min-w-[80%] min-h-[85%]"
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
        <ModalContent className="min-h-[95vh">
          {(onClose) => (
            <>
              {data.type === "scorm1" ? (
                <iframe
                  className="min-h-[95vh]"
                  src={
                    Config.STORAGE_URL +
                    "/files/" +
                    data.file_path +
                    "/guidance-to-vet-leadership-scorm12-S2dftBCN/scormcontent/index.html"
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
