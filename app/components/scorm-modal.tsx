"use client";
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
import { Config } from "@/Config";
import { getCookie } from "cookies-next";
//@ts-ignore
import confetti from "canvas-confetti";
import { DownloadIcon, PlayIcon } from "lucide-react";
import axios from "axios";

export default function ScormModal({
  data,
  course,
  progress,
}: {
  data: any;
  course: any;
  progress: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  var triangle = confetti.shapeFromPath({ path: "M0 10 L5 0 L10 10z" });
  const [finish, setFinish] = useState(false);
  useEffect(() => {
    const handleIframeMessage = (event: any) => {
      if (event.data === "FUNCTION_CALLED") {
        console.log("Funkcija je pozvana u iFrame-u");
        setFinish(true);
        confetti({
          shapes: [triangle],
          particleCount: 1000,
          spread: 200,
        });
      }
    };

    window.addEventListener("message", handleIframeMessage);

    return () => {
      window.removeEventListener("message", handleIframeMessage);
    };
  }, []);
  async function download() {
    try {
      const response = await axios.get(Config.API_URL + "/download/" + course, {
        responseType: "blob",
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Kreiramo link za preuzimanje
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificate.pdf"); // Postavljamo naziv datoteke za preuzimanje

      // Dodajemo link u DOM i simuliramo klik
      document.body.appendChild(link);
      link.click();

      // Čistimo URL i uklanjamo link iz DOM-a
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Button onPress={onOpen} color="primary">
        {progress > 0 ? "Resume course" : "Start course"}
      </Button>

      <Modal
        onClose={() => setFinish(false)}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="min-w-[80%] h-[90vh] overflow-hidden p-0 my-0"
        closeButton={<button>Close</button>}
        classNames={{
          body: "py-0",
          backdrop: "bg-primary/20 backdrop-opacity-10",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3] py-0 my-0",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton:
            "hover:bg-red-500 transition-all w-[120px] h-[30px]  hover:text-white text-center flex justify-center items-center  text-white bg-red-500 active:bg-white/10 z-30 ",
        }}
      >
        <ModalContent className="my-0">
          <>
            <>
              {data.type === "scorm1" ? (
                <iframe
                  className="min-h-[95vh]"
                  src={
                    "https://edu4wb.com/files/a.html?filename=" +
                    data.file_path +
                    "&material=" +
                    data.id +
                    "&token=" +
                    getCookie("token") +
                    "&course=" +
                    course
                  }
                ></iframe>
              ) : (
                <iframe
                  className="min-h-[95vh]"
                  src={
                    Config.STORAGE_URL +
                    "/files/" +
                    data.file_path +
                    "/res/index.html?filename=" +
                    data.file_path +
                    "&material=" +
                    data.id +
                    "&token=" +
                    getCookie("token") +
                    "&course=" +
                    course
                  }
                ></iframe>
              )}
            </>
            {finish && (
              <button className="absolute w-full h-full z-20  backdrop:opacity-100  backdrop-brightness-50 backdrop-blur-sm  flex flex-col justify-center items-center">
                <h1 className="uppercase text-white font-extrabold text-3xl max-sm:text-2xl">
                  Congratulations,
                  <br /> you have successfully completed the course
                </h1>
                <p className="text-white font-semibold">
                  Certificate was sent to your email!
                </p>
                <div className="space-x-5 mt-3">
                  <Button color="primary" onPress={() => download()}>
                    Download certificate<DownloadIcon></DownloadIcon>
                  </Button>
                  <Button color="primary" onPress={() => setFinish(false)}>
                    Resume course
                  </Button>
                </div>
              </button>
            )}
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
