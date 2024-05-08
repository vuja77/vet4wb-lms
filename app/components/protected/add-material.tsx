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
import { PlusIcon } from "../icons/PlusIcon";
import { useCallback } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Config } from "@/Config";
import toast, { Toaster } from "react-hot-toast";
import { Blob } from "buffer";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function AddMaterials({id}: {id:number}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");
  const [lang, setLang] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState();
  const [file, setFile] = useState<Blob>();
  const [type, setType] = useState("");
  const router = useRouter()
  console.log(id)
  const { getRootProps, getInputProps } = useDropzone({
    //@ts-ignore
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      //@ts-ignore
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = () => {
        //@ts-ignore
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  async function handleSubmit() {
    const formData = new FormData();
    //@ts-ignore
    formData.append("type", type);
    //@ts-ignore
    formData.append("file", file);
    //@ts-ignore
    formData.append("lesson_id", id);
    formData.append("lang", lang);
    console.log(formData);
    console.log(type)
    await axios
      .post(Config.API_URL + "/material", formData, {
        headers: {
          Authorization:
            "Bearer "+getCookie('token'),
        },
      })
      .then((res) => {
        console.log(res);
        toast.custom((t) => (
          <Card className="inset-x-0 backdrop-blur-md p-2 rounded-full data-[menu-open=true]:backdrop-blur-lg backdrop-saturate-150 bg-background/20">
            <CardBody>
              <p>👏, Material added successfuly</p>
            </CardBody>
          </Card>
        ));
        router.refresh()
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const notify = () => toast("Here is your toast.");
  return (
    <>
      <Button onPress={onOpen} color="primary" className="w-full">
        Add new material<PlusIcon></PlusIcon>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create course
              </ModalHeader>
              <ModalBody>
                <Input
                  type="file"
                  name="file"
                  label="File"
                  placeholder="Select a file"
                  className="max-w-full"
                  variant="bordered"
                //@ts-ignore
                  onChange={(e) => setFile(e.target.files[0])}
                ></Input>

                <Select
                  label="Type"
                  placeholder="Select an type"
                  className="max-w-full"
                  variant="bordered"
                  onChange={(e) => setType(e.target.value)}
                >
                  <SelectItem value="scorm1" key="scorm1">
                    Scorm 1
                  </SelectItem>
                  <SelectItem value="scorm2" key="scorm2">
                    Scorm 2
                  </SelectItem>
                </Select>


                <Select
                  label="Type"
                  placeholder="Select an lang"
                  className="max-w-full"
                  variant="bordered"
                  onChange={(e) => setLang(e.target.value)}
                >
                  <SelectItem value="scorm" key="gb">
                    English
                  </SelectItem>
                  <SelectItem value="scorm" key="me">
                    Montenegrin
                  </SelectItem>
                  <SelectItem value="scorm" key="sq">
                    Albanian
                  </SelectItem>
                </Select>
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
