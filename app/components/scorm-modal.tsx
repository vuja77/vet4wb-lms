import React from "react";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { Config } from "@/Config";

export default function ScormModal({ data }: { data: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to handle messages from the iframe
  const handleMessage = (event: MessageEvent) => {
    if (event.origin === "https://moodle.edu4wb.com") {
      console.log("Received data from iframe:", event.data);
      // Process the received data as needed
    } else {
      console.error("Origin not allowed:", event.origin);
    }
  };

  React.useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <Button onClick={onOpen} color="primary">
        Open
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
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
        <ModalContent className="min-h-[95vh]">
          {data.type === "scorm1" ? (
            <iframe
              className="min-h-[95vh]"
              src={
                Config.STORAGE_URL +
                "/files/" +
                data.file_path +
                "/scormcontent/index.html"
              }
              onLoad={() => {
                const iframeWindow = document.querySelector("iframe")?.contentWindow;
                if (iframeWindow) {
                  // Post a message to the iframe
                  iframeWindow.postMessage({ type: "hello" }, "https://moodle.edu4wb.com");
                }
              }}
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
              onLoad={() => {
                const iframeWindow = document.querySelector("iframe")?.contentWindow;
                if (iframeWindow) {
                  // Post a message to the iframe
                  iframeWindow.postMessage({ type: "hello" }, "https://moodle.edu4wb.com");
                }
              }}
            ></iframe>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
