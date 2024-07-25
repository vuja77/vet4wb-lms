"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  CardBody,
  Card,
} from "@nextui-org/react";
import { useCallback } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Config } from "@/Config";
import toast, { Toaster } from "react-hot-toast";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { PlusIcon } from "./icons/PlusIcon";
import { useRouter } from "next/navigation";
export default function AddFilesS() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState();
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const { getRootProps, getInputProps } = useDropzone({
    //@ts-ignore
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      //@ts-ignore
      setPhoto(file);
      console.log(file);
      const reader = new FileReader();
      reader.onload = () => {
        //@ts-ignore

        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  function handleSubmit() {
    const formData = new FormData();
    //@ts-ignore
    formData.append("file", photo);
    //@ts-ignore
    formData.append("display_name", photo.path);
    formData.append("description", description);
    formData.append("type", "S");
    console.log(formData);
    axios
      .post(Config.API_URL + "/my-files", formData, {
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
      })
      .then((res) => {
        router.refresh();
        onClose();
        toast.custom((t) => (
          <Card className="inset-x-0 backdrop-blur-md p-2 rounded-full data-[menu-open=true]:backdrop-blur-lg backdrop-saturate-150 bg-background/20">
            <CardBody>
              <p>👏, File Uploaded</p>
            </CardBody>
          </Card>
        ));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const notify = () => toast("Here is your toast.");
  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add new<PlusIcon></PlusIcon>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload file
              </ModalHeader>
              <ModalBody>
                <div
                  {...getRootProps()}
                  className="border-border border-dashed border-content3 border-2 rounded-lg min-h-[50px] flex items-center justify-center text-center text-content4"
                >
                  <input {...getInputProps()} />
                  {previewImage ? (
                    <div className="bg-white/10 rounded-md py-5  w-full">
                      {/* @ts-ignore */}
                      <p className=" dark:text-white text-black">
                        {/* @ts-ignore */}
                        {photo.path}
                      </p>
                    </div>
                  ) : (
                    <p className="dark:text-white text-black">
                      Drag n drop your file here, or click to select file
                    </p>
                  )}
                </div>

                {/* <Input
                  label="File display name"
                  placeholder="Enter display name"
                  variant="bordered"
                  name="course name"
                  onChange={(e) => setName(e.target.value)}
                /> */}
                <Input
                  label="Title of supporting document"
                  placeholder="Enter title of supporting document"
                  variant="bordered"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
